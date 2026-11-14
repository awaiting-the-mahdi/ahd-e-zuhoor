/*
  AHD-E-ZUHOOR Fiqh Research Assistant — Cloudflare Worker.
  Routes:
    GET  /api/health  → { ok }
    POST /api/ask     → { question, context? } → grounded answer JSON
  Secrets (never in code): OPENAI_API_KEY, RATE_SALT
*/
import { answerQuestion } from "./pipeline.js";
import { writeLog, hitRateLimit } from "./log.js";

function corsHeaders(env, origin) {
  const allowed = String(env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const ok = origin && allowed.includes(origin);
  return {
    ...(ok ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers } });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(env, origin);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (url.pathname === "/api/health") return json({ ok: true, service: "fiqh-research-assistant" }, 200, cors);
    if (url.pathname !== "/api/ask") return json({ error: "Not found" }, 404, cors);
    if (request.method !== "POST") return json({ error: "Use POST" }, 405, cors);
    if (!cors["Access-Control-Allow-Origin"]) return json({ error: "Origin not allowed" }, 403, cors);

    let body;
    try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400, cors); }
    const question = String(body.question || "").trim();
    const context = String(body.context || "").trim();
    if (question.length < 3 || question.length > 600 || context.length > 800) {
      return json({ status: "error", message: "Please enter a question between 3 and 600 characters." }, 400, cors);
    }

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (await hitRateLimit(env, ip)) {
      return json({ status: "error", message: "Too many questions in a short time. Please wait a little and try again." }, 429, cors);
    }

    const id = crypto.randomUUID();
    const t0 = Date.now();
    try {
      const { result, trace } = await answerQuestion(env, question, context);
      ctx.waitUntil(writeLog(env, { id, question, context, result, trace, ms: Date.now() - t0 }));
      return json({ ...result, request_id: id }, 200, cors);
    } catch (e) {
      const msg = String(e && e.message || e);
      ctx.waitUntil(writeLog(env, { id, question, context, result: { status: "error" }, trace: { error: msg }, ms: Date.now() - t0 }));
      return json({ status: "error", request_id: id, message: "The assistant could not complete this search right now. Please try again shortly." }, 502, cors);
    }
  }
};
