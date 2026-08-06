/* ============================================================
   LLM layer — Groq (openai/gpt-oss-120b)

   Groq serves open models over an OpenAI-compatible API. It does
   not serve Claude. Consequences that shape this file:

   - No `cache_control`. Groq caches automatically on a stable
     prefix, so the system message must stay byte-identical across
     turns and volatile context goes into the LAST user message,
     never the system one.
   - No adaptive thinking. gpt-oss exposes `reasoning_effort`
     instead; we probe once and fall back if the account rejects it.
   - An open model invents biographical detail far more readily
     than Claude, so the anti-fabrication rule is restated at the
     end of the prompt where it carries most weight.
   ============================================================ */

import Groq from "groq-sdk";

export const MODEL = "openai/gpt-oss-120b";

/** Set false after a 400 naming the param, so we stop paying the retry. */
let reasoningSupported = true;

export interface ChatArgs {
  apiKey: string;
  system: string;
  history: { role: "user" | "assistant"; content: string }[];
  context?: string;
}

const GUARDRAIL = `

────────────────────────────────────────
BEFORE YOU ANSWER — read this again.

Do NOT state any fact about her background that is not written above or
said by her in this conversation. No invented employers, dates, numbers,
clients, grades, or outcomes. If a specific is needed and you do not have
it, write [BRACKETS] or ask her for it in one short question.

She will repeat what you write in an interview. A confident invented
detail becomes a lie she tells an admissions committee, and the follow-up
question exposes it. A blank does not.
────────────────────────────────────────`;

export async function streamChat({ apiKey, system, history, context }: ChatArgs) {
  const groq = new Groq({ apiKey });

  // Stable prefix → Groq caches it. Volatile workspace state rides on the
  // final user turn so it never mutates the cached portion.
  const messages: Groq.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: system + GUARDRAIL },
    ...history.slice(0, -1),
  ];
  const last = history[history.length - 1];
  messages.push({
    role: "user",
    content: context
      ? `${last.content}\n\n<workspace note="her live data — may be partial; do not invent beyond it">\n${context}\n</workspace>`
      : last.content,
  });

  const base = {
    model: MODEL,
    messages,
    temperature: 0.6,
    top_p: 0.95,
    max_completion_tokens: 16000,
    stream: true as const,
  };

  try {
    return await groq.chat.completions.create(
      reasoningSupported ? { ...base, reasoning_effort: "high" } as any : base,
    );
  } catch (err: any) {
    const msg = String(err?.message || err);
    if (reasoningSupported && /reasoning_effort|unrecognized|unknown|not supported/i.test(msg)) {
      reasoningSupported = false;             // don't pay this retry again
      return await groq.chat.completions.create(base);
    }
    throw err;
  }
}

export function friendlyError(err: any): string {
  const status = err?.status;
  const msg = String(err?.message || err);
  if (status === 401) return "The Groq key on the server is rejected. Re-run: wrangler secret put GROQ_API_KEY";
  if (status === 429) return "Groq rate limit hit. Wait about a minute — the free tier caps tokens per minute.";
  if (status === 413 || /context|too large|maximum/i.test(msg))
    return "This conversation is too long for the model. Start a new one — your workspace carries over.";
  if (status && status >= 500) return "Groq is having a problem. Try again shortly.";
  return `Something went wrong: ${msg}`;
}
