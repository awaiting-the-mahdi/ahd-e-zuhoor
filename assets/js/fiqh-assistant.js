/*
  AHD-E-ZUHOOR — Fiqh Research Assistant (frontend).
  Talks to the secure Cloudflare Worker over HTTPS. No keys or secrets live here.

  After deploying the Worker, put its public address below, e.g.
    var API_BASE = "https://ahd-fiqh-assistant.YOUR-SUBDOMAIN.workers.dev";
*/
(function () {
  "use strict";
  var API_BASE = window.AZ_FIQH_API || "";

  if (window.AZ && AZ.starfield) AZ.starfield(document.getElementById("stars"));

  var form = document.getElementById("askForm"), q = document.getElementById("q"), btn = document.getElementById("askBtn");
  var count = document.getElementById("count"), notice = document.getElementById("notice");
  var loading = document.getElementById("loading"), steps = document.getElementById("steps"), out = document.getElementById("result");
  var lastQuestion = "";

  var EXAMPLES = [
    "Does sleep break wudu?",
    "Is shrimp halal?",
    "Kya roze mein ulti se roza toot jata hai?",
    "کیا جھینگا حلال ہے؟",
    "هل يبطل النوم الوضوء؟"
  ];
  var ex = document.getElementById("examples");
  EXAMPLES.forEach(function (t) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.textContent = t; b.dir = "auto";
    b.onclick = function () { q.value = t; onInput(); q.focus(); };
    ex.appendChild(b);
  });

  function isRTL(s) { return /[؀-ۿ]/.test(s) && (s.match(/[؀-ۿ]/g) || []).length > (s.match(/[a-z]/gi) || []).length; }
  function onInput() {
    count.textContent = q.value.length + " / 600";
    q.dir = isRTL(q.value) ? "rtl" : "auto";
  }
  q.addEventListener("input", onInput);

  if (!API_BASE) {
    notice.style.display = "block";
    notice.textContent = "The assistant is being connected to its secure server. It will be available here very soon.";
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function section(n, title, extraClass) {
    var s = el("article", "sec" + (extraClass ? " " + extraClass : ""));
    var h = el("h2");
    if (n) h.appendChild(el("span", "n", String(n)));
    h.appendChild(document.createTextNode(title));
    s.appendChild(h);
    return s;
  }
  function link(url, text) {
    var a = el("a", null, text || url);
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    return a;
  }

  var stepTimer = null;
  function setLoading(on) {
    loading.classList.toggle("on", on);
    btn.disabled = on;
    clearInterval(stepTimer);
    var lis = steps.querySelectorAll("li");
    lis.forEach(function (li) { li.className = ""; });
    if (on) {
      var i = 0;
      lis[0].className = "on";
      stepTimer = setInterval(function () {
        if (i < lis.length - 1) { lis[i].className = "done"; i++; lis[i].className = "on"; }
      }, 2200);
    }
  }

  function ask(question, context) {
    if (!API_BASE) { notice.style.display = "block"; return; }
    lastQuestion = question;
    out.innerHTML = "";
    setLoading(true);
    fetch(API_BASE.replace(/\/$/, "") + "/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question, context: context || "" })
    })
      .then(function (r) { return r.json().catch(function () { return { status: "error" }; }); })
      .then(render)
      .catch(function () { render({ status: "error" }); })
      .then(function () { setLoading(false); out.scrollIntoView({ behavior: "smooth", block: "start" }); });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = q.value.trim();
    if (v.length < 3) { q.focus(); return; }
    ask(v, "");
  });

  function render(r) {
    out.innerHTML = "";
    if (!r || r.status === "error") {
      var s = section(null, "Something went wrong", "abstain");
      s.appendChild(el("p", null, (r && r.message) || "The assistant could not complete this search right now. Please try again shortly."));
      out.appendChild(s);
      return;
    }

    // 1. Your Question
    var s1 = section(1, "Your Question");
    var pq = el("p", null, r.question); pq.dir = "auto"; s1.appendChild(pq);
    if (r.question_restated && r.question_restated !== r.question) { var pr = el("p", "muted", r.question_restated); pr.dir = "auto"; s1.appendChild(pr); }
    out.appendChild(s1);

    if (r.status === "abstain") {
      var sa = section(null, "No sufficiently relevant ruling found", "abstain");
      sa.appendChild(el("p", "big", r.message || "We could not locate a sufficiently relevant published ruling. Please consult the Office of Ayatollah Sistani."));
      var p = el("p", "muted"); p.appendChild(document.createTextNode("You can send your question to the Office: "));
      p.appendChild(link("https://www.sistani.org/english/send-question/", "sistani.org · Send Question"));
      sa.appendChild(p);
      out.appendChild(sa);
      return;
    }

    if (r.status === "clarify") {
      var sc = section(null, "A little more detail is needed", "clarify");
      sc.appendChild(el("p", null, "The published ruling depends on your situation. Please answer:"));
      var ul = el("ul", "list");
      (r.clarifying_questions || []).forEach(function (t) { var li = el("li", null, t); li.dir = "auto"; ul.appendChild(li); });
      sc.appendChild(ul);
      var ta = el("textarea"); ta.dir = "auto"; ta.maxLength = 800; ta.setAttribute("aria-label", "Your answer"); ta.placeholder = "Your answer…";
      sc.appendChild(ta);
      var row = el("div", "row"); var b = el("button", "btn", "Search again"); b.type = "button";
      b.onclick = function () { if (ta.value.trim()) ask(lastQuestion, ta.value.trim()); else ta.focus(); };
      row.appendChild(b); sc.appendChild(row);
      out.appendChild(sc);
      return;
    }

    var refNo = {};
    (r.official || []).forEach(function (o, i) { refNo[o.id] = i + 1; });

    // 2. Official Ruling
    var s2 = section(2, "Official Ruling");
    (r.official || []).forEach(function (o, i) {
      var box = el("div", "quote");
      box.appendChild(el("span", "badge", "Original text · source " + (i + 1)));
      var bq = el("blockquote", null, o.quote);
      if (isRTL(o.quote)) { bq.dir = "rtl"; bq.lang = o.source.lang === "ur" ? "ur" : "ar"; }
      box.appendChild(bq);
      var src = el("div", "src");
      src.appendChild(document.createTextNode(o.source.type + " · " + o.source.label + " · "));
      src.appendChild(link(o.source.url));
      box.appendChild(src);
      if (o.original_question) {
        var d = el("details"); d.appendChild(el("summary", null, "The question this answer was given to"));
        var oq = el("p", null, o.original_question); oq.dir = "auto"; d.appendChild(oq); box.appendChild(d);
      }
      s2.appendChild(box);
    });
    out.appendChild(s2);

    // 3. Explanation
    var s3 = section(3, "Explanation in Simple Language");
    var ai = el("div", "ai");
    ai.appendChild(el("span", "tag", "AI explanation of the quoted ruling · not a fatwa"));
    (r.explanation || []).forEach(function (e) {
      var p = el("p", null, e.text); p.dir = "auto";
      if (refNo[e.source_id]) p.appendChild(el("span", "ref", String(refNo[e.source_id])));
      ai.appendChild(p);
    });
    s3.appendChild(ai);
    out.appendChild(s3);

    // 4. Conditions and Exceptions
    var s4 = section(4, "Conditions and Exceptions");
    if ((r.conditions || []).length) {
      var cl = el("ul", "list");
      r.conditions.forEach(function (c) { var li = el("li", null, c.text); li.dir = "auto"; if (refNo[c.source_id]) li.appendChild(el("span", "ref", String(refNo[c.source_id]))); cl.appendChild(li); });
      s4.appendChild(cl);
    } else s4.appendChild(el("p", "muted", "No further conditions or exceptions are stated in the quoted ruling. Read the full source to be sure."));
    out.appendChild(s4);

    // 5. Original Source
    var s5 = section(5, "Original Source");
    var sl = el("ul", "srcs");
    (r.official || []).forEach(function (o, i) {
      var li = el("li");
      li.appendChild(document.createTextNode((i + 1) + ". " + o.source.type + " · " + o.source.label + " — "));
      li.appendChild(link(o.source.url));
      li.appendChild(el("small", null, "Quotation verified on sistani.org at " + new Date(o.verified_at).toLocaleString()));
      sl.appendChild(li);
    });
    s5.appendChild(sl);
    out.appendChild(s5);

    // 6. Related Official Rulings
    var s6 = section(6, "Related Official Rulings");
    if ((r.related || []).length) {
      var rl = el("ul", "srcs");
      r.related.forEach(function (x) {
        var li = el("li"); var t = el("span", null, x.title); t.dir = "auto"; li.appendChild(t);
        var sm = el("small"); sm.appendChild(document.createTextNode(x.source.type + " · " + x.source.label + " — ")); sm.appendChild(link(x.source.url)); li.appendChild(sm);
        rl.appendChild(li);
      });
      s6.appendChild(rl);
    } else s6.appendChild(el("p", "muted", "No closely related rulings were found."));
    out.appendChild(s6);
  }
})();
