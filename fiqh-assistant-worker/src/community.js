/*
  Community features for the Research & Preservation Archive (pages/research-archive.html).
  Routes (same origin rules as /api/ask):
    GET  /api/community/stats    → { pledges, today }
    POST /api/community/pledge   → counts "I renewed my covenant today" once per visitor per day
  Privacy: no IP address is stored. A visitor is recognised only by a salted hash of (IP, day).
*/

export const COMMUNITY_SCHEMA = [
  "CREATE TABLE IF NOT EXISTS pledges (vkey TEXT PRIMARY KEY, day TEXT NOT NULL, ts INTEGER NOT NULL)",
  "CREATE INDEX IF NOT EXISTS pledges_day ON pledges (day)"
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

async function stats(env) {
  const all = await env.DB.prepare("SELECT COUNT(*) AS n FROM pledges").first();
  const day = await env.DB.prepare("SELECT COUNT(*) AS n FROM pledges WHERE day = ?1").bind(today()).first();
  return { pledges: (all && all.n) || 0, today: (day && day.n) || 0 };
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

  return json({ error: "Not found" }, 404, cors);
}
