# The API worker

This holds the Groq API key and decides who is allowed to use it. Roughly fifteen minutes to set up, then you never touch it again.

## Why the key can't just be encrypted in the app

A browser app that decrypts a key has to ship the decryption key too. Anyone opens DevTools, takes both, and uses your key on your bill. That's not a flaw in a particular scheme — it's why DRM keeps getting broken. Obfuscation raises the effort from *seconds* to *minutes*; it does not make the key secret.

So the key never goes to the browser. It sits here as a Cloudflare secret — encrypted at rest, and **not readable after upload by anyone, including you**. The browser sends a Google ID token instead; this worker verifies the signature against Google's public keys, checks the audience and expiry, checks the email against your allowlist, and only then calls Groq.

Someone who clones the repo gets the app and no key. Someone who signs in with a Google account you haven't allowlisted gets a 401 from the server — the refusal isn't a hidden button, it's the absence of a key on their side of the wire.

## Setup

### 1. Cloudflare

```bash
npm install -g wrangler
wrangler login
cd worker && npm install
```

Create the database and copy the ID it prints into `wrangler.toml`:

```bash
wrangler d1 create mba-compass
```

### 2. Google OAuth client

At [console.cloud.google.com](https://console.cloud.google.com) → new project → **APIs & Services → Credentials → Create credentials → OAuth client ID → Web application**.

Authorised JavaScript origins:

```
https://avi-debugquanta.github.io
http://localhost:8899
```

Leave **Authorised redirect URIs empty** — Google Identity Services uses the JavaScript origin only, and adding a redirect URI is the usual cause of a sign-in that silently fails.

Under **OAuth consent screen**, keep the publishing status on **Testing** and add both Gmail addresses as **Test users**. That skips Google's verification review and makes Google itself refuse anyone else — a second lock in front of the worker's allowlist.

The client ID is already filled into `wrangler.toml`. It is public by design; it appears in the page source of every Google sign-in button on the web. You do **not** need the client secret — that's for server-side code-exchange flows, which this doesn't use.

### 3. The two secrets

```bash
wrangler secret put GROQ_API_KEY          # paste the key, press enter
wrangler secret put ALLOWED_EMAILS        # the two Gmail addresses, comma-separated
wrangler secret put CANDIDATE_BRIEF < candidate-brief.txt
```

`candidate-brief.txt` holds her profile and is gitignored — it never reaches the
repo. The agents get it injected at request time. Without it the agents still work,
but they ask about her background instead of assuming it.

These are **not** in any file. Cloudflare encrypts them at rest and there is no read-back — if you lose the key you re-upload it, you don't recover it.

### 4. Deploy

```bash
wrangler deploy
```

It prints a URL like `https://mba-compass-api.<you>.workers.dev`. Open the app → **Consultant** → paste that URL and the Google client ID → sign in.

## Cost

Cloudflare Workers and D1 are free at this scale (100k requests/day, 5GB).

Groq runs `openai/gpt-oss-120b` at $0.15 per million input tokens ($0.075 cached) and $0.60 per million output — roughly 1p a message, and the free tier covers light use outright. Groq caches a stable prompt prefix automatically, which is why the agent system prompt never changes between turns and volatile workspace data rides on the last user message instead.

**Free-tier caveat:** Groq caps tokens per minute. A long conversation resends its whole history each turn, so heavy back-and-forth can trip a 429. The app surfaces that as a plain "wait about a minute" message rather than failing silently. Adding billing removes the cap.

## Adding or removing access

```bash
wrangler secret put ALLOWED_EMAILS   # re-enter the full comma-separated list
```

Takes effect on the next request. Removing an email locks that account out immediately — there's no cached session to wait out, because the allowlist is checked on every single call.

## If something breaks

```bash
wrangler tail                        # live logs
curl https://<your-worker>/api/health
```

| Symptom | Cause |
|---|---|
| `401 not authorised: not on the allowlist` | Email isn't in `ALLOWED_EMAILS` — check for typos and spaces |
| `401 wrong audience` | `GOOGLE_CLIENT_ID` in `wrangler.toml` doesn't match the one the app is using |
| Sign-in button doesn't appear | Origin missing from the OAuth client's authorised JavaScript origins |
| `The Groq key on the server is rejected` | Re-run `wrangler secret put GROQ_API_KEY` |
| `Groq rate limit hit` | Free tier caps tokens per minute. Wait a minute, or add billing at console.groq.com |
| CORS error | Add your origin to `ALLOWED_ORIGINS` in `src/index.ts` and redeploy |

## What's stored

D1 holds her workspace (profile, shortlist, stories, essay drafts, practice ratings, notes) and her chat history, keyed by email. Nothing is shared between the two accounts — each sees only its own rows. Delete a conversation from the sidebar; wipe everything with `wrangler d1 execute mba-compass --command "DELETE FROM kv; DELETE FROM messages; DELETE FROM threads;"`.
