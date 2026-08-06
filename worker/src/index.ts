/* ============================================================
   MBA COMPASS — API worker

   The Groq key lives here as an encrypted Cloudflare secret.
   It is never sent to the browser and never appears in the repo.

   Every request is gated: the browser sends a Google ID token, this
   worker verifies the signature against Google's public keys, checks
   the audience and expiry, and checks the email against an allowlist
   held in an environment variable. Only then does it call Groq.
   ============================================================ */

import { AGENTS, getAgent, buildSystem } from "./agents";
import { MODEL, streamChat as llmStream, friendlyError } from "./llm";

export interface Env {
  GROQ_API_KEY: string;        // wrangler secret — encrypted at rest
  GOOGLE_CLIENT_ID: string;    // public by design
  ALLOWED_EMAILS: string;      // comma-separated, set as a secret
  CANDIDATE_BRIEF?: string;    // her profile — secret, never in the repo
  DB: D1Database;
}

const CORS = (origin: string | null, allowed: string[]) => {
  const o = origin && allowed.includes(origin) ? origin : allowed[0];
  return {
    "Access-Control-Allow-Origin": o,
    "Access-Control-Allow-Headers": "authorization,content-type",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
};

const ALLOWED_ORIGINS = [
  "https://avi-debugquanta.github.io",
  "http://localhost:8899",
  "http://127.0.0.1:8899",
];

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...extra },
  });

/* ---------- Google ID token verification -------------------- */

const GOOGLE_JWKS = "https://www.googleapis.com/oauth2/v3/certs";
const GOOGLE_ISS = ["https://accounts.google.com", "accounts.google.com"];

let jwksCache: { keys: any[]; fetchedAt: number } | null = null;

async function googleKeys(): Promise<any[]> {
  const now = Date.now();
  if (jwksCache && now - jwksCache.fetchedAt < 60 * 60 * 1000) return jwksCache.keys;
  const r = await fetch(GOOGLE_JWKS);
  if (!r.ok) throw new Error("jwks fetch failed");
  const body = (await r.json()) as { keys: any[] };
  jwksCache = { keys: body.keys, fetchedAt: now };
  return body.keys;
}

const b64url = (s: string) => {
  const pad = s.length % 4 ? "=".repeat(4 - (s.length % 4)) : "";
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

interface Identity { email: string; name: string; sub: string; picture?: string }

async function verifyGoogleToken(token: string, env: Env): Promise<Identity> {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("malformed token");
  const [h64, p64, s64] = parts;

  const header = JSON.parse(new TextDecoder().decode(b64url(h64)));
  const payload = JSON.parse(new TextDecoder().decode(b64url(p64)));

  // 1. signature — this is the part that makes the rest trustworthy
  const keys = await googleKeys();
  const jwk = keys.find((k) => k.kid === header.kid && k.alg === "RS256");
  if (!jwk) throw new Error("signing key not found");

  const key = await crypto.subtle.importKey(
    "jwk",
    { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: "RS256", ext: true },
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const ok = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    b64url(s64),
    new TextEncoder().encode(`${h64}.${p64}`),
  );
  if (!ok) throw new Error("bad signature");

  // 2. claims
  const now = Math.floor(Date.now() / 1000);
  if (payload.aud !== env.GOOGLE_CLIENT_ID) throw new Error("wrong audience");
  if (!GOOGLE_ISS.includes(payload.iss)) throw new Error("wrong issuer");
  if (typeof payload.exp !== "number" || payload.exp < now) throw new Error("expired");
  if (payload.email_verified !== true) throw new Error("email not verified");

  // 3. allowlist — the two of you, nobody else
  const allowed = env.ALLOWED_EMAILS.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  const email = String(payload.email || "").toLowerCase();
  if (!allowed.includes(email)) throw new Error("not on the allowlist");

  return { email, name: payload.name || email, sub: payload.sub, picture: payload.picture };
}

async function authenticate(req: Request, env: Env): Promise<Identity> {
  const h = req.headers.get("authorization") || "";
  if (!h.startsWith("Bearer ")) throw new Error("missing token");
  return verifyGoogleToken(h.slice(7), env);
}

/* ---------- storage ----------------------------------------- */

async function ensureSchema(env: Env) {
  await env.DB.batch([
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS kv (
         email TEXT NOT NULL, k TEXT NOT NULL, v TEXT NOT NULL,
         updated_at INTEGER NOT NULL, PRIMARY KEY (email, k))`,
    ),
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS threads (
         id TEXT PRIMARY KEY, email TEXT NOT NULL, agent TEXT NOT NULL,
         title TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
    ),
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS messages (
         id INTEGER PRIMARY KEY AUTOINCREMENT, thread_id TEXT NOT NULL,
         role TEXT NOT NULL, content TEXT NOT NULL, created_at INTEGER NOT NULL)`,
    ),
    env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_msg_thread ON messages(thread_id, id)`),
    env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_thread_email ON threads(email, updated_at DESC)`),
  ]);
}

/* ---------- chat ---------------------------------------------- */

async function streamChat(env: Env, who: Identity, body: any): Promise<Response> {
  const agent = getAgent(body.agentId);
  if (!agent) return json({ error: "unknown agent" }, 400);

  const history = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m: any) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-30)
    .map((m: any) => ({ role: m.role as "user" | "assistant", content: m.content.slice(0, 20000) }));
  if (!history.length || history[history.length - 1].role !== "user")
    return json({ error: "need a user message last" }, 400);

  const encoder = new TextEncoder();
  const rs = new ReadableStream({
    async start(controller) {
      const send = (o: unknown) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(o)}\n\n`));
      let full = "";
      try {
        const stream = await llmStream({
          apiKey: env.GROQ_API_KEY,
          system: buildSystem(agent, env.CANDIDATE_BRIEF || ""),
          history,
          context: typeof body.context === "string" ? body.context.slice(0, 30000) : undefined,
        });

        let usage: any = null;
        for await (const chunk of stream as any) {
          const delta = chunk?.choices?.[0]?.delta?.content;
          if (delta) { full += delta; send({ t: "d", v: delta }); }
          if (chunk?.x_groq?.usage) usage = chunk.x_groq.usage;
        }

        if (!full.trim()) send({ t: "e", v: "The model returned nothing. Try rephrasing." });
        send({ t: "done", usage: usage ? { in: usage.prompt_tokens, out: usage.completion_tokens } : null });

        if (body.threadId && full) {
          const now = Date.now();
          await env.DB.batch([
            env.DB.prepare(`INSERT INTO messages (thread_id, role, content, created_at) VALUES (?,?,?,?)`)
              .bind(body.threadId, "user", history[history.length - 1].content, now),
            env.DB.prepare(`INSERT INTO messages (thread_id, role, content, created_at) VALUES (?,?,?,?)`)
              .bind(body.threadId, "assistant", full, now + 1),
            env.DB.prepare(`UPDATE threads SET updated_at=? WHERE id=? AND email=?`)
              .bind(now, body.threadId, who.email),
          ]);
        }
      } catch (err: any) {
        send({ t: "e", v: friendlyError(err) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(rs, {
    headers: { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-cache" },
  });
}

/* ---------- router ------------------------------------------- */

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const cors = CORS(req.headers.get("origin"), ALLOWED_ORIGINS);
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });

    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (path === "/" || path === "/api/health") {
      return json({ ok: true, model: MODEL, agents: AGENTS.length }, 200, cors);
    }

    // Everything past here requires a verified, allowlisted Google identity.
    let who: Identity;
    try {
      who = await authenticate(req, env);
    } catch (e: any) {
      return json({ error: "not authorised", detail: e.message }, 401, cors);
    }

    try {
      await ensureSchema(env);

      if (path === "/api/me") {
        return json({ email: who.email, name: who.name, picture: who.picture, agents: AGENTS.map(({ system, ...a }) => a) }, 200, cors);
      }

      if (path === "/api/chat" && req.method === "POST") {
        const r = await streamChat(env, who, await req.json());
        const h = new Headers(r.headers);
        Object.entries(cors).forEach(([k, v]) => h.set(k, v));
        return new Response(r.body, { status: r.status, headers: h });
      }

      /* threads */
      if (path === "/api/threads" && req.method === "GET") {
        const { results } = await env.DB.prepare(
          `SELECT id, agent, title, created_at, updated_at FROM threads WHERE email=? ORDER BY updated_at DESC LIMIT 100`,
        ).bind(who.email).all();
        return json({ threads: results }, 200, cors);
      }
      if (path === "/api/threads" && req.method === "POST") {
        const b = (await req.json()) as any;
        const id = crypto.randomUUID();
        const now = Date.now();
        await env.DB.prepare(
          `INSERT INTO threads (id,email,agent,title,created_at,updated_at) VALUES (?,?,?,?,?,?)`,
        ).bind(id, who.email, String(b.agent || "strategist"), String(b.title || "New conversation").slice(0, 120), now, now).run();
        return json({ id }, 200, cors);
      }
      if (path.startsWith("/api/threads/")) {
        const id = path.split("/")[3];
        if (req.method === "GET") {
          const { results } = await env.DB.prepare(
            `SELECT m.role, m.content FROM messages m JOIN threads t ON t.id=m.thread_id
             WHERE m.thread_id=? AND t.email=? ORDER BY m.id ASC`,
          ).bind(id, who.email).all();
          return json({ messages: results }, 200, cors);
        }
        if (req.method === "DELETE") {
          await env.DB.batch([
            env.DB.prepare(`DELETE FROM messages WHERE thread_id IN (SELECT id FROM threads WHERE id=? AND email=?)`).bind(id, who.email),
            env.DB.prepare(`DELETE FROM threads WHERE id=? AND email=?`).bind(id, who.email),
          ]);
          return json({ ok: true }, 200, cors);
        }
      }

      /* key-value sync — profile, stories, essays, practice, shortlist */
      if (path === "/api/state" && req.method === "GET") {
        const { results } = await env.DB.prepare(`SELECT k, v, updated_at FROM kv WHERE email=?`)
          .bind(who.email).all();
        const out: Record<string, unknown> = {};
        for (const r of results as any[]) { try { out[r.k] = JSON.parse(r.v); } catch { /* skip */ } }
        return json({ state: out }, 200, cors);
      }
      if (path === "/api/state" && req.method === "POST") {
        const b = (await req.json()) as Record<string, unknown>;
        const now = Date.now();
        const stmts = Object.entries(b).slice(0, 60).map(([k, v]) =>
          env.DB.prepare(`INSERT INTO kv (email,k,v,updated_at) VALUES (?,?,?,?)
                          ON CONFLICT(email,k) DO UPDATE SET v=excluded.v, updated_at=excluded.updated_at`)
            .bind(who.email, k.slice(0, 64), JSON.stringify(v).slice(0, 400000), now),
        );
        if (stmts.length) await env.DB.batch(stmts);
        return json({ ok: true, saved: stmts.length }, 200, cors);
      }

      return json({ error: "not found" }, 404, cors);
    } catch (e: any) {
      return json({ error: "server error", detail: String(e?.message || e) }, 500, cors);
    }
  },
};
