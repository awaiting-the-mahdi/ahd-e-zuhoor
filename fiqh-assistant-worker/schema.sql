-- Fiqh Research Assistant: retrieval logs and rate limiting.
CREATE TABLE IF NOT EXISTS logs (
  id TEXT PRIMARY KEY,
  ts TEXT NOT NULL,
  lang TEXT,
  question TEXT,          -- only stored when LOG_QUESTIONS = "true"
  status TEXT,            -- answer | clarify | abstain | error
  reason TEXT,            -- why it abstained or failed
  plan TEXT,              -- detected language and search terms
  searches TEXT,          -- which sistani.org searches ran and their hit counts
  candidates TEXT,        -- passage ids considered, with scores
  cited TEXT,             -- passage ids cited in the answer
  source_checks TEXT,     -- live verification result per cited passage
  model TEXT,
  ms INTEGER
);
CREATE INDEX IF NOT EXISTS logs_ts ON logs (ts);

CREATE TABLE IF NOT EXISTS rate (
  key TEXT PRIMARY KEY,   -- salted hash of visitor + hour (no IP stored)
  n INTEGER NOT NULL,
  ts INTEGER NOT NULL
);
