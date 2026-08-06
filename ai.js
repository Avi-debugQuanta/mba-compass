/* ============================================================
   CONSULTANT — Google sign-in, six agents, streaming chat, sync.

   No API key exists in this file or anywhere else in the browser.
   The browser sends a Google ID token; the worker verifies it,
   checks the email allowlist, and only then calls Anthropic with
   the key it holds server-side.
   ============================================================ */
'use strict';

const AI = {
  cfg: JSON.parse(localStorage.getItem('mba-compass-cfg') || '{}'),
  token: null,
  me: null,
  agents: [],
  agent: 'strategist',
  threadId: null,
  messages: [],
  busy: false,
  gsiReady: false,
};

const AGENT_FALLBACK = [
  { id: 'strategist',  name: 'The Strategist',   role: 'School list, timing, positioning', icon: 'i-compass', blurb: 'Which schools, which round, what the application should argue.', starters: [] },
  { id: 'essay',       name: 'The Essay Reader', role: 'Reads drafts the way an adcom does', icon: 'i-pen', blurb: 'Paste a draft, get the cold read.', starters: [] },
  { id: 'storyminer',  name: 'The Story Miner',  role: 'Interrogates a story until it has numbers', icon: 'i-star', blurb: 'Pushed until it has scale, ownership and a result.', starters: [] },
  { id: 'interviewer', name: 'The Interviewer',  role: 'Mock interviews in each school format', icon: 'i-mic', blurb: 'Runs the real format and stays in character.', starters: [] },
  { id: 'devil',       name: 'The Skeptic',      role: 'The adcom member who wants to reject you', icon: 'i-chart', blurb: 'Hear the argument here, not in a rejection.', starters: [] },
  { id: 'career',      name: 'The Career Coach', role: 'The pivot, the money, the life after', icon: 'i-path', blurb: 'Which track, what it pays, how the loan clears.', starters: [] },
];

function saveCfg() { localStorage.setItem('mba-compass-cfg', JSON.stringify(AI.cfg)); }
const api = p => (AI.cfg.workerUrl || '').replace(/\/+$/, '') + p;

/* ---------- Google Identity Services ------------------------ */
function loadGsi() {
  return new Promise((res, rej) => {
    if (window.google?.accounts?.id) return res();
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true; s.defer = true;
    s.onload = () => res(); s.onerror = () => rej(new Error('Could not load Google sign-in'));
    document.head.appendChild(s);
  });
}

async function initGsi() {
  if (!AI.cfg.googleClientId) return;
  await loadGsi();
  google.accounts.id.initialize({
    client_id: AI.cfg.googleClientId,
    callback: onCredential,
    auto_select: true,
    cancel_on_tap_outside: false,
  });
  AI.gsiReady = true;
  const host = document.getElementById('gsiBtn');
  if (host) {
    host.innerHTML = '';
    const dark = (document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
    google.accounts.id.renderButton(host, {
      theme: dark ? 'filled_black' : 'outline', size: 'large', text: 'signin_with', shape: 'pill', width: 260,
    });
  }
  google.accounts.id.prompt();
}

async function onCredential(resp) {
  AI.token = resp.credential;
  sessionStorage.setItem('mba-compass-tok', AI.token);
  try {
    const r = await fetch(api('/api/me'), { headers: { authorization: 'Bearer ' + AI.token } });
    if (r.status === 401) {
      const d = await r.json().catch(() => ({}));
      AI.token = null; sessionStorage.removeItem('mba-compass-tok');
      return renderConsultant({ denied: d.detail || 'not authorised' });
    }
    if (!r.ok) throw new Error('server returned ' + r.status);
    const d = await r.json();
    AI.me = { email: d.email, name: d.name, picture: d.picture };
    AI.agents = (d.agents && d.agents.length) ? d.agents : AGENT_FALLBACK;
    await Promise.all([loadThreads(), pullState()]);
    renderConsultant();
  } catch (e) {
    renderConsultant({ error: e.message });
  }
}

function signOut() {
  AI.token = null; AI.me = null; AI.threadId = null; AI.messages = [];
  sessionStorage.removeItem('mba-compass-tok');
  try { google.accounts.id.disableAutoSelect(); } catch {}
  renderConsultant();
}

/* ---------- cloud sync -------------------------------------- */
const SYNC_KEYS = ['profile', 'shortlist', 'stories', 'essays', 'practice', 'planDone', 'notes', 'openQs', 'ownQs', 'starredQs', 'pathResult', 'schoolNotes'];

async function pushState() {
  if (!AI.token) return;
  const payload = {};
  SYNC_KEYS.forEach(k => { if (S[k] !== undefined) payload[k] = S[k]; });
  try {
    await fetch(api('/api/state'), {
      method: 'POST',
      headers: { authorization: 'Bearer ' + AI.token, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast('Synced to your account');
  } catch { toast('Sync failed — still saved on this device'); }
}

async function pullState() {
  if (!AI.token) return;
  try {
    const r = await fetch(api('/api/state'), { headers: { authorization: 'Bearer ' + AI.token } });
    if (!r.ok) return;
    const { state } = await r.json();
    let n = 0;
    for (const k of SYNC_KEYS) {
      if (state[k] !== undefined) { S[k] = state[k]; n++; }
    }
    if (n) { save(); buildNav(); }
  } catch { /* offline — local state stands */ }
}

/* ---------- workspace context sent with each message -------- */
function workspaceContext() {
  const bits = [];
  const p = S.profile || {};
  bits.push(`Profile: age ${p.age}, ${p.exp} yrs experience, GRE ${p.gre}, CGPA ${p.cgpa}, target intake ${p.intake}.`);
  if (p.track) {
    const t = TRACKS.find(x => x.id === p.track);
    if (t) bits.push(`Chosen career track: ${t.name}.`);
  }
  if (S.shortlist?.length) {
    bits.push(`Shortlist: ${S.shortlist.map(id => (SCHOOLS.find(s => s.id === id) || {}).name).filter(Boolean).join(', ')}.`);
  }
  const stories = Object.entries(S.stories || {}).filter(([, v]) => (v || '').trim().length > 40);
  if (stories.length) {
    bits.push('\nHER STORY BANK (her own words):\n' + stories.map(([id, v]) => {
      const st = STORY_BANK.find(x => x.id === id);
      return `— ${st ? st.name : id}: ${v.slice(0, 1600)}`;
    }).join('\n'));
  } else {
    bits.push('\nHer story bank is EMPTY. Nothing has been written yet.');
  }
  const essays = Object.entries(S.essays || {}).filter(([, v]) => (v || '').trim().length > 60);
  if (essays.length) {
    bits.push('\nESSAY DRAFTS IN PROGRESS:\n' + essays.slice(0, 6).map(([k, v]) => {
      const [sid, idx] = k.split('::');
      const sc = SCHOOLS.find(s => s.id === sid);
      const pr = sc?.essays?.[+idx];
      return `— ${sc ? sc.name : sid} / "${pr ? pr.p.slice(0, 90) : idx}" (${pr ? pr.w : '?'}):\n${v.slice(0, 3000)}`;
    }).join('\n\n'));
  }
  const weak = Object.entries(S.practice?.done || {}).filter(([k, v]) => !k.endsWith('::note') && typeof v === 'number' && v <= 2).map(([k]) => k);
  if (weak.length) bits.push(`\nAnswers she rated 1–2 in practice: ${weak.slice(0, 8).join(' | ')}`);
  if (S.notes?.trim()) bits.push(`\nHer own notes:\n${S.notes.slice(0, 2000)}`);
  return bits.join('\n');
}

/* ---------- threads ----------------------------------------- */
async function loadThreads() {
  if (!AI.token) return;
  try {
    const r = await fetch(api('/api/threads'), { headers: { authorization: 'Bearer ' + AI.token } });
    if (r.ok) AI.threads = (await r.json()).threads || [];
  } catch { AI.threads = []; }
}

async function newThread(agentId, title) {
  const r = await fetch(api('/api/threads'), {
    method: 'POST',
    headers: { authorization: 'Bearer ' + AI.token, 'content-type': 'application/json' },
    body: JSON.stringify({ agent: agentId, title }),
  });
  const { id } = await r.json();
  return id;
}

async function openThread(id, agentId) {
  AI.threadId = id; AI.agent = agentId;
  const r = await fetch(api('/api/threads/' + id), { headers: { authorization: 'Bearer ' + AI.token } });
  AI.messages = r.ok ? (await r.json()).messages || [] : [];
  renderConsultant();
}

/* ---------- send -------------------------------------------- */
async function sendMessage(text) {
  if (AI.busy || !text.trim()) return;
  AI.busy = true;

  if (!AI.threadId) {
    try { AI.threadId = await newThread(AI.agent, text.slice(0, 60)); await loadThreads(); }
    catch { /* chat still works without persistence */ }
  }

  AI.messages.push({ role: 'user', content: text });
  AI.messages.push({ role: 'assistant', content: '' });
  renderChat(); scrollChat();

  const idx = AI.messages.length - 1;
  try {
    const r = await fetch(api('/api/chat'), {
      method: 'POST',
      headers: { authorization: 'Bearer ' + AI.token, 'content-type': 'application/json' },
      body: JSON.stringify({
        agentId: AI.agent,
        threadId: AI.threadId,
        context: workspaceContext(),
        messages: AI.messages.slice(0, -1),
      }),
    });

    if (r.status === 401) throw new Error('Your sign-in expired. Sign in again.');
    if (!r.ok) throw new Error((await r.json().catch(() => ({}))).detail || `server returned ${r.status}`);

    const reader = r.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split('\n\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        let ev; try { ev = JSON.parse(line.slice(6)); } catch { continue; }
        if (ev.t === 'd') { AI.messages[idx].content += ev.v; renderChat(); scrollChat(); }
        else if (ev.t === 'e') { AI.messages[idx].content += `\n\n⚠ ${ev.v}`; renderChat(); }
      }
    }
  } catch (e) {
    AI.messages[idx].content += `\n\n⚠ ${e.message}`;
  } finally {
    AI.busy = false;
    renderChat();
    const el = document.getElementById('aiSend'); if (el) el.disabled = false;
  }
}

/* ---------- rendering --------------------------------------- */
const mdEsc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function md(t) {
  let h = mdEsc(t);
  h = h.replace(/```([\s\S]*?)```/g, (_, c) => `<pre class="aipre">${c.trim()}</pre>`);
  h = h.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  h = h.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  h = h.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<i>$2</i>');
  h = h.replace(/^### (.+)$/gm, '<h4 class="aih">$1</h4>');
  h = h.replace(/^## (.+)$/gm, '<h3 class="aih">$1</h3>');
  h = h.replace(/^\s*[-–—] (.+)$/gm, '<li>$1</li>');
  h = h.replace(/^\s*(\d+)\. (.+)$/gm, '<li>$2</li>');
  h = h.replace(/(<li>[\s\S]*?<\/li>)(?!\s*<li>)/g, '<ul class="aiul">$1</ul>');
  return h.split(/\n{2,}/).map(p => /^\s*<(ul|h3|h4|pre)/.test(p) ? p : `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
}

function scrollChat() {
  const el = document.getElementById('aiScroll');
  if (el) el.scrollTop = el.scrollHeight;
}

function renderChat() {
  const el = document.getElementById('aiThread');
  if (!el) return;
  const ag = AI.agents.find(a => a.id === AI.agent) || AGENT_FALLBACK[0];
  if (!AI.messages.length) {
    el.innerHTML = `<div class="aiempty">
      <div class="aiavatar lg"><svg><use href="#${ag.icon}"/></svg></div>
      <h3>${mdEsc(ag.name)}</h3>
      <p class="dim">${mdEsc(ag.blurb)}</p>
      <div class="suggest" style="justify-content:center;margin-top:18px">
        ${(ag.starters || []).map(s => `<button data-starter="${mdEsc(s)}">${mdEsc(s)}</button>`).join('')}
      </div>
    </div>`;
    el.querySelectorAll('[data-starter]').forEach(b => b.onclick = () => {
      document.getElementById('aiInput').value = b.dataset.starter;
      document.getElementById('aiSend').click();
    });
    return;
  }
  el.innerHTML = AI.messages.map((m, i) => {
    if (m.role === 'user') return `<div class="aimsg user"><div class="aibubble">${mdEsc(m.content).replace(/\n/g, '<br>')}</div></div>`;
    const thinking = !m.content && AI.busy && i === AI.messages.length - 1;
    return `<div class="aimsg bot">
      <div class="aiavatar"><svg><use href="#${ag.icon}"/></svg></div>
      <div class="aibody">${thinking ? '<span class="aidots"><i></i><i></i><i></i></span>' : md(m.content)}</div>
    </div>`;
  }).join('');
}

function renderConsultant(err) {
  const view = document.getElementById('v-ai');
  if (!view) return;

  /* 1. not configured */
  if (!AI.cfg.workerUrl || !AI.cfg.googleClientId) {
    view.innerHTML = `
      <div class="sechead"><h2>AI consultant</h2></div>
      <p class="dek">Six specialists that read your drafts, mine your stories, run mock interviews and argue against your file — using everything already in this workspace. One-time setup, then it just works.</p>
      <div class="card" style="max-width:640px">
        <p class="eyebrow">Connect</p>
        <h3 style="font-size:18px;margin:8px 0 6px">Point this at your worker</h3>
        <p class="dim" style="font-size:13.5px;margin-bottom:16px">Both values below are public by design. Your Anthropic key is <b>not</b> one of them — it lives encrypted on the worker and never reaches this browser. See <code>worker/README.md</code> for the fifteen-minute setup.</p>
        <div class="stack" style="gap:12px">
          <label class="fld"><span>Worker URL</span><input type="text" id="cfgUrl" placeholder="https://mba-compass-api.<you>.workers.dev" value="${mdEsc(AI.cfg.workerUrl || '')}"></label>
          <label class="fld"><span>Google client ID</span><input type="text" id="cfgGid" placeholder="…apps.googleusercontent.com" value="${mdEsc(AI.cfg.googleClientId || '')}"></label>
          <button class="btn primary" id="cfgSave">Save and connect</button>
        </div>
      </div>`;
    document.getElementById('cfgSave').onclick = () => {
      AI.cfg.workerUrl = document.getElementById('cfgUrl').value.trim();
      AI.cfg.googleClientId = document.getElementById('cfgGid').value.trim();
      saveCfg(); renderConsultant(); initGsi();
    };
    return;
  }

  /* 2. signed out */
  if (!AI.me) {
    view.innerHTML = `
      <div class="sechead"><h2>AI consultant</h2></div>
      <p class="dek">Six specialists with access to everything in this workspace — your profile, your story bank, your essay drafts, your practice ratings.</p>
      <div class="card" style="max-width:560px;text-align:center;padding:36px 28px">
        <div class="aiavatar lg" style="margin:0 auto 14px"><svg><use href="#i-compass"/></svg></div>
        <h3 style="font-size:20px">Sign in to continue</h3>
        <p class="dim" style="font-size:13.5px;margin:8px auto 20px;max-width:44ch">Access is restricted to two accounts. Anyone else who signs in is refused by the server, not by this page.</p>
        <div id="gsiBtn" style="display:flex;justify-content:center"></div>
        ${err?.denied ? `<p class="tag risk" style="margin-top:18px;display:inline-flex">Refused — ${mdEsc(err.denied)}</p>` : ''}
        ${err?.error ? `<p class="tag warn" style="margin-top:18px;display:inline-flex">${mdEsc(err.error)}</p>` : ''}
        <p class="dim" style="font-size:12px;margin-top:22px">Worker: <code>${mdEsc(AI.cfg.workerUrl)}</code> · <button class="btn sm ghost" id="cfgReset">change</button></p>
      </div>`;
    document.getElementById('cfgReset').onclick = () => { AI.cfg = {}; saveCfg(); renderConsultant(); };
    if (!AI.gsiReady) initGsi(); else {
      const host = document.getElementById('gsiBtn');
      const dark = (document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
      google.accounts.id.renderButton(host, { theme: dark ? 'filled_black' : 'outline', size: 'large', text: 'signin_with', shape: 'pill', width: 260 });
    }
    return;
  }

  /* 3. signed in */
  const ag = AI.agents.find(a => a.id === AI.agent) || AGENT_FALLBACK[0];
  view.innerHTML = `
    <div class="sechead"><h2>AI consultant</h2>
      <span class="tag good">✓ ${mdEsc(AI.me.email)}</span>
      <span class="spacer"></span>
      <button class="btn sm" id="aiSync">Sync workspace</button>
      <button class="btn sm ghost" id="aiOut">Sign out</button>
    </div>
    <div class="aiwrap">
      <aside class="aiside">
        <p class="eyebrow">Specialists</p>
        <div class="agentlist">${AI.agents.map(a => `
          <button class="agentbtn ${a.id === AI.agent ? 'on' : ''}" data-agent="${a.id}">
            <span class="aiavatar sm"><svg><use href="#${a.icon}"/></svg></span>
            <span><b>${mdEsc(a.name)}</b><em>${mdEsc(a.role)}</em></span>
          </button>`).join('')}</div>
        <p class="eyebrow" style="margin-top:20px">Conversations</p>
        <div class="threadlist">${(AI.threads || []).length
          ? AI.threads.map(t => `<button class="threadbtn ${t.id === AI.threadId ? 'on' : ''}" data-thread="${t.id}" data-tagent="${t.agent}">
              <span>${mdEsc(t.title)}</span><em>${new Date(t.updated_at).toLocaleDateString()}</em></button>`).join('')
          : '<p class="dim" style="font-size:12.5px">No conversations yet.</p>'}</div>
        <button class="btn sm" id="aiNew" style="margin-top:12px;width:100%">＋ New conversation</button>
      </aside>

      <section class="aimain">
        <header class="aihead">
          <span class="aiavatar"><svg><use href="#${ag.icon}"/></svg></span>
          <div><b>${mdEsc(ag.name)}</b><em>${mdEsc(ag.role)}</em></div>
          <span class="spacer"></span>
          <span class="tag mono">reads your workspace</span>
        </header>
        <div class="aiscroll" id="aiScroll"><div id="aiThread"></div></div>
        <div class="aicomposer">
          <textarea id="aiInput" rows="1" placeholder="Ask ${mdEsc(ag.name)}…  (⌘↵ to send)"></textarea>
          <button class="btn primary" id="aiSend">Send</button>
        </div>
      </section>
    </div>`;

  view.querySelectorAll('[data-agent]').forEach(b => b.onclick = () => {
    AI.agent = b.dataset.agent; AI.threadId = null; AI.messages = []; renderConsultant();
  });
  view.querySelectorAll('[data-thread]').forEach(b => b.onclick = () => openThread(b.dataset.thread, b.dataset.tagent));
  document.getElementById('aiNew').onclick = () => { AI.threadId = null; AI.messages = []; renderConsultant(); };
  document.getElementById('aiOut').onclick = signOut;
  document.getElementById('aiSync').onclick = () => pushState();

  const input = document.getElementById('aiInput');
  const send = document.getElementById('aiSend');
  const fire = () => {
    const v = input.value.trim(); if (!v || AI.busy) return;
    input.value = ''; input.style.height = 'auto'; send.disabled = true;
    sendMessage(v);
  };
  send.onclick = fire;
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 200) + 'px';
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); fire(); }
  });
  renderChat(); scrollChat(); input.focus();
}

/* ---------- boot -------------------------------------------- */
(async function bootAI() {
  const cached = sessionStorage.getItem('mba-compass-tok');
  if (cached && AI.cfg.workerUrl) {
    AI.token = cached;
    try {
      const r = await fetch(api('/api/me'), { headers: { authorization: 'Bearer ' + cached } });
      if (r.ok) {
        const d = await r.json();
        AI.me = { email: d.email, name: d.name, picture: d.picture };
        AI.agents = (d.agents && d.agents.length) ? d.agents : AGENT_FALLBACK;
        await Promise.all([loadThreads(), pullState()]);
      } else { AI.token = null; sessionStorage.removeItem('mba-compass-tok'); }
    } catch { AI.token = null; }
  }
  if (AI.cfg.googleClientId && !AI.me) initGsi().catch(() => {});
  if (typeof current !== 'undefined' && current === 'ai') renderConsultant();
})();
