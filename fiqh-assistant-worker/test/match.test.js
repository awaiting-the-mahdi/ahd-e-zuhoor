import { test } from "node:test";
import assert from "node:assert/strict";
import { concepts, relevance, intents } from "../src/match.js";

test("ruling words are ignored; topics are kept with all spellings", () => {
  const cs = concepts("Is it halal to eat shrimp?");
  const labels = cs.map((c) => c.label);
  assert.ok(labels.includes("shrimp"));
  assert.ok(!labels.includes("halal"));
  assert.ok(cs.find((c) => c.label === "shrimp").alts.includes("جھینگا"));
});

test("Roman Urdu and Urdu map to the same concepts as English", () => {
  const a = concepts("kya roze mein ulti se roza toot jata hai").map((c) => c.label).sort();
  const b = concepts("Does vomiting break the fast?").map((c) => c.label).sort();
  assert.deepEqual(a, ["fasting", "vomit"]);
  assert.deepEqual(b, ["fasting", "vomit"]);
});

test("threshold uses only the share of concepts found; bonuses only rank", () => {
  const cs = concepts("Does sleep break wudu?");
  const full = relevance({ question: "", section: "THINGS THAT INVALIDATE WUḌŪʾ", text: "Ruling 322. Seven things invalidate wuḍūʾ: 4. sleeping ..." }, cs, intents("Does sleep break wudu?"));
  const half = relevance({ question: "", section: "LAWS OF WUḌŪʾ", text: "Ruling 1. Something about wuḍūʾ only." }, cs, intents("Does sleep break wudu?"));
  assert.equal(full.found, 1);
  assert.equal(half.found, 0.5);
  assert.ok(full.score > half.score);
  assert.ok(half.score < 0.6 + 0.5, "bonus cannot lift a half match far");
});

test("answer text naming the topic ranks above a question that only mentions it", () => {
  const cs = concepts("Is shrimp halal?");
  const inAnswer = relevance({ question: "What kind of marine animals are halal?", text: "Only fish with scales; shrimp is from that category." }, cs, intents("Is shrimp halal?"));
  const inQuestionOnly = relevance({ question: "Can I eat lobster like shrimp?", text: "It is not permissible to eat lobster." }, cs, intents("Is shrimp halal?"));
  assert.ok(inAnswer.score > inQuestionOnly.score);
});

test("nonsense questions have no glossary concepts", () => {
  assert.equal(concepts("Can I buy a red bicycle on Tuesday?").filter((c) => c.alts.length > 2).length, 0);
});
