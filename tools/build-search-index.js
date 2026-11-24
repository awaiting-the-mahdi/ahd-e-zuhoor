/*
  Builds assets/js/search-index.js, the index behind the home page search bar.
  Run from the repository root after changing site content:   node tools/build-search-index.js
  Each entry: { k: kind, u: url (relative to the site root), t: [en, ur, ro], s: [en, ur, ro] }.
*/
"use strict";
var fs = require("fs"), path = require("path");
var ROOT = path.join(__dirname, "..");
global.window = {};
global.document = { documentElement: { getAttribute: function () {}, classList: { contains: function () {} } } };
function req(f) { require(path.join(ROOT, f)); }

/* Urdu wording from the site's own dictionaries */
var UR = {};
global.AZ_UR = window.AZ_UR = { add: function (o) { for (var k in o) UR[k.replace(/\s+/g, " ").trim()] = o[k]; }, patterns: function () {}, t: function (s) { return UR[s] || s; } };
fs.readdirSync(path.join(ROOT, "assets/js/ur")).forEach(function (f) { if (f !== "library-summaries.js") { try { req("assets/js/ur/" + f); } catch (e) {} } });
function ur(en) { return UR[en] || ""; }

["duas-data", "archive-data", "marefat-data", "marefat-data-ur", "resemblance-data", "mahdawiyyah-data", "quran-data", "ro/words", "ro"].forEach(function (f) { req("assets/js/" + f + ".js"); });
var ROM = window.AZ_ROMANIZE.text;
function ro(u) { return u ? ROM(u) : ""; }
function cut(s, n) { s = String(s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s; }

var OUT = [];
function add(k, u, ten, tur, sen, sur, extra) {
  tur = tur || ""; sur = sur || "";
  var e = { k: k, u: u, t: [ten, tur, ro(tur)], s: [cut(sen, 140), cut(sur, 140), ro(cut(sur, 140))] };
  if (extra) e.x = extra;
  OUT.push(e);
}

/* ---- pages ---- */
[
  ["pages/who-is-imam.html", "Who is Imam Mahdi (ATFS)?", "The awaited hope of humanity, a sunrise of justice after the long night.", "names titles birth occultation duties"],
  ["pages/constellation.html", "Prophetic Blueprint", "124,013 stars: the prophets (a.s.) and the Fourteen Infallibles, and their resemblances in Imam al-Mahdi (a.t.f.s.).", "124013 stars constellation resemblances"],
  ["pages/knowledge-library.html", "Knowledge Library", "Books on the Imam of the Time, with chapter-by-chapter summaries and the full PDFs.", "books library athenaeum pdf"],
  ["pages/hadiths.html", "Duas & Hadiths", "Duas for the Imam of our time, and hadiths about him and in his own words.", "duas hadith ziyarat"],
  ["pages/academy.html", "Digital Learning Academy", "Five worlds of learning: languages, theology, fiqh, the Qur'an and Marefat of the Imam of the Time.", "academy schools courses"],
  ["pages/academy-marefat.html", "Marefat of the Imam of the Time", "The Hidden Sun: from the Messenger (s), through Lady Fatima (sa) and the Twelve Imams (as), to the Imam who is waiting for us.", "marefat hidden sun journey"],
  ["pages/academy-theology.html", "School of Theology and Islamic Thought", "The Five Moons of Belief: Tawhid, 'Adl, Nubuwwah, Imamah and Ma'ad, and the scholars who explained them.", "usool roots of religion aqaid beliefs five moons"],
  ["pages/academy-fiqh.html", "School of Islamic Jurisprudence (Fiqh)", "The Golden Ring of the Day: the ten branches of religion, taharah and daily fiqh, according to Ayatollah Sistani.", "furoo branches fiqh sistani rulings"],
  ["pages/academy-quran.html", "School of Quranic Studies", "Read, listen, learn tajweed and recite the Qur'an surah by surah.", "quran tajweed recite tilawat"],
  ["pages/academy-languages.html", "Language Courses", "Arabic, Persian, Urdu and English courses with Zahra and Ali.", "arabic persian farsi urdu english language course"],
  ["pages/research-archive.html", "Research & Preservation Archive", "The Imam's letters, the four deputies, the signs of the reappearance, sacred places and the covenant.", "archive tawqi letters deputies signs places"],
  ["pages/genealogy.html", "The Noble Lineage", "From Imam al-Mahdi (a.t.f.s.) back through the Ahl al-Bayt, the Prophet's forebears, and the prophets to Adam (a.s.).", "family tree nasab shajra lineage genealogy"],
  ["pages/fiqh-assistant.html", "Fiqh Research Assistant", "Ask Zahra a fiqh question: the published answers of Ayatollah al-Sistani from sistani.org.", "ask zahra masail question sistani"]
].forEach(function (p) {
  var urT = { "pages/academy-marefat.html": "معرفتِ امامِ زمانہ (عج)", "pages/academy-theology.html": "مدرسۂ عقائد اور اسلامی فکر",
    "pages/academy-fiqh.html": "مدرسۂ فقہِ اسلامی (فقہ)", "pages/academy-quran.html": "مدرسۂ علومِ قرآن", "pages/academy-languages.html": "زبانیں سیکھیں",
    "pages/genealogy.html": "پاکیزہ نسب", "pages/fiqh-assistant.html": "فقہی سوالات میں مددگار", "pages/academy.html": "آن لائن تعلیمی اکیڈمی" }[p[0]] || ur(p[1]);
  add("page", p[0], p[1], urT, p[2], ur(p[2]), p[3]);
});

/* ---- duas ---- */
window.AZ_DUAS.list.forEach(function (d) {
  add("dua", "pages/hadiths.html#" + d.id, d.t.en, d.t.ur, d.when && d.when.en, d.when && d.when.ur);
});
add("hadith", "pages/hadiths.html#hadiths", "Hadiths about the Imam of the Time", "امامِ زمانہ (عج) کے بارے میں احادیث", "From the Prophet (s), each Imam on the Qa'im, his own words, and on awaiting him.", "رسولِ خدا (ص) سے، ہر امام کا قائم (عج) کے بارے میں فرمان، ان کا اپنا کلام، اور انتظار کے بارے میں۔", "hadees ahadith narrations");

/* ---- Marefat ---- */
var M = window.AZ_MAREFAT, MU = window.AZ_MAREFAT_UR;
M.questions.forEach(function (q, i) {
  var u = MU.questions[i] || {};
  add("question", "pages/academy-marefat.html#q-" + q.id, q.q, u.q, q.ponder, u.ponder);
});
M.imams.forEach(function (im, i) {
  var u = MU.imams[i] || {};
  add("imam", "pages/academy-marefat.html#ch3", (i + 1) + ". " + im.name + " · " + im.title, u.name ? (i + 1) + ". " + u.name + " · " + u.title : "", im.light, u.light, "imam " + (im.title || ""));
});
add("imam", "pages/academy-marefat.html#ch1", "The Holy Prophet Muhammad (s)", "حضرت محمد مصطفیٰ (ص)", "The Messenger: why the journey begins with him, and his final command.", "رسولِ خدا (ص): یہ سفر انہی سے کیوں شروع ہوتا ہے، اور ان کا آخری حکم۔", "prophet rasool nabi");
add("imam", "pages/academy-marefat.html#ch2", "Lady Fatima al-Zahra (s.a.)", "بی بی فاطمہ زہرا (س)", "The daughter of prophethood and the mother of the Imams.", "نبوت کی بیٹی اور امامت کی ماں۔", "fatima zahra bibi syeda");

/* ---- Prophetic Blueprint resemblances ---- */
var R = window.AZ_RESEMBLANCE;
var RN = { Adam: "Prophet Adam (a.s.)", Idrees: "Prophet Idrees (a.s.)", Nuh: "Prophet Nuh (a.s.)", Hud: "Prophet Hud (a.s.)", Salih: "Prophet Salih (a.s.)",
  Ibrahim: "Prophet Ibrahim (a.s.)", Yusuf: "Prophet Yusuf (a.s.)", Ayyub: "Prophet Ayyub (a.s.)", Musa: "Prophet Musa (a.s.)", Khizr: "Khizr (a.s.), the Righteous Servant",
  Dawood: "Prophet Dawood (a.s.)", Sulaiman: "Prophet Sulaiman (a.s.)", Daniyal: "Prophet Daniyal (a.s.)", Uzair: "Prophet Uzair (a.s.)", Isa: "Prophet Isa (a.s.)",
  Prophet: "Holy Prophet Muhammad (s.a.w.a.)", Zahra: "Lady Fatima al-Zahra (s.a.)", Ali: "Imam Ali (a.s.)", Hasan: "Imam al-Hasan (a.s.)", Husayn: "Imam al-Husayn (a.s.)",
  Sajjad: "Imam Zayn al-Abidin (a.s.)", Baqir: "Imam al-Baqir (a.s.)", Sadiq: "Imam al-Sadiq (a.s.)", Kadhim: "Imam al-Kadhim (a.s.)", Ridha: "Imam al-Ridha (a.s.)",
  Jawad: "Imam al-Jawad (a.s.)", Hadi: "Imam al-Hadi (a.s.)", Askari: "Imam al-Askari (a.s.)" };
Object.keys(R).forEach(function (k) {
  var en = (RN[k] || k) + " and Imam al-Mahdi (a.t.f.s.)", nu = ur(RN[k] || k) || { Adam: "حضرت آدم (ع)" }[k];
  add("resemblance", "pages/constellation.html", en, nu ? nu + " اور امام مہدی (عج)" : "", R[k].sum, ur(R[k].sum), (R[k].tags || []).join(" "));
});

/* ---- prophets' pages ---- */
[["adam", "Adam (AS)"], ["nuh", "Nuh (AS)"], ["ibrahim", "Ibrahim (AS)"], ["musa", "Musa (AS)"], ["isa", "Isa (AS)"], ["yusuf", "Yusuf (AS)"]].forEach(function (p) {
  var src = fs.readFileSync(path.join(ROOT, "pages/prophet.html"), "utf8");
  var m = new RegExp(p[0] + ":\\s*\\{\\s*name:\"[^\"]*\", subtitle:\"([^\"]*)\"").exec(src), sub = m ? m[1] : "";
  add("prophet", "pages/prophet.html?name=" + p[0], "Prophet " + p[1], ur(p[1]).replace(/^(?!حضرت)/, "حضرت "), sub, ur(sub), "nabi hazrat " + p[0]);
});

/* ---- Archive ---- */
var A = window.AZ_ARCHIVE;
A.letters.forEach(function (l) { add("letter", "pages/research-archive.html#" + l.id, l.t.en, l.t.ur, (l.year ? l.year + " · " : "") + l.to.en, l.to.ur, "tawqi letter khat " + (l.keys ? [].concat(l.keys.en || l.keys).join(" ") : "")); });
A.deputies.forEach(function (d) { add("deputy", "pages/research-archive.html#deputies", d.n + ". " + d.name.en, d.n + ". " + d.name.ur, d.span.en, d.span.ur, "naib deputy safir " + (d.kunya && d.kunya.en)); });
add("sign", "pages/research-archive.html#signs", "Signs of the Reappearance", ur("Signs of the Reappearance") || "ظہور کی نشانیاں", A.signs.head.en, A.signs.head.ur, "alamat nishaniyan signs zuhoor");
["definite", "others"].forEach(function (g) { (A.signs[g] || []).forEach(function (s) { if (s.name) add("sign", "pages/research-archive.html#signs", s.name.en, s.name.ur, s.d && s.d.en, s.d && s.d.ur, "sign alamat"); }); });
A.places.forEach(function (p) { add("place", "pages/research-archive.html#places", p.name.en, p.name.ur, p.tag.en + ". " + p.d.en, p.tag.ur + "۔ " + p.d.ur, "ziyarat place"); });

/* ---- Library ---- */
var lib = fs.readFileSync(path.join(ROOT, "pages/knowledge-library.html"), "utf8");
var line = lib.split("\n").filter(function (l) { return l.indexOf("var BOOKS=") === 0; })[0];
var BOOKS = eval(line.slice(10).replace(/;\s*$/, ""));
BOOKS.forEach(function (b) {
  var key = (b.pdf || "").replace(/^.*\//, "").replace(/\.pdf$/i, "");
  var u = "pages/knowledge-library.html#book=" + key;
  add("book", u, b.t, ur(b.t), b.au, ur(b.au), b.c);
  b.ch.forEach(function (c) {
    var heads = (c[1] || []).map(function (x) { var m = /^§([^§]*)§/.exec(x); return m ? m[1] : ""; }).join(" · ");
    add("chapter", u, c[0], ur(c[0]), b.t, ur(b.t), heads);
  });
});

/* ---- Theology ---- */
[["Tawhid: The Oneness of God", "towheed tauheed oneness"], ["'Adl: Divine Justice", "adl justice"], ["Nubuwwah: Prophethood", "nabuwwat prophethood"], ["Imamah: Divine Leadership", "imamat imamah"], ["Ma'ad: The Return", "maad qayamat resurrection"]].forEach(function (m) {
  add("topic", "pages/academy-theology.html", m[0], ur(m[0]), "School of Theology · Five Moons of Belief", ur("Five Moons of Belief") ? "مدرسۂ عقائد · " + ur("Five Moons of Belief") : "", m[1]);
});
window.AZ_MAHDAWIYYAH.forEach(function (s) {
  add("scholar", "pages/academy-theology.html", s.name.en, s.name.ur, s.book.en + " · " + s.years.en, s.book.ur + " · " + s.years.ur, "aalim scholar " + s.book.en);
});

/* ---- Fiqh ---- */
[["Taharah & Wudu", "wuzu wudu taharat purity najis"], ["Salah", "namaz prayer qibla rakat"], ["Daily Fiqh", "halal haram food"], ["Khums & Zakat", "khums zakat fitra"],
 ["Amr & Nahi", "amr bil maroof nahi anil munkar"], ["Fasting", "roza sawm ramadan"], ["Tawalla & Tabarra", "tawalla tabarra"], ["Jihad", "jihad"], ["Hajj", "hajj umrah"]].forEach(function (f) {
  add("fiqh", "pages/academy-fiqh.html", f[0], ur(f[0]) || { "Daily Fiqh": "روزمرہ فقہ", "Fasting": "روزہ" }[f[0]], "School of Fiqh · according to Ayatollah Sistani", "مدرسۂ فقہ · آیت اللہ سیستانی کے مطابق", f[1]);
});

/* ---- Qur'an surahs ---- */
window.AZ_QURAN.surahs.forEach(function (s, i) {
  add("surah", "pages/academy-quran.html#surah-" + (i + 1), (i + 1) + ". Surah " + s[0] + " · " + s[1], (i + 1) + ". سورۂ " + s[1].replace(/^ال/, "") + " · " + s[1], s[2] + " · " + s[3] + " verses", s[3] + " آیات", "surah sura " + (i + 1));
  OUT[OUT.length - 1].t[2] = (i + 1) + ". Surah " + s[0];
});

/* the Qur'an page's own list of other spellings for each surah (Yasin, Fatiha, Baqara …) */
(function () {
  var src = fs.readFileSync(path.join(ROOT, "assets/js/quran-search.js"), "utf8");
  var m = /var ALIAS = (\{[\s\S]*?\});/.exec(src); if (!m) return;
  var AL = eval("(" + m[1] + ")");
  OUT.forEach(function (e) { var n = /#surah-(\d+)$/.exec(e.u); if (n && AL[n[1]]) e.x = (e.x || "") + " " + AL[n[1]].replace(/,/g, " "); });
})();

var missing = OUT.filter(function (e) { return !e.t[1]; }).map(function (e) { return e.t[0]; });
var js = "/* AHD-E-ZUHOOR — search index for the home page search bar. Generated by tools/build-search-index.js; do not edit by hand. */\n" +
  "window.AZ_SEARCH=" + JSON.stringify(OUT) + ";\n";
fs.writeFileSync(path.join(ROOT, "assets/js/search-index.js"), js);
console.log(OUT.length + " entries, " + Math.round(js.length / 1024) + " KB; without Urdu title: " + missing.length);
if (missing.length) console.log(missing.slice(0, 40).join(" | "));
