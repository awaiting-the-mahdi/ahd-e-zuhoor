# Fiqh Research Assistant — secure backend (Cloudflare Worker)

This folder is the backend for **"Ask Zahra"**, the Fiqh chat bot on `pages/academy-fiqh.html`
(floating button) and `pages/fiqh-assistant.html` (full page). Code: `assets/js/fiqh-bot.js`.

It searches the official website of the Office of Ayatollah al-Sistani (sistani.org) **live for
every question** and shows the closest **published answers and numbered rulings, word for word**,
each with its question or ruling number and link, re-checked on the live page.

Nothing secret is stored in this folder or anywhere in the repository.

## Modes

| `MODE` | What it does | Cost |
|---|---|---|
| `retrieval` (default, "Option 1") | Official text only. No AI writes anything. | $0 on Cloudflare's free plan |
| `ai` | Adds an evidence-grounded AI explanation (OpenAI) with strict verification. Needs the `OPENAI_API_KEY` secret. | Pay per use |

## How an answer is produced (retrieval mode)

1. **Understand the question.** Language is detected (English, Arabic, Urdu, Roman Urdu). A glossary
   maps spellings and translations (wudu / wuzu / vuzu / ablution / وضو …) to the same topic.
2. **Search sistani.org live**: the official Q&A search (English, plus Arabic or Urdu when the user
   writes in those languages), the books search, and the books' tables of contents (so sections such
   as "Things that invalidate wuḍūʾ" are found by their titles).
3. **Extract passages**: each Q&A answer with its question number and link, and each numbered
   ruling ("Ruling 322.") from the relevant book sections.
4. **Rank** by how many of the question's topics each passage contains (the threshold), with extra
   ranking weight when the ruling text itself names the topic or the section title matches the kind
   of question (e.g. "invalidate" for "does X break Y").
5. **Abstain** unless a passage contains enough of the question's topics (`MIN_RELEVANCE`):
   *“We could not locate a sufficiently relevant published ruling. Please consult the Office of
   Ayatollah Sistani.”*
6. **Verify on the source**: each passage shown is checked again against its live official page.
7. **Log** the retrieval (searches, sections, candidates, shown passages, checks) to D1.

Limits to know: without AI, matching is by topic words. The text shown is always genuine official
text, but occasionally it may be a related ruling rather than the exact answer, so the bot always
shows the official question and asks the reader to check it matches their situation.

## One-time setup (about 15 minutes)

You need: a free Cloudflare account and Node.js on your computer. (An OpenAI account is only
needed if you later switch to `MODE = "ai"`.)

```bash
cd fiqh-assistant-worker
npm install
npx wrangler login                                  # opens the browser to log in to Cloudflare

npx wrangler d1 create ahd-fiqh-assistant           # copy the printed database_id
# paste it into wrangler.toml → database_id = "…"
npm run db:init                                     # creates the logs and rate-limit tables

npx wrangler secret put RATE_SALT                   # type any long random text
# only for AI mode later:  npx wrangler secret put OPENAI_API_KEY

npm run deploy                                      # prints https://ahd-fiqh-assistant.<you>.workers.dev
```

Then open `assets/js/fiqh-bot.js` and set the address on the line near the top:

```js
var AZ_FIQH_API_DEFAULT = "https://ahd-fiqh-assistant.<you>.workers.dev";
```

Commit and push; GitHub Pages serves the updated page.

Check it works: open `https://ahd-fiqh-assistant.<you>.workers.dev/api/health` → `{"ok":true,…}`.

## Settings (in `wrangler.toml` → `[vars]`)

| Setting | Meaning |
|---|---|
| `MODE` | `retrieval` (official text only, $0) or `ai`. |
| `MIN_RELEVANCE` | Share of the question's topics a passage must contain to be shown (default 0.6). |
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
npm test     # parsing, language detection, matching, and the AI-mode verification rules
```

## Notes

- sistani.org's `robots.txt` places no restriction on automated access. The Worker fetches only
  what each question needs and caches identical requests for a few hours to stay light on their site.
- If sistani.org changes its page layout, the parsers in `src/sistani.js` may need updating; the
  system then abstains instead of guessing, and the logs show `no candidate passages found`.
