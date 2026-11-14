import { test } from "node:test";
import assert from "node:assert/strict";
import { verifyAnswer, buildPassages, quoteFor, normalizeRulings, backNumbers } from "../src/answer.js";

const passages = buildPassages([
  { pid: "qa-en-1", kind: "qa", number: "1", question: "Is shrimp halal?", text: "It is not permissible to eat from marine animals anything except fish that has scale; shrimp is considered from that category. But lobster is forbidden.", url: "https://www.sistani.org/english/qa/1/" },
  { pid: "book-48-1-r93", kind: "ruling", number: "93", section: "5. Blood", text: "Ruling 93. The blood of a human being and every animal whose blood gushes out is impure. Therefore, the blood of fish is pure.", url: "https://www.sistani.org/english/book/48/1/" }
]);
const good = () => ({
  status: "answer",
  reply: "Yes, shrimp is counted among the permitted sea creatures [P1].",
  rulings: [{ sentences: ["P1.1"] }],
  conditions: [{ text: "Other sea creatures such as lobster are not permitted.", passage: "P1" }],
  clarifying_questions: [], related: ["P2"], reason: ""
});

test("passages are split into numbered sentences", () => {
  assert.deepEqual(passages[0].sentences.map((s) => s.id), ["P1.1", "P1.2"]);
  assert.deepEqual(passages[1].sentences.map((s) => s.id), ["P2.1", "P2.2"]); // "Ruling 93." stays with its first sentence
});
test("the official quote is assembled verbatim from the original text", () => {
  assert.equal(quoteFor(passages[0], ["P1.1"]), "It is not permissible to eat from marine animals anything except fish that has scale; shrimp is considered from that category.");
});
test("accepts a correctly grounded answer", () => {
  assert.deepEqual(verifyAnswer(good(), passages), { ok: true });
});
test("rejects unknown sentence numbers", () => {
  const o = good(); o.rulings[0].sentences = ["P1.9"];
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("rejects one quote that mixes two passages (combining rulings)", () => {
  const o = good(); o.rulings[0].sentences = ["P1.1", "P2.2"];
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("rejects a reply that cites a passage with no quoted ruling", () => {
  const o = good(); o.reply = "Shrimp is fine [P1] and blood is impure [P2].";
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("rejects a reply with no citation at all", () => {
  const o = good(); o.reply = "Yes, shrimp is fine.";
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("rejects an answer with no official ruling", () => {
  const o = good(); o.rulings = [];
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("rejects URLs written by the model", () => {
  const o = good(); o.reply = "See www.sistani.org/english/qa/999 [P1].";
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("rejects conditions tied to an unquoted passage", () => {
  const o = good(); o.conditions = [{ text: "Fish blood is pure.", passage: "P2" }];
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("clarify must contain questions; abstain is always allowed", () => {
  assert.equal(verifyAnswer({ ...good(), status: "clarify", clarifying_questions: [] }, passages).ok, false);
  assert.equal(verifyAnswer({ ...good(), status: "clarify", clarifying_questions: ["Are you travelling?"] }, passages).ok, true);
  assert.equal(verifyAnswer({ status: "abstain" }, passages).ok, true);
});

test("a selection spanning two passages is split into one quote per passage", () => {
  const o = good(); o.rulings = [{ sentences: ["P1.1", "P2.2"] }]; o.reply = "Shrimp is fine [P1]. Blood is impure [P2].";
  normalizeRulings(o);
  assert.deepEqual(o.rulings, [{ sentences: ["P1.1"] }, { sentences: ["P2.2"] }]);
  assert.equal(verifyAnswer(o, passages).ok, true);
});

const fast = buildPassages([{ pid: "b", kind: "ruling", number: "1551", section: "Fast", text: "Ruling 1551. Eight things invalidate a fast:\n1. eating and drinking;\n2. vomiting intentionally.\nThe journey must be eight farsakhs, about 45 km." }]);
test("a list item is quoted with its heading", () => {
  assert.equal(quoteFor(fast[0], ["P1.3"]), "Ruling 1551. Eight things invalidate a fast: … 2. vomiting intentionally.");
});
test("numbers in the reply must be in the official text (auto-added from the same passage)", () => {
  const o = { status: "answer", reply: "The distance is about 45 km [P1].", rulings: [{ sentences: ["P1.3"] }], conditions: [], clarifying_questions: [], related: [], reason: "" };
  assert.equal(backNumbers(o, fast).ok, true);
  assert.ok(o.rulings[0].sentences.includes("P1.4"));
  const bad = { status: "answer", reply: "The distance is 99 km [P1].", rulings: [{ sentences: ["P1.3"] }], conditions: [], clarifying_questions: [], related: [], reason: "" };
  assert.equal(backNumbers(bad, fast).ok, false);
});
