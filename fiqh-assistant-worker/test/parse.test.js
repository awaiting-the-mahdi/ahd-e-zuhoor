import { test } from "node:test";
import assert from "node:assert/strict";
import { parseQA, parseBookResults, parseRulings } from "../src/sistani.js";
import { detectLanguage, expandTerms } from "../src/normalize.js";

// Small synthetic snippets that mirror the structure of sistani.org pages (not copied content).
const QA_HTML = `<div class="one-qa">
<a href="/english/qa/123/" name="123" title="Link to this question" class="fr qa-num">1</a>
<span class="nvy b">Question</span>: Sample question &amp; text?
<div class="b">
<span class="nvy">Answer</span>: Sample answer, with a condition.
</div>
<a class="fr" href="/english/qa/01111/">Sample Topic</a>
<div class="clr"></div>
</div>`;

const BOOK_RESULTS = `<div class="one-result">
<a href="/english/book/48/">Islamic Laws</a>
»
<a href="/english/book/48/2200/">SAMPLE SECTION</a>
:<br />...snippet...</div>`;

const SECTION = `<h1 class="c">SAMPLE SECTION</h1>
<div class="baz book-text">Intro line.<br />
Ruling 10. First sample ruling.<br />
<br />
A second paragraph of ruling ten.<br />
Ruling 11. Second sample ruling.<br />
</div>`;

test("parses Q&A blocks with number, question, answer, topic and URL", () => {
  const [q] = parseQA(QA_HTML, "en");
  assert.equal(q.number, "123");
  assert.equal(q.question, "Sample question & text?");
  assert.equal(q.text, "Sample answer, with a condition.");
  assert.equal(q.topic, "Sample Topic");
  assert.equal(q.url, "https://www.sistani.org/english/qa/123/");
});

test("parses book search results into section links", () => {
  const [r] = parseBookResults(BOOK_RESULTS);
  assert.equal(r.url, "https://www.sistani.org/english/book/48/2200/");
  assert.equal(r.book, "Islamic Laws");
  assert.equal(r.section, "SAMPLE SECTION");
});

test("splits a section into numbered rulings, keeping multi-paragraph rulings whole", () => {
  const rs = parseRulings(SECTION, { bookId: "48", sectionId: "2200", url: "u", book: "Islamic Laws", section: "SAMPLE SECTION" });
  assert.equal(rs.length, 2);
  assert.equal(rs[0].number, "10");
  assert.match(rs[0].text, /^Ruling 10\. First sample ruling\.\n\nA second paragraph of ruling ten\.$/);
  assert.equal(rs[1].pid, "book-48-2200-r11");
});

test("detects languages including Roman Urdu", () => {
  assert.equal(detectLanguage("Does sleep break wudu?"), "en");
  assert.equal(detectLanguage("kya so jane se wuzu toot jata hai"), "roman-ur");
  assert.equal(detectLanguage("کیا نیند سے وضو ٹوٹ جاتا ہے"), "ur");
  assert.equal(detectLanguage("هل النوم يبطل الوضوء"), "ar");
});

test("maps different spellings to the same search terms", () => {
  for (const q of ["wudu", "wuzu", "vuzu", "ablution", "وضو"]) assert.ok(expandTerms("is my " + q + " valid").en.includes("wudu"), q);
  assert.ok(expandTerms("roza mein ulti").en.includes("fasting"));
  assert.ok(expandTerms("roza mein ulti").en.includes("vomit"));
});
