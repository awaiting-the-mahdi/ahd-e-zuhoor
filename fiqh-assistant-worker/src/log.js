/* Retrieval logging and a simple privacy-preserving rate limit, both in Cloudflare D1. */

async function sha256(s) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function writeLog(env, { id, question, context, result, trace, ms }) {
  if (!env.DB) return;
  const keepText = String(env.LOG_QUESTIONS || "false") === "true";
  try {
    await env.DB.prepare(
      "INSERT INTO logs (id, ts, lang, question, status, reason, plan, searches, candidates, cited, source_checks, model, ms) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13)"
    ).bind(
      id,
      new Date().toISOString(),
      result.language || null,
      keepText ? (question + (context ? "\n" + context : "")) : null,
      result.status || null,
      result.reason || trace.verification || trace.error || null,
      JSON.stringify(trace.plan || null),
      JSON.stringify(trace.searches || null),
      JSON.stringify(trace.candidates || null),
      JSON.stringify(trace.cited || null),
      JSON.stringify(trace.sourceChecks || null),
      trace.model || null,
      ms
    ).run();
  } catch (e) {
    console.error("log failed", e);
  }
}

/** Returns true if this visitor has exceeded the hourly limit. Stores only a salted hash, never the IP. */
export async function hitRateLimit(env, ip) {
  if (!env.DB) return false;
  const limit = Number(env.RATE_LIMIT_PER_HOUR || 20);
  const hour = new Date().toISOString().slice(0, 13);
  const key = await sha256(`${ip}|${env.RATE_SALT || "salt"}|${hour}`);
  try {
    const row = await env.DB.prepare(
      "INSERT INTO rate (key, n, ts) VALUES (?1, 1, ?2) ON CONFLICT(key) DO UPDATE SET n = n + 1 RETURNING n"
    ).bind(key, Date.now()).first();
    if (Math.random() < 0.02) await env.DB.prepare("DELETE FROM rate WHERE ts < ?1").bind(Date.now() - 2 * 3600 * 1000).run();
    return (row?.n || 0) > limit;
  } catch (e) {
    console.error("rate limit failed", e);
    return false;
  }
}
