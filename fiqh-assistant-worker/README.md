# Fiqh Research Assistant — secure backend (Cloudflare Worker)

This folder is the backend for `pages/fiqh-assistant.html`. It searches the official website
of the Office of Ayatollah al-Sistani (sistani.org) **live for every question**, extracts the
relevant published answer or numbered ruling, asks OpenAI to explain **only that text**, then
verifies the result in code before anything is shown.

Nothing secret is stored in this folder or anywhere in the repository.

## How an answer is produced

1. **Understand the question.** Language is detected (English, Arabic, Urdu, Roman Urdu). A glossary
   maps spellings (wudu / wuzu / vuzu / ablution / وضو …) to search terms; OpenAI also suggests search
   terms (it is told not to answer).
2. **Search sistani.org live**: the official Q&A search (English, plus Arabic or Urdu when the user
   writes in those languages) and the books search (Islamic Laws and the other English books).
3. **Extract passages**: each Q&A answer with its question number and permanent link, and each
   numbered ruling ("Ruling 93.") from the relevant book sections.
4. **Explain from evidence only**: OpenAI receives only those passages and must return a fixed JSON
   structure: verbatim quotes, an explanation and conditions that each cite exactly one quoted passage,
   or "abstain", or "clarify" with follow-up questions.
5. **Verify in code** (`src/answer.js`): every quote must appear word-for-word in the passage
   (only whitespace and quote-mark style may differ); unknown passages, explanations that combine
   different rulings, and any URL written by the model are rejected → the system abstains.
6. **Verify on the source**: each quote is checked again against the live official page.
   Sources, links, question numbers and ruling numbers always come from our own records of the
   fetched pages, never from the model.
7. **Log** the retrieval (searches, candidates, cited passages, verification results) to D1.

If anything fails, the answer is: *“We could not locate a sufficiently relevant published ruling.
Please consult the Office of Ayatollah Sistani.”*

## One-time setup (about 15 minutes)

You need: a free Cloudflare account, an OpenAI API account with a payment method and a monthly
spending limit, and Node.js on your computer.

```bash
cd fiqh-assistant-worker
npm install
npx wrangler login                                  # opens the browser to log in to Cloudflare

npx wrangler d1 create ahd-fiqh-assistant           # copy the printed database_id
# paste it into wrangler.toml → database_id = "…"
npm run db:init                                     # creates the logs and rate-limit tables

npx wrangler secret put OPENAI_API_KEY              # paste your OpenAI key when asked (never into a file)
npx wrangler secret put RATE_SALT                   # type any long random text

npm run deploy                                      # prints https://ahd-fiqh-assistant.<you>.workers.dev
```

Then open `assets/js/fiqh-assistant.js` and set:

```js
var API_BASE = window.AZ_FIQH_API || "https://ahd-fiqh-assistant.<you>.workers.dev";
```

Commit and push; GitHub Pages serves the updated page.

Check it works: open `https://ahd-fiqh-assistant.<you>.workers.dev/api/health` → `{"ok":true,…}`.

## Settings (in `wrangler.toml` → `[vars]`)

| Setting | Meaning |
|---|---|
| `ALLOWED_ORIGINS` | Website addresses allowed to call the API (your GitHub Pages address). |
| `OPENAI_MODEL` | OpenAI model to use. Change at any time and redeploy. |
| `OPENAI_TEMPERATURE` | `0` for consistent answers; empty for models that don't accept it. |
| `LOG_QUESTIONS` | `"true"` to store question text in logs; `"false"` stores only retrieval data. |
| `RATE_LIMIT_PER_HOUR` | Questions per visitor per hour (visitors are stored only as a salted hash). |
| `MAX_PASSAGES` | Most passages given to the model per question. |

## Reading the logs

```bash
npx wrangler d1 execute ahd-fiqh-assistant --remote --command "SELECT ts, status, reason, cited FROM logs ORDER BY ts DESC LIMIT 20"
```

## Tests

```bash
npm test     # parsing, language detection, and the verification rules (fabricated quotes, combined rulings, URLs…)
```

## Notes

- sistani.org's `robots.txt` places no restriction on automated access. The Worker fetches only
  what each question needs and caches identical requests for a few hours to stay light on their site.
- If sistani.org changes its page layout, the parsers in `src/sistani.js` may need updating; the
  system then abstains instead of guessing, and the logs show `no candidate passages found`.
