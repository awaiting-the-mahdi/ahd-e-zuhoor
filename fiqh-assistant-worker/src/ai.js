/*
  One interface for the language model, whichever provider is configured:
    - "workers-ai" (default): Cloudflare Workers AI through the AI binding. No key, free daily allowance.
    - "openai":  OpenAI API (secret OPENAI_API_KEY).
    - "gemini":  Google Gemini through its OpenAI-compatible endpoint (secret GEMINI_API_KEY).
  Every call asks for JSON that follows a schema, and the result is parsed defensively.
*/
import { chatJSON as openaiChat } from "./openai.js";

export function provider(env) {
  if (env.AI_PROVIDER) return env.AI_PROVIDER;
  if (env.AI) return "workers-ai";
  if (env.GEMINI_API_KEY) return "gemini";
  if (env.OPENAI_API_KEY) return "openai";
  return "";
}

export function aiAvailable(env) {
  const p = provider(env);
  return (p === "workers-ai" && !!env.AI) || (p === "openai" && !!env.OPENAI_API_KEY) || (p === "gemini" && !!env.GEMINI_API_KEY);
}

function parseLoose(x) {
  if (x && typeof x === "object") return x;
  let s = String(x || "").trim();
  s = s.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  const a = s.indexOf("{"), b = s.lastIndexOf("}");
  if (a >= 0 && b > a) s = s.slice(a, b + 1);
  return JSON.parse(s);
}

export async function chat(env, { system, user, schema, name, maxTokens = 1500 }) {
  const p = provider(env);
  if (p === "workers-ai") {
    const model = env.AI_MODEL || "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
    const messages = [
      { role: "system", content: system + "\n\nReply with ONLY a JSON object that matches this JSON schema:\n" + JSON.stringify(schema) },
      { role: "user", content: user }
    ];
    let out;
    try {
      out = await env.AI.run(model, { messages, max_tokens: maxTokens, temperature: 0.1, response_format: { type: "json_schema", json_schema: schema } });
    } catch (e) {
      // Some models do not accept response_format; retry with the instruction in the prompt only.
      if (/response_format|json_schema|not supported/i.test(String(e && e.message))) out = await env.AI.run(model, { messages, max_tokens: maxTokens, temperature: 0.1 });
      else throw e;
    }
    return { data: parseLoose(out && (out.response ?? out.result ?? out)), model };
  }
  if (p === "gemini") {
    return openaiChat({ ...env, OPENAI_API_KEY: env.GEMINI_API_KEY, OPENAI_MODEL: env.AI_MODEL || "gemini-2.0-flash", OPENAI_BASE: "https://generativelanguage.googleapis.com/v1beta/openai" }, { system, user, schema, name, maxTokens });
  }
  if (p === "openai") return openaiChat(env, { system, user, schema, name, maxTokens });
  throw new Error("No AI provider configured");
}
