/*
  AHD-E-ZUHOOR — "Ask Zahra" Fiqh chat bot.
  Finds Ayatollah al-Sistani's published answers on sistani.org through the secure
  Cloudflare Worker and shows them verbatim with their sources. No keys live here.

  Usage:
    AZFiqhBot.mount();                                  // floating button + chat panel
    AZFiqhBot.mount({ inline: document.getElementById("host") });   // full chat inside a page

  After deploying the Worker, set its address here:
*/
var AZ_FIQH_API_DEFAULT = "";   // e.g. "https://ahd-fiqh-assistant.YOUR-SUBDOMAIN.workers.dev"

(function () {
  "use strict";
  var API = (window.AZ_FIQH_API || AZ_FIQH_API_DEFAULT || "").replace(/\/$/, "");
  var ABSTAIN = "We could not locate a sufficiently relevant published ruling. Please consult the Office of Ayatollah Sistani.";
  var SEND_Q = "https://www.sistani.org/english/send-question/";

  var css = `
  .azb-launch{position:fixed;right:18px;bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:1400;width:74px;height:74px;border-radius:50%;border:3px solid #ffc94d;padding:0;cursor:pointer;overflow:hidden;
    background:radial-gradient(circle at 50% 30%,#2a3270,#0b0f33);box-shadow:0 10px 30px rgba(0,0,0,.45),0 0 30px rgba(255,201,77,.45);transition:transform .25s cubic-bezier(.2,1.6,.4,1)}
  .azb-launch:hover{transform:scale(1.08)}
  .azb-launch .face{position:absolute;left:-6%;top:-4%;width:112%;height:170%}
  .azb-launch::after{content:"";position:absolute;inset:-3px;border-radius:50%;border:3px solid #ffc94d;animation:azbPing 2.6s ease-out infinite}
  @keyframes azbPing{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.45);opacity:0}}
  .azb-tip{position:fixed;right:102px;bottom:calc(34px + env(safe-area-inset-bottom,0px));z-index:1400;max-width:220px;padding:10px 14px;border-radius:16px 16px 4px 16px;background:#fff;color:#1d1f45;font:800 .9rem/1.3 Nunito,system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.35);opacity:0;transform:translateY(10px);transition:all .4s;pointer-events:none}
  .azb-tip.on{opacity:1;transform:none}
  .azb-panel{position:fixed;right:18px;bottom:calc(104px + env(safe-area-inset-bottom,0px));z-index:1401;width:min(420px,calc(100vw - 36px));height:min(640px,calc(100vh - 140px));display:flex;flex-direction:column;border-radius:24px;overflow:hidden;
    background:linear-gradient(180deg,#121846,#0a0e2c);border:2px solid #2a3270;box-shadow:0 24px 70px rgba(0,0,0,.6);font-family:Nunito,system-ui,sans-serif;color:#f4f1ff;
    opacity:0;transform:translateY(24px) scale(.96);transform-origin:bottom right;pointer-events:none;transition:opacity .3s,transform .4s cubic-bezier(.2,1.3,.4,1)}
  .azb-panel.on{opacity:1;transform:none;pointer-events:auto}
  .azb-inline{position:relative;right:auto;bottom:auto;width:100%;height:min(720px,80vh);opacity:1;transform:none;pointer-events:auto}
  .azb-head{display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(255,201,77,.08);border-bottom:1.5px solid #2a3270}
  .azb-head .av{flex:none;width:46px;height:46px;border-radius:50%;overflow:hidden;position:relative;background:radial-gradient(circle at 50% 30%,#2a3270,#0b0f33);border:2px solid #ffc94d}
  .azb-head .av .face{position:absolute;left:-6%;top:-4%;width:112%;height:170%}
  .azb-head b{display:block;font-weight:900;font-size:1.02rem}
  .azb-head small{display:block;color:#a9afd6;font-weight:700;font-size:.75rem;line-height:1.25}
  .azb-head .x{margin-left:auto;flex:none;width:38px;height:38px;border-radius:12px;border:1.5px solid #2a3270;background:transparent;color:#a9afd6;font-size:1.2rem;cursor:pointer}
  .azb-body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}
  .azb-msg{max-width:92%;padding:10px 13px;border-radius:16px;font-weight:700;font-size:.93rem;line-height:1.5;animation:azbIn .35s cubic-bezier(.2,1.3,.4,1) both;overflow-wrap:anywhere}
  @keyframes azbIn{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}
  .azb-bot{align-self:flex-start;background:#1d2560;border:1.5px solid #2a3270;border-bottom-left-radius:4px}
  .azb-user{align-self:flex-end;background:#ffc94d;color:#2a1c00;border-bottom-right-radius:4px}
  .azb-msg[dir=rtl],.azb-card [dir=rtl]{font-family:"Noto Nastaliq Urdu","Amiri",serif;line-height:2}
  .azb-card{margin-top:8px;padding:11px 12px;border-radius:14px;background:rgba(255,201,77,.08);border:1.5px solid rgba(255,201,77,.5)}
  .azb-card .lab{display:block;font-size:.66rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#ffc94d;margin-bottom:3px}
  .azb-card .oq{color:#cfd3ef;font-size:.86rem;margin-bottom:8px}
  .azb-card blockquote{margin:0;color:#fff;font-size:.95rem;white-space:pre-line}
  .azb-card .more{background:none;border:0;color:#ffe7a8;font:inherit;font-weight:900;font-size:.8rem;cursor:pointer;padding:4px 0 0;text-decoration:underline}
  .azb-card .src{margin-top:8px;font-size:.8rem;color:#ffe7a8;font-weight:800}
  .azb-card .src a{color:#fff;text-decoration:underline;text-underline-offset:2px}
  .azb-card .ok{display:inline-block;margin-top:5px;font-size:.72rem;color:#7ff0d6;font-weight:900}
  .azb-tag{display:inline-block;font-size:.66rem;font-weight:900;letter-spacing:.08em;padding:2px 8px;border-radius:99px;margin-left:6px;vertical-align:1px}
  .azb-tag.close{background:#3fd0b5;color:#06231d}.azb-tag.partial{background:#ffb547;color:#3a2600}
  .azb-note{margin-top:8px;font-size:.8rem;color:#cfd3ef}
  .azb-rel{margin-top:8px;font-size:.82rem}
  .azb-rel summary{cursor:pointer;color:#ffe7a8;font-weight:900}
  .azb-rel ul{margin:6px 0 0;padding-left:18px}
  .azb-rel a{color:#fff}
  .azb-typing{align-self:flex-start;display:flex;gap:5px;padding:12px 14px;border-radius:16px;background:#1d2560;border:1.5px solid #2a3270}
  .azb-typing i{width:8px;height:8px;border-radius:50%;background:#ffc94d;animation:azbDot 1s infinite}
  .azb-typing i:nth-child(2){animation-delay:.15s}.azb-typing i:nth-child(3){animation-delay:.3s}
  .azb-typing span{margin-left:6px;font-size:.78rem;font-weight:800;color:#a9afd6}
  @keyframes azbDot{0%,100%{opacity:.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-4px)}}
  .azb-chips{display:flex;flex-wrap:wrap;gap:6px}
  .azb-chips button{border:1.5px solid #2a3270;background:#161c4a;color:#e3e5f5;border-radius:99px;padding:6px 11px;font:inherit;font-weight:800;font-size:.8rem;cursor:pointer}
  .azb-chips button:hover{border-color:#ffc94d}
  .azb-foot{display:flex;gap:8px;align-items:flex-end;padding:10px;border-top:1.5px solid #2a3270;background:#0b0f33}
  .azb-foot textarea{flex:1;resize:none;max-height:120px;min-height:44px;border-radius:14px;border:1.5px solid #2a3270;background:#161c4a;color:#fff;font:inherit;font-weight:700;font-size:.95rem;padding:10px 12px}
  .azb-foot textarea:focus{outline:none;border-color:#ffc94d}
  .azb-foot button{flex:none;width:46px;height:46px;border-radius:14px;border:0;background:#ffc94d;cursor:pointer;box-shadow:0 4px 0 #c7901c;display:grid;place-items:center}
  .azb-foot button:active{transform:translateY(3px);box-shadow:0 1px 0 #c7901c}
  .azb-foot button[disabled]{background:#2a3166;box-shadow:none;cursor:default}
  .azb-disc{padding:6px 12px 10px;background:#0b0f33;color:#8f95c2;font-size:.68rem;font-weight:700;text-align:center;line-height:1.35}
  .azb-disc a{color:#cfd3ef}
  @media (max-width:560px){
    .azb-panel:not(.azb-inline){right:0;left:0;bottom:0;width:100%;height:100%;border-radius:0}
    .azb-launch{width:64px;height:64px}
    .azb-tip{right:90px}
  }
  @media (prefers-reduced-motion:reduce){.azb-launch::after,.azb-msg{animation:none}}
  `;

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function link(url, text) { var a = el("a", null, text || url); a.href = url; a.target = "_blank"; a.rel = "noopener"; return a; }
  function rtl(s) { var a = (String(s).match(/[؀-ۿ]/g) || []).length; return a > (String(s).match(/[a-z]/gi) || []).length; }
  function face(host) { var f = el("div", "face"); host.appendChild(f); if (window.AZ && AZ.Kid) return new AZ.Kid(f, "girl"); return null; }

  function mount(opts) {
    opts = opts || {};
    if (!document.getElementById("azb-css")) { var st = el("style"); st.id = "azb-css"; st.textContent = css; document.head.appendChild(st); }
    var inline = !!opts.inline;

    var panel = el("section", "azb-panel" + (inline ? " azb-inline on" : ""));
    panel.setAttribute("role", inline ? "region" : "dialog");
    panel.setAttribute("aria-label", "Ask Zahra: Fiqh questions");
    var head = el("div", "azb-head");
    var av = el("div", "av"); head.appendChild(av);
    var t = el("div"); t.appendChild(el("b", null, "Ask Zahra")); t.appendChild(el("small", null, "Published answers of Ayatollah al-Sistani, from sistani.org")); head.appendChild(t);
    var close = el("button", "x", "×"); close.type = "button"; close.setAttribute("aria-label", "Close chat");
    if (!inline) head.appendChild(close);
    var body = el("div", "azb-body"); body.setAttribute("aria-live", "polite");
    var foot = el("form", "azb-foot");
    var ta = el("textarea"); ta.rows = 1; ta.maxLength = 600; ta.dir = "auto"; ta.placeholder = "Type your question…"; ta.setAttribute("aria-label", "Your question");
    var send = el("button"); send.type = "submit"; send.setAttribute("aria-label", "Send");
    send.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="#3a2600"><path d="M3 20l18-8L3 4v6l12 2-12 2z"/></svg>';
    foot.appendChild(ta); foot.appendChild(send);
    var disc = el("div", "azb-disc");
    disc.appendChild(document.createTextNode("Zahra shows official text only, not personal opinions or fatwas. For your own situation, consult the "));
    disc.appendChild(link(SEND_Q, "Office of Ayatollah Sistani")); disc.appendChild(document.createTextNode("."));
    panel.appendChild(head); panel.appendChild(body); panel.appendChild(foot); panel.appendChild(disc);
    (inline ? opts.inline : document.body).appendChild(panel);
    var zahra = face(av);

    var launch = null, tip = null;
    if (!inline) {
      launch = el("button", "azb-launch"); launch.type = "button"; launch.setAttribute("aria-label", "Ask Zahra a fiqh question"); launch.setAttribute("aria-expanded", "false");
      document.body.appendChild(launch); face(launch);
      tip = el("div", "azb-tip", "Have a fiqh question? Ask me!"); document.body.appendChild(tip);
      setTimeout(function () { if (!panel.classList.contains("on")) { tip.classList.add("on"); setTimeout(function () { tip.classList.remove("on"); }, 5000); } }, 2500);
      launch.onclick = function () { panel.classList.contains("on") ? hide() : show(); };
      close.onclick = hide;
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel.classList.contains("on")) hide(); });
    }
    function show() { panel.classList.add("on"); tip && tip.classList.remove("on"); launch.setAttribute("aria-expanded", "true"); setTimeout(function () { ta.focus(); }, 300); if (!body.children.length) greet(); }
    function hide() { panel.classList.remove("on"); launch.setAttribute("aria-expanded", "false"); launch.focus(); }

    function scroll() { body.scrollTop = body.scrollHeight; }
    function talk(ms) { if (zahra) { zahra.talk(true); setTimeout(function () { zahra.talk(false); }, ms || 1200); } }
    function botMsg(text) { var m = el("div", "azb-msg azb-bot"); if (text) { m.textContent = text; if (rtl(text)) m.dir = "rtl"; } body.appendChild(m); scroll(); talk(); return m; }

    function greet() {
      botMsg("Assalamu alaykum! I'm Zahra. Ask me a fiqh question in English, Urdu, Roman Urdu or Arabic, and I'll find Ayatollah al-Sistani's published answer on sistani.org for you.");
      var c = el("div", "azb-chips");
      ["Does sleep break wudu?", "Is shrimp halal?", "kya roze mein ulti se roza toot jata hai?", "کیا موسیقی سننا جائز ہے؟", "هل يجوز أكل الروبيان؟"].forEach(function (q) {
        var b = el("button", null, q); b.type = "button"; b.dir = "auto"; b.onclick = function () { ask(q); }; c.appendChild(b);
      });
      var holder = botMsg(""); holder.appendChild(el("div", null, "Try one of these:")); holder.appendChild(c);
      if (!API) botMsg("I'm still being connected to sistani.org. Very soon I'll be able to answer here.");
    }

    function card(m, i) {
      var cd = el("div", "azb-card");
      if (m.original_question) {
        var lq = el("span", "lab", "Official question"); cd.appendChild(lq);
        var oq = el("div", "oq", m.original_question); if (rtl(m.original_question)) oq.dir = "rtl"; cd.appendChild(oq);
      }
      var la = el("span", "lab", m.original_question ? "Official answer" : "Official ruling");
      if (m.match) { var tg = el("span", "azb-tag " + m.match, m.match === "close" ? "CLOSE MATCH" : "PARTLY MATCHES"); la.appendChild(tg); }
      cd.appendChild(la);
      var text = m.quote, long = text.length > 520;
      var bq = el("blockquote", null, long ? text.slice(0, 480) + "…" : text); if (rtl(text)) bq.dir = "rtl"; cd.appendChild(bq);
      if (long) { var mo = el("button", "more", "Show the full text"); mo.type = "button"; mo.onclick = function () { bq.textContent = text; mo.remove(); }; cd.appendChild(mo); }
      var src = el("div", "src"); src.appendChild(document.createTextNode(m.source.type + " · " + m.source.label + " · ")); src.appendChild(link(m.source.url, "Open on sistani.org ↗")); cd.appendChild(src);
      if (m.verified_at) cd.appendChild(el("span", "ok", "✓ Text verified on sistani.org"));
      return cd;
    }

    function render(r) {
      if (!r || r.status === "error") { botMsg((r && r.message) || "Sorry, I couldn't reach sistani.org just now. Please try again in a moment."); return; }
      if (r.status === "abstain") {
        var a = botMsg(ABSTAIN);
        var p = el("div", "azb-note"); p.appendChild(document.createTextNode("You can send your question to the Office: ")); p.appendChild(link(SEND_Q, "sistani.org · Send Question")); a.appendChild(p);
        return;
      }
      if (r.status === "clarify") {
        var c = botMsg("The ruling depends on your situation. Could you tell me:");
        var ul = el("ul"); (r.clarifying_questions || []).forEach(function (q) { ul.appendChild(el("li", null, q)); }); c.appendChild(ul);
        return;
      }
      var list = r.matches || (r.official || []).map(function (o) { return { quote: o.quote, original_question: o.original_question, source: o.source, verified_at: o.verified_at }; });
      var msg = botMsg(list.length > 1 ? "Here are the closest published answers I found:" : "Here is the closest published answer I found:");
      list.forEach(function (m, i) { msg.appendChild(card(m, i)); });
      if (r.explanation && r.explanation.length) {
        var ex = el("div", "azb-note"); ex.appendChild(el("b", null, "Simple explanation (AI, not a fatwa): ")); ex.appendChild(document.createTextNode(r.explanation.map(function (e) { return e.text; }).join(" "))); msg.appendChild(ex);
      }
      msg.appendChild(el("div", "azb-note", "Please read the official question and answer to check they match your situation before acting on them."));
      if (r.related && r.related.length) {
        var d = el("details", "azb-rel"); d.appendChild(el("summary", null, "Related rulings (" + r.related.length + ")"));
        var u = el("ul"); r.related.forEach(function (x) { var li = el("li"); var s = el("span", null, x.title + " "); if (rtl(x.title)) s.dir = "rtl"; li.appendChild(s); li.appendChild(link(x.source.url, "↗")); u.appendChild(li); });
        d.appendChild(u); msg.appendChild(d);
      }
      body.scrollTop = Math.max(0, msg.offsetTop - 10); // show the start of the answer
    }

    var busy = false;
    function ask(q) {
      q = String(q || "").trim();
      if (q.length < 3 || busy) return;
      var um = el("div", "azb-msg azb-user", q); if (rtl(q)) um.dir = "rtl"; body.appendChild(um); scroll();
      ta.value = ""; grow();
      if (!API) { botMsg("I'm still being connected to sistani.org. Please check back soon!"); return; }
      busy = true; send.disabled = true;
      var ty = el("div", "azb-typing"); ty.innerHTML = "<i></i><i></i><i></i><span>Searching sistani.org…</span>"; body.appendChild(ty); scroll();
      var steps = ["Searching sistani.org…", "Reading the official answers…", "Verifying the text…"], si = 0;
      var iv = setInterval(function () { si = Math.min(si + 1, steps.length - 1); ty.querySelector("span").textContent = steps[si]; }, 1800);
      fetch(API + "/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: q }) })
        .then(function (res) { return res.json().catch(function () { return { status: "error" }; }); })
        .catch(function () { return { status: "error" }; })
        .then(function (r) { clearInterval(iv); ty.remove(); busy = false; send.disabled = false; render(r); });
    }
    function grow() { ta.style.height = "auto"; ta.style.height = Math.min(120, ta.scrollHeight) + "px"; ta.dir = rtl(ta.value) ? "rtl" : "auto"; }
    ta.addEventListener("input", grow);
    ta.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(ta.value); } });
    foot.addEventListener("submit", function (e) { e.preventDefault(); ask(ta.value); });

    if (inline) greet();
    return { open: show, ask: ask };
  }

  window.AZFiqhBot = { mount: mount };
})();
