# MBA Compass

A private MBA decision and application workspace. Works on a phone, tablet or laptop. Everything you type stays in your own browser.

**Live:** https://avi-debugquanta.github.io/mba-compass/

---

## What's in it

| Tab | What it does |
|---|---|
| **Consultant** | Six AI specialists with read access to the whole workspace — profile, story bank, essay drafts, practice ratings. The Strategist (school list, timing), the Essay Reader (cold reads and line edits), the Story Miner (interrogates a story until it has numbers), the Interviewer (mock interviews in each school's real format), the Skeptic (argues against your file), the Career Coach (the pivot and the money). Chat history and workspace sync to your account. |
| **Advisor** | The short answer up front, a live scorecard, and an ask box that answers from a written knowledge base (19 topics — timing, loans, visas, GRE, essays, interviews, scholarships, the career switch). Anything it can't answer is saved to an open-questions list you can export. |
| **Schools** | 22 programmes across the US, Europe and Asia. Six weighting presets plus your own sliders — change what you're optimising for and the ranking changes. Filter by region, length, shortlist or free text. Tap any school for the full file: tags, class size, cost, odds, majors offered, who recruits there, interview format, its actual questions, its 2026–27 essay prompts, and your own notes. |
| **Path finder** | Twelve questions, nine career tracks. Scores brand management, product, luxury/fashion, media, consulting, founder, healthcare, growth and impact against your answers — with an honest read on how hard each switch is, what it pays in three regions, who hires, and how well it sets you up to run your own business. Re-ranks the school list for whichever track wins. |
| **Answers** | The story-bank method the big firms use. **14 core stories** answer ~90% of questions — each with what it proves, which questions it covers, the slots you must fill, strong vs weak versions, and a saved editor. Plus **23 model answers** written from the real profile, with what's being scored, the second-by-second shape, and the failure modes. Plus a breakdown of how Fortuna, Stacy Blackman and mbaMission actually run an 8-phase engagement. |
| **Interviews** | 161 questions. 113 are documented candidate reports (marked `reported`); the rest are derived from each school's published interview format (marked `format-based`). Filter by school or type, star the ones that scare you, add your own. |
| **Practice** | One question at a time, with a timer that turns red past 90 seconds. Rate yourself 1–5, take notes, and the app surfaces every answer you rated 1 or 2 as a weak-spots list. |
| **Essays** | Real 2026–27 prompts for every school. Autosaving editor with a live checker for the seven patterns that sink strong applications: missing numbers, clichés, passive voice, low ownership, generic "why this school", hedging, and runaway sentence length. |
| **Plan** | Fourteen months of dated actions with checkboxes that persist. |
| **Profile** | Age, experience, GRE, CGPA, target intake and nine priority sliders. Everything else recalculates from here — change your GRE and all 22 sets of odds move. |

---

## Data provenance

All figures researched August 2026.

- **Class profiles** — Class of 2027 (US) and 2026 (Europe), as published by the schools and reported by Clear Admit, Poets&Quants and GMAC.
- **Employment** — Class of 2025 employment reports.
- **Rankings** — FT Global MBA Ranking 2026.
- **Costs** — 2026–27 published tuition and cost of attendance. Converted at ₹95/$, ₹110/€, ₹128/£, ₹119/CHF, ₹74/S$ (rates of 5 Aug 2026).
- **Interview questions** — Poets&Quants "2026 MBA Interview Questions: A School-By-School List" (Jan 2026) and Clear Admit interview reports, plus each school's published format.
- **Essay prompts** — 2026–27 cycle prompts.
- **Visa rules** — Sept 2025 H-1B proclamation (effective Feb 2026 lottery); UK Graduate Route reduction to 18 months from 1 Jan 2027; French APS and Passeport Talent 2026 thresholds; Italian *attesa occupazione*; Singapore Employment Pass.

### Accuracy grading

Open the **Sources** tab in the app. Every data type carries a grade:

| Grade | Meaning |
|---|---|
| **A** | Primary — the school's own site, or a regulation |
| **B** | Reputable secondary — Poets&Quants, Clear Admit, GMAC, employment reports |
| **C** | Aggregator — admissions-consultancy sites. Approximate |
| **D** | My estimate, model or opinion. Verify before relying on it |

**21 of 22 essay sets are grade A** (SDA Bocconi is partial — its ~13 short questions vary by source), quoted from the school's own site or a verbatim consultancy analysis, retrieved 7 Aug 2026. Where sources disagree the app says so rather than showing a plausible guess.

### Model answers and invented facts

Model answers use `[SQUARE BRACKETS]` wherever a fact is one only the applicant knows — client scale, revenue influenced, promotion timing, cohort percentile. **Those are deliberately blank.** A model answer with plausible invented metrics is more dangerous than no model answer, because it gets used verbatim in an interview where the follow-up question exposes it.

### Every school is scored the same way

Each school carries a breakdown against the same six stated goals — domain change, brand and placement, network and exposure, return to India, timing, loan repayment — computed from the same nine underlying ratings. No school is privileged in the model. Change the weights in Profile and the ranking changes.

### Errors found and fixed on 7 Aug 2026

The first build of this app had these wrong. They are listed so the failure modes are visible:

- **Booth** — four **300-character** fields plus an image upload, not 250-word essays
- **Kellogg** — **three** video questions, not five
- **Harvard** — third prompt is about **curiosity**, not community impact
- **Wharton** — **50 + 150 + 350** words, not 500 + 400
- **Columbia** — Essay 1 was wrong; two short answers were missing
- **Haas** — Essay 1 is a **video**
- **Yale** — **choose one of three**, plus a separate 200-word career-interests essay
- **LBS** — a 200-word "What makes you unique?" essay was missing
- **Oxford** — three questions at **250 words each**
- **INSEAD deadlines** — R2 for the Aug-2027 intake is **3 November 2026**, not January. A six-week planning error
- **Oxford scholarships** — apply by the **January (Stage 4)** deadline or forfeit University of Oxford scholarship eligibility

### What is *not* measured

**Admission probabilities are modelled judgements, not data.** They start from published admit rates, are adjusted down for the Indian sub-pool (typically one-third to one-half of the headline rate at US programmes), then adjusted for profile-specific factors — gender, non-engineering background, life-sciences domain, years of experience, employer tier, international exposure. They assume a top-quartile application. They are calibrated, not observed.

**The advisor is not a live AI.** It matches your question against a written knowledge base. It will tell you when it doesn't know rather than invent an answer.

**Verify every deadline on the school's own admissions page before relying on it.** Several European programmes run rolling rounds that shift year to year.

---

## Running it

No build step, no dependencies.

```bash
git clone https://github.com/Avi-debugQuanta/mba-compass.git
cd mba-compass
python3 -m http.server 8000
# open http://localhost:8000
```

Or just open `index.html` directly.

### On a phone

Open the live URL, then **Share → Add to Home Screen**. It behaves like an app and works offline after the first load.

---

## Your data

Without the worker connected, everything lives in `localStorage` in the browser you're using and nothing is uploaded anywhere — but it does **not** sync between devices. Use the ⤓ / ⤒ buttons in the sidebar to move it manually.

With the worker connected and signed in, **Sync workspace** pushes your profile, shortlist, stories, essay drafts, practice ratings and notes to your own row in D1, and signing in elsewhere pulls it back. Each account sees only its own rows.

## The API key

**It is not in this repo and it never reaches the browser.** It lives as an encrypted Cloudflare Worker secret. The browser sends a Google ID token; the worker verifies the signature against Google's public keys, checks the audience and expiry, checks the email against an allowlist, and only then calls Anthropic.

Encrypting a key inside a web app doesn't work — whatever decrypts it ships alongside it, so anyone reads both from DevTools. The only real protection is the key never being there. Setup: [`worker/README.md`](worker/README.md).

---

## Editing the data

Everything lives in `data.js` as plain arrays — no framework, no build.

- `SCHOOLS` — add a school by copying an existing object. Every field is used somewhere; `trackFit` needs a score for all nine track ids.
- `QUESTIONS` — `{ s: schoolId, t: type, src: "reported" | "format", q: "the question" }`.
- `KB` — advisor answers. `k` is the keyword list matched against what you type.
- `TRACKS` / `PATHFINDER` — the nine career tracks and the twelve diagnostic questions.
- `PLAN`, `SCORECARD`, `ESSAY_RULES`, `PRESETS`, `GRE_CURVE` — self-explanatory.

Run `node --check data.js` after editing to catch syntax errors before you push.

---

## Structure

```
index.html    app shell and all eleven views
styles.css    design tokens, light + dark, responsive
data.js       schools, interview questions, career tracks, knowledge base
answers.js    story bank, model answers, per-school interview notes, method
app.js        routing, state, rendering, localStorage
ai.js         Google sign-in, agent chat, streaming, cloud sync
worker/       Cloudflare Worker — holds the API key, gates access, D1 storage
```
