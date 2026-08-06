/* ============================================================
   MBA COMPASS — application
   ============================================================ */
'use strict';

/* ---------- store ------------------------------------------ */
const KEY = 'mba-compass-v1';
const DEFAULT_STATE = {
  profile: JSON.parse(JSON.stringify(DEFAULT_PROFILE)),
  preset: 'balanced',
  shortlist: [],
  starredQs: [],
  ownQs: [],
  openQs: [],
  schoolNotes: {},
  essays: {},
  practice: { done: {}, sessions: 0 },
  planDone: {},
  pathAnswers: [],
  stories: {},
  ansTab: 'stories',
  pathResult: null,
  notes: '',
  theme: ''
};
let S = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
    return Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)), JSON.parse(raw));
  } catch { return JSON.parse(JSON.stringify(DEFAULT_STATE)); }
}
let saveTimer;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(S)); flashSaved(); }
    catch (e) { toast('Could not save — browser storage may be full'); }
  }, 220);
}
function flashSaved() {
  const t = $('#savedTag'); if (!t) return;
  t.textContent = 'saved ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ---------- helpers ---------------------------------------- */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const mid = a => Math.round((a[0] + a[1]) / 2);
const words = t => (t.trim().match(/\S+/g) || []).length;

function toast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('on');
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 2400);
}

/* odds adjusted for GRE + experience */
function schoolOdds(s) {
  const m = GRE_CURVE[S.profile.gre] ?? 1;
  let lo = s.odds[0] * m, hi = s.odds[1] * m;
  // experience penalty at schools that want seniority
  const wantExp = s.avgExp || 5;
  const gap = wantExp - (S.profile.exp || 4);
  if (gap > 1) { const p = 1 - Math.min(0.28, (gap - 1) * 0.13); lo *= p; hi *= p; }
  return [Math.max(0.4, +lo.toFixed(1)), Math.max(0.8, +hi.toFixed(1))];
}
function oddsMid(s) { const o = schoolOdds(s); return (o[0] + o[1]) / 2; }
function fmtOdds(o) { return (o[0] < 1 ? '<1' : Math.round(o[0])) + '–' + Math.round(o[1]) + '%'; }

function fitScore(s, weights, trackId) {
  const keys = ['brandIndia', 'mbb', 'speedS', 'costS', 'scholarship', 'visaS', 'network', 'returnIndia', 'intlExp'];
  let num = 0, den = 0;
  keys.forEach(k => { num += (s[k] || 0) * (weights[k] || 0); den += 10 * (weights[k] || 0); });
  const ow = weights.odds || 0;
  num += Math.min(10, oddsMid(s) / 6.5) * ow; den += 10 * ow;
  let base = den ? (num / den) * 100 : 0;
  if (trackId && s.trackFit && s.trackFit[trackId] != null) {
    base = base * 0.62 + (s.trackFit[trackId] * 10) * 0.38;   // blend in track relevance
  }
  return Math.round(base);
}
function heat(pct, max) {
  const t = Math.max(0, Math.min(1, pct / (max || 60)));
  const dark = (document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
  return dark
    ? `background:rgba(242,166,90,${0.08 + t * 0.40});color:${t > 0.6 ? '#14100A' : 'inherit'}`
    : `background:rgba(180,105,28,${0.07 + t * 0.55});color:${t > 0.55 ? '#fff' : 'inherit'}`;
}
const GOALS = [
  ['Domain change', s => Math.max(...Object.values(s.trackFit)), 'Best track fit available here'],
  ['Brand & placement', s => (s.brandIndia + s.mbb) / 2, 'India brand recognition + MBB access'],
  ['Network & exposure', s => (s.network + s.intlExp) / 2, 'Network strength + international exposure gained'],
  ['Return to India', s => s.returnIndia, 'Alumni density and ease of moving home'],
  ['Timing — out fast', s => s.speedS, 'Programme length'],
  ['Loan repayable', s => (s.costS + s.scholarship + s.visaS) / 3, 'Low cost + scholarship odds + visa security']
];
function goalTable(s) {
  return GOALS.map(([n, f, why]) => {
    const v = f(s), col = v >= 8 ? 'var(--good)' : v >= 6 ? 'var(--acc)' : v >= 4 ? 'var(--warn)' : 'var(--risk)';
    return `<div style="padding:7px 0;border-bottom:1px solid var(--line)">
      <div class="row" style="justify-content:space-between;gap:8px">
        <span style="font-size:13.5px">${esc(n)}</span><span class="mono" style="color:${col};font-size:13px">${v.toFixed(1)}</span>
      </div>
      <div class="meter" style="margin-top:4px"><i style="width:${v * 10}%;background:${col}"></i></div>
      <div class="dim" style="font-size:11.5px;margin-top:3px">${esc(why)}</div></div>`;
  }).join('');
}
function provBadge(src) {
  return src === 'verified'
    ? '<span class="tag good">✓ verified against source</span>'
    : src === 'partial' ? '<span class="tag warn">⚠ partial — sources disagree</span>'
    : '<span class="tag risk">⚠ not verified — check the school</span>';
}
const scoreColour = v => v >= 7.5 ? 'var(--good)' : v >= 6 ? 'var(--acc)' : v >= 5 ? 'var(--warn)' : 'var(--risk)';

/* ---------- navigation -------------------------------------- */
const VIEWS = [
  { id: 'advisor',  label: 'Advisor',    title: 'Where things stand',  icon: 'i-compass' },
  { id: 'schools',  label: 'Schools',    title: 'School explorer',     icon: 'i-school', badge: () => SCHOOLS.length },
  { id: 'path',     label: 'Path finder',title: 'Which branch?',       icon: 'i-path' },
  { id: 'ai',       label: 'Consultant', title: 'AI consultant',       icon: 'i-send',   badge: () => 6 },
  { id: 'answers',  label: 'Answers',    title: 'Answers',             icon: 'i-star',   badge: () => MODEL_ANSWERS.length },
  { id: 'vault',    label: 'Interviews', title: 'Interview vault',     icon: 'i-mic',    badge: () => QUESTIONS.length + S.ownQs.length },
  { id: 'practice', label: 'Practice',   title: 'Practice',            icon: 'i-play' },
  { id: 'essays',   label: 'Essays',     title: 'Essay workshop',      icon: 'i-pen' },
  { id: 'plan',     label: 'Plan',       title: 'The plan',            icon: 'i-cal' },
  { id: 'profile',  label: 'Profile',    title: 'Your profile',        icon: 'i-user' },
  { id: 'sources',  label: 'Sources',    title: 'Sources & accuracy',  icon: 'i-chart' }
];
let current = 'advisor';

function buildNav() {
  $('#navlist').innerHTML = VIEWS.map(v =>
    `<button data-v="${v.id}"><svg class="ic"><use href="#${v.icon}"/></svg>${v.label}${v.badge ? `<span class="badge">${v.badge()}</span>` : ''}</button>`).join('');
  $('#mobnav').innerHTML = VIEWS.map(v =>
    `<button data-v="${v.id}"><svg><use href="#${v.icon}"/></svg>${v.label}</button>`).join('');
  $$('[data-v]').forEach(b => b.onclick = () => go(b.dataset.v));
}
function go(id) {
  current = id;
  VIEWS.forEach(v => { const el = $('#v-' + (v.id === 'path' ? 'path' : v.id)); if (el) el.hidden = v.id !== id; });
  $$('[data-v]').forEach(b => b.setAttribute('aria-current', b.dataset.v === id ? 'true' : 'false'));
  const v = VIEWS.find(x => x.id === id);
  $('#crumb').textContent = v.label; $('#vtitle').textContent = v.title;
  location.hash = id;
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (id === 'schools') renderSchools();
  if (id === 'path') renderPath();
  if (id === 'vault') renderVault();
  if (id === 'practice') renderPractice();
  if (id === 'essays') renderEssays();
  if (id === 'plan') renderPlan();
  if (id === 'profile') renderProfile();
  if (id === 'advisor') renderAdvisor();
  if (id === 'sources') renderSources();
  if (id === 'answers') renderAnswers();
  if (id === 'ai' && typeof renderConsultant === 'function') renderConsultant();
}

/* ---------- theme ------------------------------------------- */
function applyTheme() {
  if (S.theme) document.documentElement.dataset.theme = S.theme;
  else delete document.documentElement.dataset.theme;
}
$('#themeBtn').onclick = () => {
  const cur = S.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  S.theme = cur === 'dark' ? 'light' : 'dark';
  applyTheme(); save();
  if (current === 'schools') renderSchools();
};

/* ============================================================
   ADVISOR
   ============================================================ */
function renderAdvisor() {
  $('#brandSub').textContent = (S.profile.name ? 'Built for ' + S.profile.name : 'Your workspace');
  const t1 = SCHOOLS.filter(s => s.tier === 1).sort((a, b) => oddsMid(b) - oddsMid(a));
  const best = rankedSchools()[0];
  const daysToR2 = Math.max(0, Math.round((new Date('2027-01-05') - new Date()) / 864e5));

  $('#heroTiles').innerHTML = [
    ['Best overall fit', best ? best.name : '—', best ? `Fit ${best.fit}/100 · ${fmtOdds(schoolOdds(best))} odds` : ''],
    ['Highest odds in Tier 1', t1[0] ? t1[0].name : '—', t1[0] ? fmtOdds(schoolOdds(t1[0])) : ''],
    ['Days to Round 2', daysToR2, 'Early January 2027 — your real deadline'],
    ['Shortlisted', S.shortlist.length, S.shortlist.length ? 'Apply to 8–10, no more' : 'Star schools in the explorer']
  ].map(([l, v, n]) => `<div class="tile"><div class="lbl">${l}</div><div class="big">${esc(v)}</div><div class="note">${esc(n)}</div></div>`).join('');

  $('#suggest').innerHTML = KB.slice(0, 10).map((k, i) => `<button data-kb="${i}">${esc(k.q)}</button>`).join('');
  $$('#suggest button').forEach(b => b.onclick = () => { $('#askInput').value = KB[+b.dataset.kb].q; ask(); });

  $('#scorecard').innerHTML = SCORECARD.map(([l, v, note]) => `
    <div style="padding:8px 0;border-bottom:1px solid var(--line)">
      <div class="row" style="gap:8px;justify-content:space-between">
        <span style="font-size:13.5px;font-weight:${l.startsWith('Overall comp') ? 700 : 500}">${esc(l)}</span>
        <span class="mono" style="color:${scoreColour(v)};font-size:14px">${v.toFixed(1)}</span>
      </div>
      <div class="meter" style="margin-top:5px"><i style="width:${v * 10}%;background:${scoreColour(v)}"></i></div>
      <div class="note dim" style="font-size:12px;margin-top:5px;line-height:1.45">${esc(note)}</div>
    </div>`).join('');

  renderOpenQs();
}

function renderOpenQs() {
  const el = $('#openQs');
  if (!S.openQs.length) { el.innerHTML = `<p class="dim" style="font-size:13px">Nothing yet.</p>`; return; }
  el.innerHTML = S.openQs.map((q, i) => `
    <div class="row" style="padding:6px 0;border-bottom:1px solid var(--line);gap:8px;flex-wrap:nowrap">
      <span style="flex:1;font-size:13.5px">${esc(q)}</span>
      <button class="iconbtn" data-rmq="${i}" style="width:26px;height:26px;flex:0 0 26px" aria-label="Remove"><svg><use href="#i-x"/></svg></button>
    </div>`).join('');
  $$('[data-rmq]').forEach(b => b.onclick = () => { S.openQs.splice(+b.dataset.rmq, 1); save(); renderOpenQs(); });
}
$('#addQ').onclick = () => {
  const v = $('#newQ').value.trim(); if (!v) return;
  S.openQs.push(v); $('#newQ').value = ''; save(); renderOpenQs(); toast('Saved to open questions');
};
$('#newQ').addEventListener('keydown', e => { if (e.key === 'Enter') $('#addQ').click(); });

function ask() {
  const q = $('#askInput').value.trim();
  if (!q) return;
  const lower = q.toLowerCase();
  let best = null, bestScore = 0;
  KB.forEach(entry => {
    let sc = 0;
    entry.k.forEach(kw => { if (lower.includes(kw)) sc += kw.length; });
    entry.q.toLowerCase().split(/\W+/).forEach(w => { if (w.length > 3 && lower.includes(w)) sc += 2; });
    if (sc > bestScore) { bestScore = sc; best = entry; }
  });
  const out = $('#askOut');
  if (best && bestScore >= 4) {
    out.innerHTML = `<div class="answer"><h4>${esc(best.q)}</h4><p>${esc(best.a)}</p></div>`;
  } else {
    const already = S.openQs.includes(q);
    if (!already) { S.openQs.push(q); save(); renderOpenQs(); }
    out.innerHTML = `<div class="answer" style="border-left-color:var(--warn)">
      <h4>I don't have a written answer for that.</h4>
      <p>Rather than guess, I've ${already ? 'kept' : 'added'} it to your open-questions list below. Export that list and bring it back to Claude for a real answer.

In the meantime, try rephrasing with a keyword like <b>loan</b>, <b>visa</b>, <b>GRE</b>, <b>essay</b>, <b>interview</b>, <b>scholarship</b>, <b>marketing</b>, <b>timing</b> or <b>which school</b>.</p></div>`;
  }
}
$('#askBtn').onclick = ask;
$('#askInput').addEventListener('keydown', e => { if (e.key === 'Enter') ask(); });

/* ============================================================
   SCHOOLS
   ============================================================ */
const schoolFilters = { region: 'all', len: 'all', star: false, q: '', track: '', view: 'cards', sortK: 'fit', sortD: 'd' };

function rankedSchools() {
  const w = PRESETS[S.preset] ? PRESETS[S.preset].w : S.profile.weights;
  return SCHOOLS.map(s => Object.assign({}, s, {
    fit: fitScore(s, w, schoolFilters.track),
    oddsMid: oddsMid(s),
    oddsRange: schoolOdds(s)
  })).sort((a, b) => b.fit - a.fit);
}
function filteredSchools() {
  let r = rankedSchools();
  if (schoolFilters.region !== 'all') r = r.filter(s => s.region === schoolFilters.region);
  if (schoolFilters.len !== 'all') r = r.filter(s => schoolFilters.len === 'short' ? s.months <= 12 : s.months > 12);
  if (schoolFilters.star) r = r.filter(s => S.shortlist.includes(s.id));
  if (schoolFilters.q) {
    const q = schoolFilters.q.toLowerCase();
    r = r.filter(s => (s.name + ' ' + s.loc + ' ' + s.country + ' ' + s.tags.join(' ') + ' ' + s.recruiters.join(' ') + ' ' + s.majors.join(' ')).toLowerCase().includes(q));
  }
  const k = schoolFilters.sortK, d = schoolFilters.sortD === 'a' ? 1 : -1;
  r.sort((a, b) => typeof a[k] === 'string' ? d * a[k].localeCompare(b[k]) : d * (a[k] - b[k]));
  return r;
}

function initSchoolControls() {
  $('#preset').innerHTML = Object.entries(PRESETS).map(([k, v]) => `<option value="${k}">${esc(v.label)}</option>`).join('');
  $('#preset').value = S.preset;
  $('#preset').onchange = e => { S.preset = e.target.value; save(); renderSchools(); };

  $('#trackFilter').innerHTML = `<option value="">Not filtering by track</option>` +
    TRACKS.map(t => `<option value="${t.id}">${esc(t.name)}</option>`).join('');
  $('#trackFilter').value = schoolFilters.track = S.profile.track || '';
  $('#trackFilter').onchange = e => { schoolFilters.track = e.target.value; S.profile.track = e.target.value; save(); renderSchools(); };

  $('#viewMode').onchange = e => { schoolFilters.view = e.target.value; renderSchools(); };
  $('#schoolSearch').oninput = e => { schoolFilters.q = e.target.value; renderSchools(); };

  const regions = [['all', 'All'], ['EU', 'Europe'], ['US', 'USA'], ['AS', 'Asia']];
  $('#fRegion').innerHTML = regions.map(([v, l]) => `<button class="chip" data-reg="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('');
  $$('[data-reg]').forEach(b => b.onclick = () => {
    schoolFilters.region = b.dataset.reg;
    $$('[data-reg]').forEach(x => x.setAttribute('aria-pressed', x === b));
    renderSchools();
  });
  const lens = [['all', 'Any length'], ['short', '≤ 12 months'], ['long', '> 12 months']];
  $('#fLen').innerHTML = lens.map(([v, l]) => `<button class="chip" data-len="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('');
  $$('[data-len]').forEach(b => b.onclick = () => {
    schoolFilters.len = b.dataset.len;
    $$('[data-len]').forEach(x => x.setAttribute('aria-pressed', x === b));
    renderSchools();
  });
  $('#fStar').onclick = () => {
    schoolFilters.star = !schoolFilters.star;
    $('#fStar').setAttribute('aria-pressed', schoolFilters.star);
    renderSchools();
  };
  $$('#sTable th.srt').forEach(th => th.onclick = () => {
    const k = th.dataset.k;
    if (schoolFilters.sortK === k) schoolFilters.sortD = schoolFilters.sortD === 'a' ? 'd' : 'a';
    else { schoolFilters.sortK = k; schoolFilters.sortD = (k === 'name' || k === 'deadlineSort' || k === 'costCr' || k === 'months') ? 'a' : 'd'; }
    renderSchools();
  });
}

function renderSchools() {
  const rows = filteredSchools();
  $('#schoolCount').textContent = rows.length + ' shown';
  const cards = $('#cardsWrap'), tbl = $('#tableWrap');
  cards.hidden = schoolFilters.view !== 'cards';
  tbl.hidden = schoolFilters.view !== 'table';
  const maxFit = Math.max(...rows.map(r => r.fit), 1);

  if (schoolFilters.view === 'cards') {
    cards.innerHTML = rows.length ? rows.map(s => {
      const starred = S.shortlist.includes(s.id);
      const col = s.fit >= maxFit - 6 ? 'var(--good)' : s.fit >= maxFit - 18 ? 'var(--acc)' : 'var(--line-2)';
      const trackTag = schoolFilters.track && s.trackFit[schoolFilters.track] >= 8
        ? `<span class="tag teal">★ strong for ${esc(TRACKS.find(t => t.id === schoolFilters.track).short)}</span>` : '';
      return `<article class="scard" data-s="${s.id}">
        <span class="fitbar" style="background:${col}"></span>
        <button class="starbtn" data-star="${s.id}" aria-pressed="${starred}" aria-label="Shortlist"><svg><use href="#i-star"/></svg></button>
        <h3>${esc(s.name)}</h3>
        <div class="loc">${esc(s.loc)}</div>
        <div class="tags">${trackTag}${s.tags.slice(0, 5).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
        <div class="facts">
          <div>Fit<b style="color:${col}">${s.fit}</b></div>
          <div>Odds<b>${fmtOdds(s.oddsRange)}</b></div>
          <div>Months<b>${s.months}</b></div>
          <div>Cost ₹Cr<b>${s.costCr.toFixed(2)}</b></div>
          <div>Class<b>${s.classSize}</b></div>
        </div>
      </article>`;
    }).join('') : `<div class="empty">No schools match those filters.</div>`;
  } else {
    $('#sTable tbody').innerHTML = rows.map(s => `<tr data-s="${s.id}">
      <td><span class="sname">${esc(s.name)}</span><span class="ssub">${esc(s.country)}</span></td>
      <td class="n" style="font-weight:700;color:${s.fit >= maxFit - 6 ? 'var(--good)' : 'var(--acc)'}">${s.fit}</td>
      <td class="n">${s.months} mo</td>
      <td class="n">${s.costCr.toFixed(2)}</td>
      <td class="n"><span style="${heat(s.oddsMid)};padding:2px 7px;border-radius:4px">${fmtOdds(s.oddsRange)}</span></td>
      <td class="n">${s.consulting}%</td>
      <td class="n">${s.classSize}</td>
      <td class="n">${s.brandIndia}/10</td>
      <td style="white-space:nowrap">${esc(s.deadline)}</td>
    </tr>`).join('');
    $$('#sTable th.srt').forEach(th => th.dataset.d = th.dataset.k === schoolFilters.sortK ? schoolFilters.sortD : '');
  }

  $$('[data-star]').forEach(b => b.onclick = e => {
    e.stopPropagation();
    const id = b.dataset.star;
    const i = S.shortlist.indexOf(id);
    if (i > -1) S.shortlist.splice(i, 1); else S.shortlist.push(id);
    save(); renderSchools();
    toast(i > -1 ? 'Removed from shortlist' : 'Added to shortlist');
  });
  $$('[data-s]').forEach(el => el.onclick = () => openSchool(el.dataset.s));
}

/* ---------- drawer ----------------------------------------- */
function openSchool(id) {
  const s = SCHOOLS.find(x => x.id === id); if (!s) return;
  const o = schoolOdds(s);
  const qs = QUESTIONS.filter(q => q.s === id).concat(S.ownQs.filter(q => q.s === id));
  const track = schoolFilters.track ? TRACKS.find(t => t.id === schoolFilters.track) : null;
  const topTracks = Object.entries(s.trackFit).sort((a, b) => b[1] - a[1]).slice(0, 3)
    .map(([k, v]) => { const t = TRACKS.find(x => x.id === k); return `<span class="tag ${v >= 9 ? 'good' : 'teal'}">${esc(t.short)} ${v}/10</span>`; }).join('');

  $('#drawerTitle').textContent = s.name;
  $('#drawerSub').textContent = `${s.loc} · ${s.months} months · FT #${s.ftRank} · Tier ${s.tier}`;
  $('#drawerBody').innerHTML = `
    <div class="pillrow" style="margin-bottom:16px">${s.tags.map(t => `<span class="tag acc">${esc(t)}</span>`).join('')}</div>

    <h4>Best known for</h4>
    <p>${esc(s.bestKnownFor)}</p>

    <h4>The read for you</h4>
    <p>${esc(s.verdict)}</p>

    <h4>Numbers</h4>
    <div class="dl">
      <div><dt>Your odds</dt><dd>${fmtOdds(o)}</dd></div>
      <div><dt>All-in cost</dt><dd>₹${s.costCr.toFixed(2)} Cr</dd></div>
      <div><dt>Tuition</dt><dd>${esc(s.tuition)}</dd></div>
      <div><dt>Class size</dt><dd>${s.classSize}</dd></div>
      <div><dt>Intakes</dt><dd style="font-size:12px">${esc(s.intakes)}</dd></div>
      <div><dt>Women</dt><dd>${s.women}%</dd></div>
      <div><dt>International</dt><dd>${s.intl}%</dd></div>
      <div><dt>Avg age</dt><dd>${s.avgAge}</dd></div>
      <div><dt>Avg experience</dt><dd>${s.avgExp} yrs</dd></div>
      <div><dt>Consulting</dt><dd>${s.consulting}%</dd></div>
      <div><dt>Median pay</dt><dd style="font-size:12px">${esc(s.salary)}</dd></div>
      <div><dt>India brand</dt><dd>${s.brandIndia}/10</dd></div>
      <div><dt>Test</dt><dd style="font-size:11.5px">${esc(s.test)}</dd></div>
      <div><dt>R1 deadline</dt><dd style="font-size:12px">${esc(s.deadline)}</dd></div>
    </div>
    ${s.deadlineDetail ? `<div class="callout-note" style="margin-top:12px;border-left:3px solid ${s.deadlineSrc === 'verified' ? 'var(--good)' : 'var(--risk)'};background:var(--surf);padding:12px 15px;border-radius:0 6px 6px 0">
      <div class="pillrow" style="margin-bottom:7px">${provBadge(s.deadlineSrc)}</div>
      <p style="font-size:13.5px">${esc(s.deadlineDetail)}</p></div>` : ''}

    <h4>Strongest career tracks here</h4>
    <div class="pillrow">${topTracks}</div>
    ${track ? `<p style="margin-top:10px;font-size:13.5px">For <b>${esc(track.name)}</b> specifically, this school scores <b>${s.trackFit[track.id]}/10</b>.</p>` : ''}

    <h4>Specialisations &amp; majors offered</h4>
    <div class="pillrow">${s.majors.map(m => `<span class="tag">${esc(m)}</span>`).join('')}</div>

    <h4>Who recruits here</h4>
    <div class="pillrow">${s.recruiters.map(r => `<span class="tag vio">${esc(r)}</span>`).join('')}</div>

    <h4>Against your six stated goals</h4>
    <p class="dim" style="font-size:12.5px;margin-bottom:8px">Every school on your list is scored on the same six axes, computed from the same underlying ratings. Nothing is privileged.</p>
    ${goalTable(s)}

    <h4>Interview format</h4>
    <p>${esc(SCHOOL_INTERVIEW_NOTES[s.id] || s.interviewFormat)}</p>

    <h4>Questions they ask <span style="color:var(--ink-3)">(${qs.length})</span></h4>
    ${qs.length ? qs.map(q => `<div class="qitem"><span class="tag ${q.src === 'reported' ? 'good' : 'warn'}">${q.src === 'reported' ? 'reported' : 'format'}</span><p>${esc(q.q)}</p></div>`).join('')
      : `<p class="dim">No school-specific questions logged. Use the general bank in the Interview vault.</p>`}

    <h4>Essay prompts (2026–27)</h4>
    <div class="pillrow" style="margin-bottom:10px">${provBadge(s.essaySrc)}<span class="tag mono">${esc(s.essayChecked || '')}</span><a class="tag" href="${esc(s.essayUrl || '#')}" target="_blank" rel="noopener">official page ↗</a></div>
    ${s.essays.map(e => `<div class="qitem"><span class="tag mono">${esc(e.w)}</span><p>${esc(e.p)}</p></div>`).join('')}

    <h4>Your notes</h4>
    <textarea id="snote" style="min-height:110px" placeholder="Alumni you spoke to, doubts, things to check…">${esc(S.schoolNotes[id] || '')}</textarea>

    <div class="row" style="margin-top:16px">
      <button class="btn primary" id="dStar">${S.shortlist.includes(id) ? '★ On shortlist' : '☆ Add to shortlist'}</button>
      <button class="btn" id="dPractice">Practise this school's questions</button>
      <button class="btn" id="dEssay">Write its essays</button>
    </div>`;

  $('#snote').oninput = e => { S.schoolNotes[id] = e.target.value; save(); };
  $('#dStar').onclick = () => {
    const i = S.shortlist.indexOf(id);
    if (i > -1) S.shortlist.splice(i, 1); else S.shortlist.push(id);
    save(); renderSchools(); openSchool(id);
  };
  $('#dPractice').onclick = () => { closeDrawer(); startPractice(id); go('practice'); };
  $('#dEssay').onclick = () => { closeDrawer(); go('essays'); $('#eSchool').value = id; $('#eSchool').dispatchEvent(new Event('change')); };

  $('#drawer').classList.add('on'); $('#scrim').classList.add('on');
  document.body.style.overflow = 'hidden';
  $('#drawerClose').focus();
}
function closeDrawer() {
  $('#drawer').classList.remove('on'); $('#scrim').classList.remove('on');
  document.body.style.overflow = '';
}
$('#drawerClose').onclick = closeDrawer;
$('#scrim').onclick = closeDrawer;
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

/* ============================================================
   PATH FINDER
   ============================================================ */
function renderPath() {
  const body = $('#pathBody');
  if (S.pathResult) return renderPathResult();
  const step = S.pathAnswers.length;
  if (step >= PATHFINDER.length) { computePath(); return renderPathResult(); }
  const q = PATHFINDER[step];
  body.innerHTML = `
    <div class="card">
      <div class="pfprog" style="margin-bottom:18px"><i style="width:${(step / PATHFINDER.length) * 100}%"></i></div>
      <p class="eyebrow">Question ${step + 1} of ${PATHFINDER.length}</p>
      <h3 style="font-size:clamp(19px,2.6vw,24px);margin:10px 0 18px">${esc(q.q)}</h3>
      <div class="stack" style="gap:9px">
        ${q.a.map((a, i) => `<button class="pfopt" data-a="${i}">${esc(a.t)}</button>`).join('')}
      </div>
      ${step ? `<button class="btn ghost sm" id="pfBack" style="margin-top:16px">← Back</button>` : ''}
    </div>`;
  $$('[data-a]').forEach(b => b.onclick = () => { S.pathAnswers.push(+b.dataset.a); save(); renderPath(); });
  if ($('#pfBack')) $('#pfBack').onclick = () => { S.pathAnswers.pop(); save(); renderPath(); };
}

function computePath() {
  const sc = {}; TRACKS.forEach(t => sc[t.id] = 0);
  S.pathAnswers.forEach((ai, qi) => {
    const w = PATHFINDER[qi].a[ai].w;
    for (const k in w) sc[k] = (sc[k] || 0) + w[k];
  });
  const max = Math.max(...Object.values(sc), 1);
  S.pathResult = Object.entries(sc)
    .map(([id, v]) => ({ id, score: Math.round((v / max) * 100) }))
    .sort((a, b) => b.score - a.score);
  S.profile.track = S.pathResult[0].id;
  schoolFilters.track = S.pathResult[0].id;
  save();
}

function renderPathResult() {
  const res = S.pathResult;
  const top = TRACKS.find(t => t.id === res[0].id);
  const second = TRACKS.find(t => t.id === res[1].id);
  const third = TRACKS.find(t => t.id === res[2].id);

  const schoolsFor = t => rankedSchools()
    .map(s => ({ s, v: s.trackFit[t.id] || 0 }))
    .sort((a, b) => b.v - a.v || b.s.fit - a.s.fit).slice(0, 6);

  const diffLabel = d => ['', 'Very achievable', 'Achievable', 'Competitive', 'Hard', 'Very hard'][d];
  const diffClass = d => d <= 2 ? 'good' : d === 3 ? 'warn' : 'risk';

  const card = t => `
    <div class="card">
      <div class="row" style="justify-content:space-between;align-items:flex-start">
        <div><h3 style="font-size:19px">${esc(t.name)}</h3><p class="dim" style="font-size:13px;margin-top:3px">${esc(t.blurb)}</p></div>
        <span class="tag ${diffClass(t.switchDifficulty)}">${diffLabel(t.switchDifficulty)}</span>
      </div>
      <h4 class="eyebrow" style="margin-top:16px">What the job actually is</h4>
      <p class="muted" style="font-size:14px;margin-top:6px">${esc(t.dayToDay)}</p>
      <h4 class="eyebrow" style="margin-top:14px">Honest read for you</h4>
      <p class="muted" style="font-size:14px;margin-top:6px">${esc(t.whyHer)}</p>
      <div class="dl" style="margin-top:14px">
        <div><dt>US pay</dt><dd style="font-size:12px">${esc(t.compUS)}</dd></div>
        <div><dt>Europe pay</dt><dd style="font-size:12px">${esc(t.compEU)}</dd></div>
        <div><dt>India pay</dt><dd style="font-size:12px">${esc(t.compIndia)}</dd></div>
        <div><dt>Route to own business</dt><dd>${t.ownBusiness}/5</dd></div>
      </div>
      <p class="dim" style="font-size:13px;margin-top:10px"><b>Own business:</b> ${esc(t.ownBusinessNote)}</p>
      <p class="dim" style="font-size:13px;margin-top:6px"><b>Visa reality:</b> ${esc(t.visaNote)}</p>
      <h4 class="eyebrow" style="margin-top:14px">Who hires</h4>
      <div class="pillrow" style="margin-top:7px">${t.employers.map(e => `<span class="tag vio">${esc(e)}</span>`).join('')}</div>
      <h4 class="eyebrow" style="margin-top:14px">Best schools for this, ranked against your weights</h4>
      <div class="pillrow" style="margin-top:7px">${schoolsFor(t).map(({ s, v }) => `<span class="tag ${v >= 9 ? 'good' : 'teal'}" data-goto="${s.id}" style="cursor:pointer">${esc(s.name)} ${v}/10</span>`).join('')}</div>
    </div>`;

  $('#pathBody').innerHTML = `
    <div class="card" style="background:linear-gradient(150deg,var(--surf),var(--surf-2));margin-bottom:16px">
      <p class="eyebrow">Your result</p>
      <h2 style="font-size:clamp(22px,3.2vw,30px);margin:10px 0 10px">${esc(top.name)}</h2>
      <p class="muted" style="max-width:70ch">${esc(top.whyHer)}</p>
      <div style="margin-top:20px">${res.map(r => {
        const t = TRACKS.find(x => x.id === r.id);
        return `<div class="trackrow">
          <div>
            <div class="row" style="justify-content:space-between;gap:8px">
              <span style="font-size:14px;font-weight:${r === res[0] ? 700 : 500}">${esc(t.name)}</span>
            </div>
            <div class="meter" style="margin-top:5px"><i style="width:${r.score}%;background:${r.score > 75 ? 'var(--good)' : r.score > 45 ? 'var(--acc)' : 'var(--line-2)'}"></i></div>
          </div>
          <span class="mono dim" style="text-align:right;font-size:13px">${r.score}</span>
        </div>`;
      }).join('')}</div>
      <div class="row" style="margin-top:18px">
        <button class="btn primary" id="pfApply">Re-rank schools for ${esc(top.short)}</button>
        <button class="btn" id="pfRedo">Take it again</button>
      </div>
    </div>
    <div class="stack">${card(top)}${card(second)}${card(third)}</div>
    <div class="card" style="margin-top:16px">
      <p class="eyebrow">The honest meta-point</p>
      <p class="muted" style="margin-top:8px">Every track on this list except consulting requires you to <b>evidence the pivot before you apply</b>, not after you're admitted. Adcoms and recruiters both ask the same question: what have you actually done that suggests you'd be good at this? A statistics-honours consultant claiming she wants brand management, with nothing on her record but pharma models, is a story. The same person with a side project, a pro-bono brand engagement, or a written point of view on Indian consumer markets is a candidate. Ten weeks of deliberate work is the difference.</p>
      <p class="muted" style="margin-top:10px">And the sequencing point that matters most: <b>with a ₹1.2–1.5 crore loan, going straight to a low-paying creative role or founding a company immediately post-MBA is financially reckless.</b> The sane version is two to four years in a well-paid adjacent role that teaches you the craft, then the leap — with savings, a network, and a problem you've seen up close.</p>
    </div>`;

  $('#pfRedo').onclick = () => { S.pathAnswers = []; S.pathResult = null; save(); renderPath(); };
  $('#pfApply').onclick = () => { schoolFilters.track = top.id; S.profile.track = top.id; save(); go('schools'); };
  $$('[data-goto]').forEach(b => b.onclick = () => { go('schools'); setTimeout(() => openSchool(b.dataset.goto), 60); });
}

/* ============================================================
   INTERVIEW VAULT
   ============================================================ */
const vaultF = { school: 'all', type: 'all', q: '', star: false };

function allQuestions() { return QUESTIONS.concat(S.ownQs); }

function initVault() {
  const schoolOpts = `<option value="all">All schools</option><option value="general">General / any school</option>` +
    SCHOOLS.map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join('');
  $('#vSchool').innerHTML = schoolOpts;
  $('#ownSchool').innerHTML = `<option value="general">General</option>` + SCHOOLS.map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join('');
  $('#vSchool').onchange = e => { vaultF.school = e.target.value; renderVault(); };
  $('#vType').onchange = e => { vaultF.type = e.target.value; renderVault(); };
  $('#vSearch').oninput = e => { vaultF.q = e.target.value; renderVault(); };
  $('#vStar').onclick = () => { vaultF.star = !vaultF.star; $('#vStar').setAttribute('aria-pressed', vaultF.star); renderVault(); };
  $('#vPractice').onclick = () => { startPractice(null, vaultQuestions()); go('practice'); };
  $('#addOwnQ').onclick = () => {
    const q = $('#ownQ').value.trim(); if (!q) return;
    S.ownQs.push({ s: $('#ownSchool').value, t: 'Mine', src: 'own', q });
    $('#ownQ').value = ''; save(); renderVault(); buildNav(); go('vault'); toast('Added to the vault');
  };
}
function vaultQuestions() {
  let r = allQuestions();
  if (vaultF.school !== 'all') r = r.filter(q => q.s === vaultF.school);
  if (vaultF.type !== 'all') r = r.filter(q => q.t === vaultF.type);
  if (vaultF.star) r = r.filter(q => S.starredQs.includes(q.q));
  if (vaultF.q) { const s = vaultF.q.toLowerCase(); r = r.filter(q => q.q.toLowerCase().includes(s)); }
  return r;
}
function renderVault() {
  const types = [...new Set(allQuestions().map(q => q.t))].sort();
  const keep = vaultF.type;
  $('#vType').innerHTML = `<option value="all">All types</option>` + types.map(t => `<option value="${esc(t)}">${esc(t)}</option>`).join('');
  $('#vType').value = types.includes(keep) ? keep : 'all';

  const rows = vaultQuestions();
  $('#qCount').textContent = rows.length + ' questions';
  $('#vList').innerHTML = rows.length ? rows.map((q, i) => {
    const sch = q.s === 'general' ? 'Any school' : (SCHOOLS.find(s => s.id === q.s) || {}).name || q.s;
    const starred = S.starredQs.includes(q.q);
    return `<div class="qitem">
      <button class="starbtn" data-qs="${esc(q.q)}" aria-pressed="${starred}" style="position:static;flex:0 0 auto"><svg><use href="#i-star"/></svg></button>
      <div style="flex:1">
        <p>${esc(q.q)}</p>
        <div class="row" style="gap:5px;margin-top:6px">
          <span class="tag">${esc(sch)}</span>
          <span class="tag">${esc(q.t)}</span>
          <span class="tag ${q.src === 'reported' ? 'good' : q.src === 'own' ? 'vio' : 'warn'}">${q.src === 'reported' ? 'reported' : q.src === 'own' ? 'yours' : 'format-based'}</span>
        </div>
      </div>
    </div>`;
  }).join('') : `<div class="empty">No questions match.</div>`;

  $$('[data-qs]').forEach(b => b.onclick = () => {
    const q = b.dataset.qs, i = S.starredQs.indexOf(q);
    if (i > -1) S.starredQs.splice(i, 1); else S.starredQs.push(q);
    save(); renderVault();
  });
}

/* ============================================================
   PRACTICE
   ============================================================ */
let pSession = null;

function startPractice(schoolId, list) {
  let pool = list || (schoolId ? allQuestions().filter(q => q.s === schoolId || q.s === 'general') : allQuestions());
  pool = pool.slice().sort(() => Math.random() - 0.5);
  pSession = { pool, i: 0, started: null, elapsed: 0, timer: null, revealed: false };
  S.practice.sessions++; save();
}
function renderPractice() {
  const body = $('#practiceBody');
  const done = Object.keys(S.practice.done).length;
  $('#pStats').textContent = `${done} answered · ${S.practice.sessions} sessions`;

  if (!pSession) {
    const starred = allQuestions().filter(q => S.starredQs.includes(q.q));
    const gaps = allQuestions().filter(q => q.t === 'Your gap');
    body.innerHTML = `
      <div class="grid g2">
        <div class="card"><h3 style="font-size:17px">Start a session</h3>
          <p class="muted" style="font-size:14px;margin-top:8px">Questions come at you one at a time with a timer. Answer out loud, then rate yourself.</p>
          <div class="stack" style="margin-top:14px;gap:8px">
            <button class="btn primary" id="pAll">Everything (${allQuestions().length})</button>
            <button class="btn" id="pStar" ${starred.length ? '' : 'disabled'}>Starred only (${starred.length})</button>
            <button class="btn" id="pGap">The eight that decide you (${gaps.length})</button>
            <label class="fld" style="margin-top:6px"><span>Or one school</span><select id="pSchool">${SCHOOLS.map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></label>
            <button class="btn" id="pSchoolGo">Practise that school</button>
          </div>
        </div>
        <div class="card"><h3 style="font-size:17px">How to use this properly</h3>
          <ul class="bullets" style="margin-top:10px;font-size:14px">
            <li><b>Out loud, always.</b> An answer that reads well and sounds bad is a rejection.</li>
            <li><b>Ninety seconds</b> for behavioural, <b>sixty</b> for "why us". The timer turns red when you're over.</li>
            <li><b>Rate honestly.</b> A 5 means you'd use that answer in a real interview. Most first attempts are 2s.</li>
            <li><b>Reuse stories.</b> You need 12–15 in STAR form, not 60 different answers.</li>
            <li>Anything rated 1 or 2 twice — write it out longhand before trying again.</li>
          </ul>
          ${done ? `<button class="btn sm" id="pReset" style="margin-top:14px">Clear my ratings</button>` : ''}
        </div>
      </div>
      ${done ? weakSpots() : ''}`;
    $('#pAll').onclick = () => { startPractice(null); renderPractice(); };
    $('#pStar').onclick = () => { startPractice(null, starred); renderPractice(); };
    $('#pGap').onclick = () => { startPractice(null, gaps); renderPractice(); };
    $('#pSchoolGo').onclick = () => { startPractice($('#pSchool').value); renderPractice(); };
    if ($('#pReset')) $('#pReset').onclick = () => { S.practice.done = {}; save(); renderPractice(); };
    return;
  }

  if (pSession.i >= pSession.pool.length) {
    body.innerHTML = `<div class="card" style="text-align:center;padding:40px">
      <h2 style="font-size:24px">Session done</h2>
      <p class="muted" style="margin-top:8px">${pSession.pool.length} questions.</p>
      <div class="row" style="justify-content:center;margin-top:18px"><button class="btn primary" id="pDone">Back to practice</button></div>
    </div>${weakSpots()}`;
    $('#pDone').onclick = () => { pSession = null; renderPractice(); };
    return;
  }

  const q = pSession.pool[pSession.i];
  const sch = q.s === 'general' ? 'Any school' : (SCHOOLS.find(s => s.id === q.s) || {}).name || q.s;
  const prev = S.practice.done[q.q];
  body.innerHTML = `
    <div class="qcard">
      <div class="pfprog" style="margin-bottom:20px"><i style="width:${(pSession.i / pSession.pool.length) * 100}%"></i></div>
      <div class="row" style="justify-content:center;gap:6px">
        <span class="tag">${esc(sch)}</span><span class="tag">${esc(q.t)}</span>
        <span class="tag ${q.src === 'reported' ? 'good' : 'warn'}">${q.src === 'reported' ? 'reported' : 'format-based'}</span>
      </div>
      <p class="q">${esc(q.q)}</p>
      <div class="timer" id="ptimer">0:00</div>
      <div class="row" style="justify-content:center;margin-top:16px">
        <button class="btn primary" id="pStart">Start &amp; answer out loud</button>
        <button class="btn" id="pStop">Stop</button>
      </div>
      <hr class="sep">
      <p class="dim mono" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase">How was that, honestly?</p>
      <div class="star5" style="margin-top:10px">
        ${[1, 2, 3, 4, 5].map(n => `<button data-rate="${n}" aria-pressed="${prev === n}">${n}</button>`).join('')}
      </div>
      <div style="margin-top:16px;text-align:left">
        <label class="fld"><span>Notes on your answer (optional)</span>
        <textarea id="pNote" style="min-height:80px" placeholder="The bit you fumbled, the number you couldn't remember…">${esc((S.practice.done[q.q + '::note']) || '')}</textarea></label>
      </div>
      <div class="row" style="justify-content:space-between;margin-top:16px">
        <button class="btn ghost sm" id="pQuit">Quit session</button>
        <button class="btn sm" id="pNext">Next question →</button>
      </div>
    </div>`;

  const tEl = $('#ptimer');
  const tick = () => {
    pSession.elapsed = Math.floor((Date.now() - pSession.started) / 1000);
    const m = Math.floor(pSession.elapsed / 60), s = pSession.elapsed % 60;
    tEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
    tEl.classList.toggle('over', pSession.elapsed > 90);
  };
  $('#pStart').onclick = () => {
    clearInterval(pSession.timer);
    pSession.started = Date.now(); tick();
    pSession.timer = setInterval(tick, 250);
  };
  $('#pStop').onclick = () => clearInterval(pSession.timer);
  $$('[data-rate]').forEach(b => b.onclick = () => {
    S.practice.done[q.q] = +b.dataset.rate; save();
    $$('[data-rate]').forEach(x => x.setAttribute('aria-pressed', x === b));
  });
  $('#pNote').oninput = e => { S.practice.done[q.q + '::note'] = e.target.value; save(); };
  $('#pNext').onclick = () => { clearInterval(pSession.timer); pSession.i++; renderPractice(); };
  $('#pQuit').onclick = () => { clearInterval(pSession.timer); pSession = null; renderPractice(); };
}

function weakSpots() {
  const weak = Object.entries(S.practice.done)
    .filter(([k, v]) => !k.endsWith('::note') && typeof v === 'number' && v <= 2)
    .map(([k]) => k);
  if (!weak.length) return '';
  return `<div class="card" style="margin-top:16px;border-color:var(--warn)">
    <p class="eyebrow" style="color:var(--warn)">Weak spots</p>
    <h3 style="font-size:17px;margin:8px 0 6px">${weak.length} answer${weak.length > 1 ? 's' : ''} you rated 1 or 2</h3>
    <p class="dim" style="font-size:13px;margin-bottom:10px">Write these out longhand before your next session. This list is the actual work.</p>
    <ul class="bullets">${weak.slice(0, 12).map(q => `<li>${esc(q)}</li>`).join('')}</ul>
  </div>`;
}

/* ============================================================
   ESSAYS
   ============================================================ */
function initEssays() {
  $('#eSchool').innerHTML = SCHOOLS.filter(s => s.essays && s.essays.length)
    .map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join('');
  $('#eSchool').onchange = () => { fillPrompts(); loadEssay(); };
  $('#ePrompt').onchange = loadEssay;
  $('#eText').oninput = () => { saveEssay(); runRules(); updateCount(); };
  $('#eCopy').onclick = () => { navigator.clipboard.writeText($('#eText').value).then(() => toast('Copied')); };
  $('#eClear').onclick = () => { if (confirm('Clear this essay?')) { $('#eText').value = ''; saveEssay(); runRules(); updateCount(); } };
}
function fillPrompts() {
  const s = SCHOOLS.find(x => x.id === $('#eSchool').value);
  $('#ePrompt').innerHTML = s.essays.map((e, i) => `<option value="${i}">${esc(e.p.slice(0, 62))}${e.p.length > 62 ? '…' : ''}</option>`).join('');
}
function essayKey() { return $('#eSchool').value + '::' + $('#ePrompt').value; }
function loadEssay() {
  const s = SCHOOLS.find(x => x.id === $('#eSchool').value);
  const e = s.essays[+$('#ePrompt').value] || s.essays[0];
  $('#ePromptText').textContent = e.p;
  $('#ePromptWords').textContent = e.w + ' · ' + s.name;
  $('#eProv').innerHTML = provBadge(s.essaySrc)
    + ` <span class="tag mono">${esc(s.essayChecked || '')}</span>`
    + ` <a class="tag" href="${esc(s.essayUrl || '#')}" target="_blank" rel="noopener">official page ↗</a>`
    + (s.essaySrc !== 'verified'
       ? `<p class="dim" style="font-size:12.5px;margin-top:9px;line-height:1.5">This prompt is a placeholder. Do not draft against it — open the official page, copy the real wording, and check the word limit. Getting this wrong is expensive: Booth's essays are 300-<em>character</em> fields, not 250-word ones.</p>` : '');
  $('#eText').value = S.essays[essayKey()] || '';
  runRules(); updateCount();
}
function saveEssay() { S.essays[essayKey()] = $('#eText').value; save(); }
function updateCount() {
  const n = words($('#eText').value);
  const s = SCHOOLS.find(x => x.id === $('#eSchool').value);
  const e = s.essays[+$('#ePrompt').value] || s.essays[0];
  const lim = parseInt(String(e.w).replace(/[^\d]/g, ''), 10);
  const el = $('#eCount');
  el.textContent = n + ' words' + (lim ? ` / ${lim}` : '');
  el.className = 'tag mono' + (lim ? (n > lim ? ' risk' : n > lim * 0.8 ? ' good' : '') : '');
}
function runRules() {
  const t = $('#eText').value;
  $('#eRules').innerHTML = ESSAY_RULES.map(r => {
    if (!t.trim()) return `<div class="rule"><div class="rh"><span class="dotind" style="background:var(--line-2)"></span>${esc(r.label)}</div><div class="rm">Waiting for text.</div></div>`;
    const v = r.test(t), ok = r.good(v);
    return `<div class="rule"><div class="rh"><span class="dotind" style="background:${ok ? 'var(--good)' : 'var(--warn)'}"></span>${esc(r.label)}</div><div class="rm">${esc(r.msg(v))}</div></div>`;
  }).join('');
}
function renderEssays() { if (!$('#ePrompt').options.length) { fillPrompts(); } loadEssay(); }

/* ============================================================
   PROFILE
   ============================================================ */
const WEIGHT_LABELS = {
  brandIndia: 'Brand recognition in India', mbb: 'MBB / strategy placement', speedS: 'Short programme',
  costS: 'Low cost', scholarship: 'Scholarship chances', visaS: 'Visa security',
  network: 'Global network strength', returnIndia: 'Ease of returning to India', intlExp: 'International exposure gained', odds: 'My admission odds'
};
function renderProfile() {
  const p = S.profile;
  $('#pName').value = p.name; $('#pAge').value = p.age; $('#pExp').value = p.exp;
  $('#pGre').value = p.gre; $('#pCgpa').value = p.cgpa; $('#pIntake').value = p.intake;
  $('#pNotes').value = S.notes;

  $('#weights').innerHTML = Object.entries(WEIGHT_LABELS).map(([k, l]) => `
    <label class="fld" style="margin-bottom:11px">
      <span style="display:flex;justify-content:space-between"><span>${esc(l)}</span><span class="mono" id="wv-${k}">${(p.weights[k] ?? 2).toFixed(1)}</span></span>
      <input type="range" min="0" max="5" step="0.5" value="${p.weights[k] ?? 2}" data-w="${k}">
    </label>`).join('') +
    `<button class="btn sm" id="wReset" style="margin-top:6px">Reset to the balanced preset</button>`;

  $$('[data-w]').forEach(r => r.oninput = e => {
    const k = e.target.dataset.w;
    p.weights[k] = +e.target.value;
    $('#wv-' + k).textContent = (+e.target.value).toFixed(1);
    S.preset = 'custom'; PRESETS.custom = { label: 'My own weights', w: p.weights };
    if (!$('#preset').querySelector('[value="custom"]')) {
      $('#preset').insertAdjacentHTML('beforeend', `<option value="custom">My own weights</option>`);
    }
    $('#preset').value = 'custom';
    save();
  });
  $('#wReset').onclick = () => { p.weights = JSON.parse(JSON.stringify(DEFAULT_PROFILE.weights)); S.preset = 'balanced'; $('#preset').value = 'balanced'; save(); renderProfile(); };

  const bind = (sel, key, num) => $(sel).oninput = e => { p[key] = num ? +e.target.value : e.target.value; save(); if (key === 'name') $('#brandSub').textContent = e.target.value ? 'Built for ' + e.target.value : 'Your workspace'; };
  bind('#pName', 'name'); bind('#pAge', 'age', 1); bind('#pExp', 'exp', 1); bind('#pCgpa', 'cgpa', 1);
  $('#pGre').onchange = e => { p.gre = +e.target.value; save(); toast('Odds recalculated across all 22 schools'); };
  $('#pIntake').onchange = e => { p.intake = e.target.value; save(); };
  $('#pNotes').oninput = e => { S.notes = e.target.value; save(); };

  $('#exportBtn2').onclick = doExport;
  $('#importBtn2').onclick = () => $('#importFile').click();
  $('#resetBtn').onclick = () => {
    if (confirm('Delete everything — shortlist, essays, ratings, notes? This cannot be undone.')) {
      localStorage.removeItem(KEY); S = load(); applyTheme(); buildNav(); go('advisor'); toast('Reset');
    }
  };
}

/* ============================================================
   ANSWERS — story bank, model answers, consultancy method
   ============================================================ */
function renderAnswers() {
  $('#ansCount').textContent = STORY_BANK.length + ' stories · ' + MODEL_ANSWERS.length + ' model answers';
  $$('#ansTabs .chip').forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.at === S.ansTab);
    b.onclick = () => { S.ansTab = b.dataset.at; save(); renderAnswers(); };
  });
  const body = $('#ansBody');

  if (S.ansTab === 'stories') {
    const filled = STORY_BANK.filter(s => (S.stories[s.id] || '').trim().length > 40).length;
    body.innerHTML = `
      <div class="card" style="margin-bottom:16px">
        <div class="row" style="justify-content:space-between">
          <div><p class="eyebrow">Progress</p><h3 style="font-size:18px;margin-top:6px">${filled} of ${STORY_BANK.length} stories written</h3></div>
          <span class="mono" style="font-size:26px;color:${filled >= 10 ? 'var(--good)' : filled >= 5 ? 'var(--acc)' : 'var(--risk)'}">${Math.round(filled / STORY_BANK.length * 100)}%</span>
        </div>
        <div class="meter" style="margin-top:12px"><i style="width:${filled / STORY_BANK.length * 100}%;background:var(--acc)"></i></div>
        <p class="dim" style="font-size:13px;margin-top:12px">Twelve to fifteen stories cover almost every question at every school. Write them once, reuse them everywhere — essays, interviews, and both recommender briefings. This is the single highest-return thing on this app.</p>
      </div>
      <div class="stack">${STORY_BANK.map(st => {
        const val = S.stories[st.id] || '';
        const done = val.trim().length > 40;
        return `<div class="card" style="border-left:3px solid ${done ? 'var(--good)' : 'var(--line-2)'}">
          <div class="row" style="justify-content:space-between;align-items:flex-start">
            <div style="flex:1;min-width:0">
              <h3 style="font-size:17px">${esc(st.name)}</h3>
              <p class="dim" style="font-size:12.5px;margin-top:3px">Proves: ${esc(st.proves)}</p>
            </div>
            ${done ? '<span class="tag good">written</span>' : '<span class="tag risk">empty</span>'}
          </div>
          <p class="muted" style="font-size:14px;margin-top:12px">${esc(st.build)}</p>
          <h4 class="eyebrow" style="margin-top:14px">Answers these questions</h4>
          <div class="pillrow" style="margin-top:7px">${st.answers.map(a => `<span class="tag">${esc(a)}</span>`).join('')}</div>
          <h4 class="eyebrow" style="margin-top:14px">You must fill in</h4>
          <div class="pillrow" style="margin-top:7px">${st.slots.map(a => `<span class="tag warn">${esc(a)}</span>`).join('')}</div>
          <div class="grid g2" style="margin-top:14px">
            <div style="border-left:2px solid var(--good);padding-left:11px"><p class="dim" style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;font-family:var(--mono)">Strong</p><p class="muted" style="font-size:13.5px;margin-top:4px">${esc(st.strong)}</p></div>
            <div style="border-left:2px solid var(--risk);padding-left:11px"><p class="dim" style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;font-family:var(--mono)">Weak</p><p class="muted" style="font-size:13.5px;margin-top:4px">${esc(st.weak)}</p></div>
          </div>
          <label class="fld" style="margin-top:14px"><span>Your version</span>
            <textarea data-story="${st.id}" style="min-height:130px" placeholder="Write it out. Situation and task briefly, then what you did, then the number.">${esc(val)}</textarea></label>
        </div>`;
      }).join('')}</div>`;
    $$('[data-story]').forEach(ta => ta.oninput = e => {
      S.stories[e.target.dataset.story] = e.target.value; save();
    });
    $$('[data-story]').forEach(ta => ta.onblur = () => renderAnswers());

  } else if (S.ansTab === 'model') {
    body.innerHTML = `<div class="stack">${MODEL_ANSWERS.map((a, i) => {
      const st = STORY_BANK.find(s => s.id === a.story);
      return `<div class="card">
        <p class="eyebrow">${esc(a.schools)}</p>
        <h3 style="font-size:19px;margin:8px 0 0">${esc(a.q)}</h3>
        <div class="pillrow" style="margin-top:10px">
          <span class="tag acc" data-jump="${a.story}" style="cursor:pointer">uses: ${esc(st ? st.name : a.story)}</span>
        </div>
        <h4 class="eyebrow" style="margin-top:16px">What is being scored</h4>
        <p class="muted" style="font-size:14px;margin-top:6px">${esc(a.scored)}</p>
        <h4 class="eyebrow" style="margin-top:14px">Shape</h4>
        <p class="mono" style="font-size:12.5px;margin-top:6px;color:var(--ink-2)">${esc(a.shape)}</p>
        <h4 class="eyebrow" style="margin-top:14px">Model answer</h4>
        <div style="background:var(--surf-2);border:1px solid var(--line);border-radius:8px;padding:15px 17px;margin-top:8px">
          <p style="font-family:var(--serif);font-size:15.5px;line-height:1.7;white-space:pre-wrap;color:var(--ink)">${esc(a.model)}</p>
        </div>
        <h4 class="eyebrow" style="margin-top:14px;color:var(--risk)">What kills it</h4>
        <ul class="bullets" style="margin-top:7px;font-size:13.5px">${a.kills.map(k => `<li>${esc(k)}</li>`).join('')}</ul>
      </div>`;
    }).join('')}</div>`;
    $$('[data-jump]').forEach(b => b.onclick = () => { S.ansTab = 'stories'; save(); renderAnswers(); });

  } else {
    body.innerHTML = `
      <div class="card" style="margin-bottom:16px">
        <p class="eyebrow">Why this matters</p>
        <p class="muted" style="margin-top:8px">Fortuna was founded by the former MBA Admissions Director of INSEAD and the acting director of admissions at Wharton. Stacy Blackman and mbaMission staff former admissions officers from HBS, Stanford and Wharton. What they sell is not writing — it is <b>knowing how a file reads to someone who sees 1,300 of them</b>. The process below is what an engagement actually consists of, and every phase has an equivalent in this app.</p>
      </div>
      <div class="tl">${CONSULTING_METHOD.map(m => `
        <div class="tli hot">
          <div class="d">${esc(m.weeks)}</div>
          <h4>${esc(m.phase)}</h4>
          <p class="muted" style="font-size:14px">${esc(m.what)}</p>
          <div style="border-left:2px solid var(--acc);padding-left:12px;margin-top:10px">
            <p class="dim" style="font-family:var(--mono);font-size:10px;letter-spacing:.11em;text-transform:uppercase">For you</p>
            <p class="muted" style="font-size:13.5px;margin-top:4px">${esc(m.you)}</p>
          </div>
        </div>`).join('')}</div>
      <div class="card" style="margin-top:16px">
        <p class="eyebrow">Delivery rules every firm teaches</p>
        <ul class="bullets" style="margin-top:11px;font-size:14px">
          <li><b>60–90 seconds</b> per behavioural answer. Longer and you lose them; shorter and it reads as thin.</li>
          <li><b>20% situation and task, 60% action, 20% result.</b> The most common failure is spending half the answer on setup.</li>
          <li><b>"I", never "we", in the action.</b> This is the single most common STAR mistake and the easiest to fix. Go through every story and replace it.</li>
          <li><b>A number in the result.</b> Every time.</li>
          <li><b>Out loud, always.</b> An answer that reads well and sounds rehearsed is a rejection.</li>
          <li><b>Reuse ruthlessly.</b> You need 14 stories, not 60 answers.</li>
        </ul>
      </div>`;
  }
}

/* ============================================================
   SOURCES & ACCURACY
   ============================================================ */
function renderSources() {
  const ve = SCHOOLS.filter(s => s.essaySrc === 'verified');
  const ue = SCHOOLS.filter(s => s.essaySrc !== 'verified');
  const rep = QUESTIONS.filter(q => q.src === 'reported').length;
  const fmt = QUESTIONS.filter(q => q.src === 'format').length;

  const row = (what, level, detail) => `<tr>
    <td><span class="sname">${esc(what)}</span></td>
    <td>${level === 'A' ? '<span class="tag good">A · primary</span>' : level === 'B' ? '<span class="tag teal">B · reputable secondary</span>' : level === 'C' ? '<span class="tag warn">C · aggregator</span>' : '<span class="tag risk">D · my estimate</span>'}</td>
    <td style="font-size:13px;color:var(--ink-2)">${detail}</td></tr>`;

  $('#sourcesBody').innerHTML = `
  <div class="grid g4" style="margin-bottom:16px">
    <div class="tile"><div class="lbl">Essay sets verified</div><div class="big" style="color:var(--good)">${ve.length}<span style="font-size:16px;color:var(--ink-3)">/${SCHOOLS.length}</span></div><div class="note">Quoted from the school or Clear Admit's verbatim analysis</div></div>
    <div class="tile"><div class="lbl">Essay sets unverified</div><div class="big" style="color:var(--risk)">${ue.length}</div><div class="note">Placeholders — do not draft against them</div></div>
    <div class="tile"><div class="lbl">Interview questions reported</div><div class="big">${rep}</div><div class="note">Documented candidate reports</div></div>
    <div class="tile"><div class="lbl">Format-derived questions</div><div class="big">${fmt}</div><div class="note">Constructed from published formats</div></div>
  </div>

  <div class="card" style="border-color:var(--risk);margin-bottom:16px">
    <p class="eyebrow" style="color:var(--risk)">Read this first</p>
    <h3 style="font-size:18px;margin:8px 0 8px">Errors that were found and fixed on 7 Aug 2026</h3>
    <p class="muted" style="font-size:14px;margin-bottom:10px">These were wrong in the first version of this app. They are listed so you know the failure modes to watch for, not to reassure you.</p>
    <ul class="bullets" style="font-size:14px">
      <li><b>Booth</b> — had 250-word essays. They are four <b>300-character</b> fields plus an image upload.</li>
      <li><b>Kellogg</b> — had five video essays. There are <b>three</b>, due 96 hours after the deadline.</li>
      <li><b>Harvard</b> — the third prompt was wrong. It is about <b>curiosity</b>, not community impact.</li>
      <li><b>Wharton</b> — had 500 + 400 words. It is <b>50 + 150 + 350</b>.</li>
      <li><b>Columbia</b> — Essay 1 was wrong, and two short answers were missing entirely.</li>
      <li><b>Haas</b> — Essay 1 is a <b>video</b>, not a written essay.</li>
      <li><b>Yale</b> — it is <b>choose one of three</b>, plus a separate 200-word career-interests essay.</li>
      <li><b>LBS</b> — a 200-word "What makes you unique?" essay was missing.</li>
      <li><b>Oxford</b> — three questions at <b>250 words each</b>, not 250/500/250.</li>
      <li><b>INSEAD deadlines</b> — R2 for the Aug-2027 intake is <b>3 November 2026</b>, not January. The plan said January. That was a six-week planning error.</li>
      <li><b>Oxford scholarships</b> — you must apply by the <b>January (Stage 4)</b> deadline to stay eligible. This was missing.</li>
    </ul>
  </div>

  <div class="card" style="margin-bottom:16px">
    <p class="eyebrow">Confidence by data type</p>
    <div class="tw" style="margin-top:12px">
      <table><thead><tr><th>What</th><th>Grade</th><th>Basis</th></tr></thead><tbody>
      ${row('Essay prompts (13 schools)','A','Quoted from the school\'s own site, or Clear Admit\'s verbatim 2026-27 analysis. Retrieved 7 Aug 2026.')}
      ${row('Essay prompts (9 schools)','D','NOT confirmed. Shown as placeholders with a warning and a link to the official page.')}
      ${row('INSEAD, Oxford, Judge, HEC deadlines','A','insead.edu, sbs.ox.ac.uk, jbs.cam.ac.uk, hec.edu — 7 Aug 2026.')}
      ${row('LBS deadline','D','Aug-2027 dates were not published when checked. Do not plan against the placeholder.')}
      ${row('US R1 deadlines','B','Clear Admit deadline tracker, Aug 2026. Confirm on each school site.')}
      ${row('Interview questions — 113','B','Poets&amp;Quants school-by-school list (Jan 2026) and Clear Admit interview reports. Candidate-reported, so wording varies.')}
      ${row('Interview questions — 48','D','Written by me from each school\'s published interview format. Labelled format-based throughout. Expect themes, not verbatim.')}
      ${row('US class profiles','B','Class of 2027 profiles via Clear Admit, Poets&amp;Quants and GMAC.')}
      ${row('European class profiles','C','Partly from admissions-consultancy aggregators. Treat women %, international %, average age and experience as approximate.')}
      ${row('Visa and immigration rules','A','H-1B proclamation, UK Graduate Route change effective 1 Jan 2027, French APS and Passeport Talent thresholds, Italian attesa occupazione.')}
      ${row('Tuition and fees','B','2026-27 published figures. Several 2027-28 fees are not yet released — where a school has not published, the prior year is shown.')}
      ${row('Rupee cost conversions','D','My arithmetic at ₹95/$, ₹110/€, ₹128/£, ₹119/CHF, ₹74/S$ as of 5 Aug 2026. FX moves; recompute before making a financial decision.')}
      ${row('Employment and salary','B','Class of 2025 employment reports and Poets&amp;Quants compensation reporting.')}
      ${row('FT 2026 ranks','C','Top 25 retrieved directly. Ranks outside the top 25 are less certain — verify before quoting one.')}
      ${row('Admit probabilities','D','Modelled, not measured. Base rates adjusted for the Indian sub-pool then for profile factors. Calibrated judgements that assume a top-quartile application.')}
      ${row('Fit scores','D','A weighted composite of my own 0–10 ratings. It reflects the weights you set, not an external truth.')}
      ${row('Career-track analysis and verdicts','D','Opinion, argued from the data above. Disagree with it where you have better information.')}
      </tbody></table>
    </div>
  </div>

  <div class="card">
    <p class="eyebrow">Before any decision that costs money or time</p>
    <ul class="bullets" style="font-size:14px;margin-top:10px">
      <li>Confirm the deadline on the school's own admissions page. Every one of them.</li>
      <li>Copy essay prompts from the live application portal, not from here — schools revise wording mid-cycle.</li>
      <li>Re-check tuition for your actual entry year. Several 2027-28 figures were unpublished when this was built.</li>
      <li>Recompute rupee costs at today's rate.</li>
      <li>Treat every probability and fit score as an argument, not a measurement.</li>
    </ul>
    <p class="muted" style="font-size:14px;margin-top:14px">Data last checked <b>7 August 2026</b>. Anything below grade B should be re-verified before you rely on it.</p>
  </div>`;
}

/* ============================================================
   PLAN
   ============================================================ */
function renderPlan() {
  const total = PLAN.reduce((a, p) => a + p.items.length, 0);
  const done = Object.values(S.planDone).filter(Boolean).length;
  $('#planProg').textContent = `${done} / ${total} done`;
  $('#planBody').innerHTML = `<div class="card"><div class="tl">` + PLAN.map((p, pi) => `
    <div class="tli ${p.hot ? 'hot' : ''}">
      <div class="d">${esc(p.date)}</div>
      <h4>${esc(p.title)}</h4>
      ${p.items.map((it, ii) => {
        const k = pi + '-' + ii, on = !!S.planDone[k];
        return `<label class="chk ${on ? 'done' : ''}"><input type="checkbox" data-p="${k}" ${on ? 'checked' : ''}><span>${esc(it)}</span></label>`;
      }).join('')}
    </div>`).join('') + `</div></div>`;
  $$('[data-p]').forEach(c => c.onchange = e => { S.planDone[e.target.dataset.p] = e.target.checked; save(); renderPlan(); });
}

/* ============================================================
   EXPORT / IMPORT
   ============================================================ */
function doExport() {
  const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `mba-compass-${new Date().toISOString().slice(0, 10)}.json`;
  a.click(); URL.revokeObjectURL(a.href);
  toast('Exported');
}
$('#exportBtn').onclick = doExport;
$('#importBtn').onclick = () => $('#importFile').click();
$('#importFile').onchange = e => {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      S = Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)), JSON.parse(r.result));
      save(); applyTheme(); buildNav(); go(current); toast('Imported');
    } catch { toast('That file could not be read'); }
  };
  r.readAsText(f);
  e.target.value = '';
};

/* ============================================================
   BOOT
   ============================================================ */
applyTheme();
buildNav();
initSchoolControls();
initVault();
initEssays();
fillPrompts();
const startView = (location.hash || '').replace('#', '');
go(VIEWS.some(v => v.id === startView) ? startView : 'advisor');
flashSaved();
window.addEventListener('hashchange', () => {
  const h = location.hash.replace('#', '');
  if (h && h !== current && VIEWS.some(v => v.id === h)) go(h);
});
