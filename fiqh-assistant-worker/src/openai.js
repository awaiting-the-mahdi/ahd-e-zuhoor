/* Minimal OpenAI client. The key is read from the Worker secret OPENAI_API_KEY only. */

export async function chatJSON(env, { system, user, schema, name, maxTokens = 1800 }) {
  if (!env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY secret is not set");
  const body = {
    model: env.OPENAI_MODEL || "gpt-4.1-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ],
    response_format: { type: "json_schema", json_schema: { name, strict: true, schema } },
    max_completion_tokens: maxTokens
  };
  if (env.OPENAI_TEMPERATURE !== undefined && env.OPENAI_TEMPERATURE !== "") body.temperature = Number(env.OPENAI_TEMPERATURE);
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(45000)
  });
  if (!r.ok) {
    const t = await r.text().catch(() => "");
    throw new Error(`OpenAI error ${r.status}: ${t.slice(0, 300)}`);
  }
  const j = await r.json();
  const msg = j.choices?.[0]?.message;
  if (msg?.refusal) throw new Error("Model refused: " + msg.refusal);
  return { data: JSON.parse(msg.content), usage: j.usage, model: j.model };
}
