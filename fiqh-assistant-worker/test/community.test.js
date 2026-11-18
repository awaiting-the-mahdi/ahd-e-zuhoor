import { test } from "node:test";
import assert from "node:assert/strict";
import { handleCommunity, today } from "../src/community.js";

/* A tiny in-memory stand-in for Cloudflare D1, enough for the community queries. */
function fakeDB() {
  const t = { pledges: new Map(), messages: [], mrate: new Map() };
  const run = (sql, a) => {
    if (sql.startsWith("CREATE")) return { meta: { changes: 0 } };
    if (sql.startsWith("INSERT OR IGNORE INTO pledges")) { if (t.pledges.has(a[0])) return { meta: { changes: 0 } }; t.pledges.set(a[0], { day: a[1] }); return { meta: { changes: 1 } }; }
    if (sql.startsWith("INSERT INTO messages")) { t.messages.push(a); return { meta: { changes: 1 } }; }
    if (sql.startsWith("DELETE")) return { meta: { changes: 0 } };
    throw new Error("unexpected run " + sql);
  };
  const first = (sql, a) => {
    if (sql.startsWith("SELECT COUNT(*) AS n FROM pledges WHERE")) return { n: [...t.pledges.values()].filter((p) => p.day === a[0]).length };
    if (sql.startsWith("SELECT COUNT(*) AS n FROM pledges")) return { n: t.pledges.size };
    if (sql.startsWith("INSERT INTO mrate")) { const n = (t.mrate.get(a[0]) || 0) + 1; t.mrate.set(a[0], n); return { n }; }
    throw new Error("unexpected first " + sql);
  };
  return { t, prepare(sql) { let a = []; const o = { bind(...x) { a = x; return o; }, run: async () => run(sql, a), first: async () => first(sql, a) }; return o; } };
}
const json = (d, status, h) => ({ status, body: d, headers: h });
const cors = { "Access-Control-Allow-Origin": "https://awaiting-the-mahdi.github.io" };
const req = (method, ip, body) => ({ method, headers: { get: (k) => (k === "CF-Connecting-IP" ? ip : null) }, json: async () => body });
const U = (p) => new URL("https://x.dev" + p);

test("ignores other paths", async () => {
  assert.equal(await handleCommunity(req("GET"), { DB: fakeDB() }, U("/api/ask"), json, cors), null);
});
test("refuses unknown origins", async () => {
  const r = await handleCommunity(req("GET"), { DB: fakeDB() }, U("/api/community/stats"), json, {});
  assert.equal(r.status, 403);
});
test("a pledge counts once per visitor per day", async () => {
  const env = { DB: fakeDB(), RATE_SALT: "s" };
  const a = await handleCommunity(req("POST", "1.1.1.1"), env, U("/api/community/pledge"), json, cors);
  const b = await handleCommunity(req("POST", "1.1.1.1"), env, U("/api/community/pledge"), json, cors);
  const c = await handleCommunity(req("POST", "2.2.2.2"), env, U("/api/community/pledge"), json, cors);
  assert.deepEqual([a.body.counted, b.body.counted, c.body.counted], [true, false, true]);
  assert.equal(c.body.pledges, 2); assert.equal(c.body.today, 2);
  assert.ok(![...env.DB.t.pledges.keys()].some((k) => k.includes("1.1.1.1")), "no IP stored");
});
test("the message route no longer exists", async () => {
  const r = await handleCommunity(req("POST", "1", { type: "error", text: "hello there" }), { DB: fakeDB() }, U("/api/community/message"), json, cors);
  assert.equal(r.status, 404);
});
test("today is an ISO date", () => {
  assert.match(today(new Date("2026-11-18T10:00:00Z")), /^2026-11-18$/);
});
