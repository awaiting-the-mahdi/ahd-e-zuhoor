/*
  Community features for the Research & Preservation Archive (pages/research-archive.html).
  Routes (same origin rules as /api/ask):
    GET  /api/community/stats    → { pledges, today }
    POST /api/community/pledge   → counts "I renewed my covenant today" once per visitor per day
    POST /api/community/message  → { type: "question" | "error", text, page?, contact?, lang? } stored privately
  Privacy: no IP address is stored. A visitor is recognised only by a salted hash of (IP, day).
  Messages are never shown on the site; read them with:
    npx wrangler d1 execute ahd-fiqh-assistant --remote --command "SELECT ts,type,page,text,contact FROM messages ORDER BY ts DESC LIMIT 50"
*/

export const COMMUNITY_SCHEMA = [
  "CREATE TABLE IF NOT EXISTS pledges (vkey TEXT PRIMARY KEY, day TEXT NOT NULL, ts INTEGER NOT NULL)",
  "CREATE INDEX IF NOT EXISTS pledges_day ON pledges (day)",
  "CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, ts TEXT NOT NULL, type TEXT NOT NULL, page TEXT, lang TEXT, text TEXT NOT NULL, contact TEXT)",
  "CREATE TABLE IF NOT EXISTS mrate (key TEXT PRIMARY KEY, n INTEGER NOT NULL, ts INTEGER NOT NULL)"
];

let ready = false;
export async function ensureSchema(env) {
  if (ready || !env.DB) return;
  for (const sql of COMMUNITY_SCHEMA) await env.DB.prepare(sql).run();
  ready = true;
}

async function sha256(s) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const today = (now = new Date()) => now.toISOString().slice(0, 10);

export function cleanMessage(body) {
  const type = body && body.type === "error" ? "error" : body && body.type === "question" ? "question" : null;
  const text = String((body && body.text) || "").replace(/\s+/g, " ").trim();
  const page = String((body && body.page) || "").slice(0, 200);
  const contact = String((body && body.contact) || "").trim().slice(0, 200);
  const lang = body && body.lang === "ur" ? "ur" : "en";
  if (!type) return { error: "Choose whether this is a question or an error report." };
  if (text.length < 5 || text.length > 1500) return { error: "Please write between 5 and 1500 characters." };
  return { type, text, page, contact, lang };
}

async function stats(env) {
  const all = await env.DB.prepare("SELECT COUNT(*) AS n FROM pledges").first();
  const day = await env.DB.prepare("SELECT COUNT(*) AS n FROM pledges WHERE day = ?1").bind(today()).first();
  return { pledges: (all && all.n) || 0, today: (day && day.n) || 0 };
}

async function messageLimited(env, ip) {
  const hour = new Date().toISOString().slice(0, 13);
  const key = await sha256(`m|${ip}|${env.RATE_SALT || "salt"}|${hour}`);
  const row = await env.DB.prepare(
    "INSERT INTO mrate (key, n, ts) VALUES (?1, 1, ?2) ON CONFLICT(key) DO UPDATE SET n = n + 1 RETURNING n"
  ).bind(key, Date.now()).first();
  if (Math.random() < 0.05) await env.DB.prepare("DELETE FROM mrate WHERE ts < ?1").bind(Date.now() - 2 * 3600 * 1000).run();
  return ((row && row.n) || 0) > 5;
}

/** Handles /api/community/*. Returns a Response, or null if the path is not a community route. */
export async function handleCommunity(request, env, url, json, cors) {
  if (!url.pathname.startsWith("/api/community/")) return null;
  if (!cors["Access-Control-Allow-Origin"]) return json({ error: "Origin not allowed" }, 403, cors);
  if (!env.DB) return json({ error: "Database not configured" }, 503, cors);
  await ensureSchema(env);
  const route = url.pathname.slice("/api/community/".length);
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";

  if (route === "stats" && request.method === "GET") return json(await stats(env), 200, cors);

  if (route === "pledge" && request.method === "POST") {
    const day = today();
    const vkey = await sha256(`p|${ip}|${env.RATE_SALT || "salt"}|${day}`);
    const res = await env.DB.prepare("INSERT OR IGNORE INTO pledges (vkey, day, ts) VALUES (?1, ?2, ?3)").bind(vkey, day, Date.now()).run();
    const counted = !!(res && res.meta && res.meta.changes);
    return json({ counted, ...(await stats(env)) }, 200, cors);
  }

  if (route === "message" && request.method === "POST") {
    let body;
    try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400, cors); }
    const m = cleanMessage(body);
    if (m.error) return json(m, 400, cors);
    if (await messageLimited(env, ip)) return json({ error: "Thank you. You have sent several messages already; please try again later." }, 429, cors);
    await env.DB.prepare("INSERT INTO messages (id, ts, type, page, lang, text, contact) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)")
      .bind(crypto.randomUUID(), new Date().toISOString(), m.type, m.page || null, m.lang, m.text, m.contact || null).run();
    return json({ ok: true }, 200, cors);
  }

  return json({ error: "Not found" }, 404, cors);
}
