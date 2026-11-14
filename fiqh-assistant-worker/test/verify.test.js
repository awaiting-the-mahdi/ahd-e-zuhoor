import { test } from "node:test";
import assert from "node:assert/strict";
import { verifyAnswer, buildPassages } from "../src/answer.js";

const passages = buildPassages([
  { pid: "qa-en-1", kind: "qa", number: "1", question: "Is shrimp halal?", text: "It is not permissible to eat from marine animals anything except fish that has scale; shrimp is considered from that category.", url: "https://www.sistani.org/english/qa/1/" },
  { pid: "book-48-1-r93", kind: "ruling", number: "93", section: "5. Blood", text: "Ruling 93. The blood of a human being and every animal whose blood gushes out is impure.", url: "https://www.sistani.org/english/book/48/1/" }
]);
const good = {
  status: "answer", question_restated: "Is shrimp halal?", clarifying_questions: [],
  rulings: [{ passage: "P1", quote: "shrimp is considered from that category." }],
  explanation: [{ text: "Shrimp counts as a permitted sea creature.", passage: "P1" }],
  conditions: [], related: ["P2"], reason: ""
};

test("accepts a verbatim, correctly cited answer", () => {
  assert.deepEqual(verifyAnswer(good, passages), { ok: true });
});
test("ignores whitespace and quote-mark differences only", () => {
  const o = structuredClone(good); o.rulings[0].quote = "shrimp  is considered from that category.";
  assert.equal(verifyAnswer(o, passages).ok, true);
});
test("rejects a paraphrased quote", () => {
  const o = structuredClone(good); o.rulings[0].quote = "shrimp is considered halal by the Ayatollah.";
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("rejects a quote taken from the user's question instead of the answer", () => {
  const o = structuredClone(good); o.rulings[0].quote = "Is shrimp halal?";
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("rejects an unknown passage id", () => {
  const o = structuredClone(good); o.rulings[0].passage = "P9";
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("rejects an answer with no official quote", () => {
  const o = structuredClone(good); o.rulings = [];
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("rejects explanation citing a passage that was not quoted (combining rulings)", () => {
  const o = structuredClone(good); o.explanation.push({ text: "And blood is impure too.", passage: "P2" });
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("rejects URLs written by the model", () => {
  const o = structuredClone(good); o.explanation[0].text = "See www.sistani.org/english/qa/999 for more.";
  assert.equal(verifyAnswer(o, passages).ok, false);
});
test("clarify must contain questions", () => {
  assert.equal(verifyAnswer({ ...good, status: "clarify", clarifying_questions: [] }, passages).ok, false);
  assert.equal(verifyAnswer({ ...good, status: "clarify", clarifying_questions: ["Are you travelling?"] }, passages).ok, true);
});
