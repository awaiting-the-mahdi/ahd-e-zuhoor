/*
  AHD-E-ZUHOOR — Zahra & Ali
  Two animated guide characters, their voices (browser speech), a starfield,
  confetti and small sound effects. Shared by the language pages.
*/
(function () {
  "use strict";
  var AZ = (window.AZ = window.AZ || {});
  var TAU = Math.PI * 2;

  /* ---------------- styles ---------------- */
  var css = `
  :where(.kid){position:relative;display:block}
  .kid svg{width:100%;height:100%;display:block;overflow:visible}
  .kid .kb,.kid .kh,.kid .arm,.kid .eye,.kid .mo-open,.kid .kshadow,.kid .brow{transform-box:view-box}
  .kid .kb{transform-origin:100px 292px;animation:kidBob 2.6s ease-in-out infinite}
  .kid .kshadow{transform-origin:100px 294px;animation:kidShadow 2.6s ease-in-out infinite}
  .kid .kh{transform-origin:100px 168px;animation:kidTilt 5.5s ease-in-out infinite;transition:transform .3s}
  .kid .eye{transform-origin:center;transform-box:fill-box;transition:transform .08s}
  .kid.blink .eye{transform:scaleY(.08)}
  .kid .arm-r{transform-origin:134px 180px;transition:transform .45s cubic-bezier(.3,1.6,.4,1)}
  .kid .arm-l{transform-origin:66px 180px;transition:transform .45s cubic-bezier(.3,1.6,.4,1)}
  .kid .mo-open{transform-origin:100px 140px;transform:scaleY(0);transition:transform .07s}
  .kid .mo-smile{transition:opacity .1s}
  .kid .mo-sad{opacity:0}
  .kid.talking .mo-smile{opacity:0}
  .kid.talking .kh{animation:kidNod .42s ease-in-out infinite alternate}
  .kid.wave .arm-r{animation:kidWave .42s ease-in-out infinite alternate}
  .kid.point .arm-r{transform:rotate(-95deg)}
  .kid.think .arm-r{transform:rotate(-158deg) translate(-6px,4px)}
  .kid.think .brow-l{transform:translateY(-4px) rotate(-8deg)}
  .kid.cheer .arm-r{transform:rotate(-150deg)}
  .kid.cheer .arm-l{transform:rotate(150deg)}
  .kid.cheer .kb{animation:kidHop .5s ease-in-out infinite alternate}
  .kid.sad .mo-smile{opacity:0}
  .kid.sad .mo-sad{opacity:1}
  .kid.sad .brow-l{transform:rotate(12deg)}
  .kid.sad .brow-r{transform:rotate(-12deg)}
  .kid.sad .kh{transform:translateY(4px) rotate(-3deg);animation:none}
  .kid .brow{transform-origin:center;transform-box:fill-box;transition:transform .3s}
  .kid.jump .kb{animation:kidJump .7s cubic-bezier(.3,.8,.4,1)}
  .kid.pop{animation:kidPop .9s cubic-bezier(.2,1.6,.4,1) both}
  @keyframes kidBob{0%,100%{transform:translateY(0) scale(1,1)}50%{transform:translateY(-5px) scale(.99,1.015)}}
  @keyframes kidShadow{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(.9);opacity:.35}}
  @keyframes kidTilt{0%,100%{transform:rotate(0)}30%{transform:rotate(-3deg)}70%{transform:rotate(3deg)}}
  @keyframes kidNod{from{transform:rotate(-2deg) translateY(0)}to{transform:rotate(2deg) translateY(1.5px)}}
  @keyframes kidWave{from{transform:rotate(-155deg)}to{transform:rotate(-120deg)}}
  @keyframes kidHop{from{transform:translateY(0)}to{transform:translateY(-14px)}}
  @keyframes kidJump{0%{transform:translateY(0) scale(1.06,.92)}35%{transform:translateY(-34px) scale(.95,1.06)}70%{transform:translateY(0) scale(1.05,.94)}100%{transform:none}}
  @keyframes kidPop{0%{transform:scale(0) translateY(60px);opacity:0}100%{transform:none;opacity:1}}
  @media (prefers-reduced-motion:reduce){.kid *{animation:none!important}}
  `;
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var uid = 0;

  /* ---------------- character drawing ---------------- */
  function kidSVG(type) {
    var g = type === "girl", id = "k" + uid++;
    var skin = g ? ["#ffe8d6", "#f6c6a2", "#d99a76"] : ["#ffe4cc", "#f2bf98", "#d49470"];
    var navy = ["#34407a", "#1f2752", "#10142f"];
    var gold = "#d9b45f";
    function star(x, y, r, fill) {
      var d = "";
      for (var k = 0; k < 8; k++) { var a = k / 8 * Math.PI * 2 - Math.PI / 2, rr = k % 2 ? r * 0.42 : r; d += (k ? "L" : "M") + (x + Math.cos(a) * rr).toFixed(1) + " " + (y + Math.sin(a) * rr).toFixed(1); }
      return '<path d="' + d + 'Z" fill="' + (fill || gold) + '"/>';
    }
    var s = '<svg viewBox="0 0 200 300" aria-hidden="true"><defs>' +
      '<radialGradient id="' + id + 's" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="' + skin[0] + '"/><stop offset=".65" stop-color="' + skin[1] + '"/><stop offset="1" stop-color="' + skin[2] + '"/></radialGradient>' +
      '<linearGradient id="' + id + 'n" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="' + navy[0] + '"/><stop offset=".55" stop-color="' + navy[1] + '"/><stop offset="1" stop-color="' + navy[2] + '"/></linearGradient>' +
      '<linearGradient id="' + id + 'c" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset=".6" stop-color="#f3e7cf"/><stop offset="1" stop-color="#d9c7a3"/></linearGradient>' +
      '<radialGradient id="' + id + 'i" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#a8733f"/><stop offset=".7" stop-color="#5a3414"/><stop offset="1" stop-color="#1e0f05"/></radialGradient>' +
      '<linearGradient id="' + id + 'r" x1="0" y1="0" x2=".2" y2="1"><stop offset="0" stop-color="#7a4b2c"/><stop offset=".6" stop-color="#4f2f1a"/><stop offset="1" stop-color="#2e1a0d"/></linearGradient>' +
      '<linearGradient id="' + id + 'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6436"/><stop offset="1" stop-color="#5e3a1d"/></linearGradient>' +
      '<linearGradient id="' + id + 'w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e6ecf5"/></linearGradient>' +
      '</defs>';

    s += '<ellipse class="kshadow" cx="100" cy="294" rx="48" ry="7" fill="#000" opacity=".5"/>';
    s += '<g class="kb">';

    if (g) {
      /* ---- Zahra: navy star hijab, cream embroidered dress, holding a book ---- */
      s += '<path d="M30 104 Q22 176 40 244 Q100 266 160 244 Q178 176 170 104 Z" fill="url(#' + id + 'n)"/>';
      s += '<path d="M40 240 Q100 260 160 240" stroke="' + gold + '" stroke-width="1.4" fill="none" stroke-dasharray="3 4" opacity=".8"/>';
      [[44, 200, 3], [156, 196, 3.4], [52, 160, 2.2], [150, 150, 2.4], [40, 226, 2]].forEach(function (p) { s += star(p[0], p[1], p[2]); });
      // shoes
      s += '<ellipse cx="88" cy="287" rx="13" ry="6.5" fill="#3a3040"/><ellipse cx="112" cy="287" rx="13" ry="6.5" fill="#3a3040"/>' +
           '<ellipse cx="86" cy="285" rx="6" ry="2" fill="#fff" opacity=".25"/><ellipse cx="110" cy="285" rx="6" ry="2" fill="#fff" opacity=".25"/>';
      // dress
      s += '<path d="M66 176 Q100 166 134 176 L158 278 Q100 292 42 278 Z" fill="url(#' + id + 'c)"/>' +
           '<path d="M50 262 Q100 274 150 262" stroke="' + gold + '" stroke-width="2" fill="none"/>' +
           '<path d="M47 270 Q100 283 153 270" stroke="' + gold + '" stroke-width="1.2" fill="none" stroke-dasharray="2 3"/>';
      [64, 82, 100, 118, 136].forEach(function (x, k) {
        s += '<path d="M' + x + ' 262 Q' + (x - 4) + ' 250 ' + x + ' 242 Q' + (x + 4) + ' 250 ' + x + ' 262" stroke="' + gold + '" stroke-width="1.3" fill="none"/>' + star(x, 236 - (k % 2) * 4, 3.2);
      });
      s += star(88, 214, 2.6) + star(114, 222, 2.4);
      // hijab drapes in front of shoulders
      s += '<path d="M50 146 Q38 200 48 242 L66 236 Q60 198 72 166 Z" fill="url(#' + id + 'n)"/>' +
           '<path d="M150 146 Q162 200 152 242 L134 236 Q140 198 128 166 Z" fill="url(#' + id + 'n)"/>' +
           '<path d="M66 236 Q60 198 72 166 M134 236 Q140 198 128 166" stroke="' + gold + '" stroke-width="1.3" fill="none" stroke-dasharray="3 3"/>';
      s += star(56, 214, 2.4) + star(146, 206, 2.2);
      // right arm (waves)
      s += '<g class="arm arm-r"><path d="M134 180 Q146 206 142 232" stroke="url(#' + id + 'c)" stroke-width="17" stroke-linecap="round" fill="none"/>' +
           '<path d="M137 222 L147 224" stroke="' + gold + '" stroke-width="2"/><circle cx="142" cy="236" r="9" fill="url(#' + id + 's)"/></g>';
      // left arm holds the book against her chest
      s += '<g class="arm arm-l"><path d="M66 180 Q60 206 84 216" stroke="url(#' + id + 'c)" stroke-width="17" stroke-linecap="round" fill="none"/>' +
           '<g transform="rotate(-8 100 210)"><rect x="80" y="186" width="40" height="52" rx="3" fill="#1d2550" stroke="' + gold + '" stroke-width="1.6"/>' +
           '<rect x="85" y="191" width="30" height="42" rx="2" fill="none" stroke="' + gold + '" stroke-width=".8" opacity=".8"/>' +
           '<circle cx="100" cy="212" r="8" fill="none" stroke="' + gold + '" stroke-width="1.2"/>' + star(100, 212, 5) +
           '<rect x="80" y="186" width="5" height="52" fill="#141a3a"/></g>' +
           '<circle cx="88" cy="216" r="8.5" fill="url(#' + id + 's)"/><circle cx="112" cy="222" r="8" fill="url(#' + id + 's)"/></g>';
    } else {
      /* ---- Ali: tousled hair, navy jacket over cream kurta, backpack ---- */
      s += '<rect x="48" y="170" width="104" height="74" rx="18" fill="url(#' + id + 'b)"/>' +
           '<rect x="54" y="210" width="20" height="26" rx="6" fill="#5e3a1d"/><rect x="126" y="210" width="20" height="26" rx="6" fill="#5e3a1d"/>';
      s += '<rect x="80" y="234" width="18" height="50" rx="8" fill="url(#' + id + 'n)"/><rect x="102" y="234" width="18" height="50" rx="8" fill="url(#' + id + 'n)"/>';
      s += '<ellipse cx="88" cy="285" rx="15" ry="8" fill="#6b3f1f"/><ellipse cx="112" cy="285" rx="15" ry="8" fill="#6b3f1f"/>' +
           '<ellipse cx="85" cy="282" rx="7" ry="2.4" fill="#fff" opacity=".3"/><ellipse cx="109" cy="282" rx="7" ry="2.4" fill="#fff" opacity=".3"/>';
      s += '<g class="arm arm-l"><path d="M66 180 Q54 206 58 232" stroke="url(#' + id + 'n)" stroke-width="18" stroke-linecap="round" fill="none"/>' +
           '<path d="M52 224 L64 226" stroke="' + gold + '" stroke-width="2"/><circle cx="58" cy="236" r="9" fill="url(#' + id + 's)"/></g>';
      // kurta
      s += '<path d="M64 172 Q100 162 136 172 L142 256 Q100 266 58 256 Z" fill="url(#' + id + 'c)"/>' +
           '<path d="M100 168 L100 212" stroke="' + gold + '" stroke-width="1.6"/>' +
           '<path d="M96 172 L104 178 L96 184 L104 190 L96 196 L104 202 L96 208" stroke="' + gold + '" stroke-width="1" fill="none"/>' +
           '<path d="M62 250 Q100 260 138 250" stroke="' + gold + '" stroke-width="1.2" fill="none" stroke-dasharray="2 3"/>';
      // jacket panels
      s += '<path d="M60 172 Q76 164 88 167 L86 240 Q70 241 56 236 Z" fill="url(#' + id + 'n)"/>' +
           '<path d="M140 172 Q124 164 112 167 L114 240 Q130 241 144 236 Z" fill="url(#' + id + 'n)"/>' +
           '<path d="M88 167 L86 240 M112 167 L114 240" stroke="' + gold + '" stroke-width="1.6"/>' +
           star(126, 190, 5.2);
      // backpack straps + collar
      s += '<path d="M70 170 Q74 200 70 232 M130 170 Q126 200 130 232" stroke="#7a4a25" stroke-width="6" fill="none" stroke-linecap="round"/>' +
           '<rect x="66" y="196" width="9" height="7" rx="2" fill="#c9a24e"/><rect x="125" y="196" width="9" height="7" rx="2" fill="#c9a24e"/>' +
           '<path d="M86 165 Q100 173 114 165" stroke="#f3e7cf" stroke-width="6" fill="none" stroke-linecap="round"/>' +
           '<path d="M86 162 Q100 170 114 162" stroke="' + gold + '" stroke-width="1.2" fill="none"/>';
      s += '<g class="arm arm-r"><path d="M134 180 Q146 206 142 232" stroke="url(#' + id + 'n)" stroke-width="18" stroke-linecap="round" fill="none"/>' +
           '<path d="M136 224 L148 222" stroke="' + gold + '" stroke-width="2"/><circle cx="142" cy="236" r="9" fill="url(#' + id + 's)"/></g>';
    }

    // ---- head ----
    s += '<g class="kh">';
    if (g) {
      s += '<circle cx="100" cy="102" r="68" fill="url(#' + id + 'n)"/>' +
           '<path d="M46 76 Q66 40 110 36" stroke="#5a6aa8" stroke-opacity=".55" stroke-width="7" fill="none" stroke-linecap="round"/>';
      [[64, 52, 2.6], [136, 54, 3], [150, 92, 2.2], [48, 120, 2.4], [118, 40, 2]].forEach(function (p) { s += star(p[0], p[1], p[2]); });
      s += '<ellipse cx="100" cy="110" rx="51" ry="54" fill="url(#' + id + 's)"/>' +
           '<path d="M56 96 Q100 56 144 96 Q122 80 100 82 Q78 80 56 96Z" fill="#3a2213"/>' +
           '<ellipse cx="100" cy="108" rx="53" ry="57" fill="none" stroke="url(#' + id + 'n)" stroke-width="7"/>' +
           '<ellipse cx="100" cy="108" rx="49.5" ry="53.5" fill="none" stroke="' + gold + '" stroke-width="1" stroke-dasharray="3 4" opacity=".7"/>';
    } else {
      s += '<rect x="90" y="150" width="20" height="20" rx="6" fill="' + skin[1] + '"/>' +
           '<circle cx="43" cy="114" r="11" fill="url(#' + id + 's)"/><circle cx="157" cy="114" r="11" fill="url(#' + id + 's)"/>' +
           '<circle cx="43" cy="114" r="5" fill="' + skin[2] + '" opacity=".5"/><circle cx="157" cy="114" r="5" fill="' + skin[2] + '" opacity=".5"/>' +
           '<circle cx="100" cy="106" r="58" fill="url(#' + id + 's)"/>' +
           '<path d="M40 114 Q28 62 66 40 Q98 20 134 36 Q172 54 162 114 Q158 92 148 82 Q150 98 140 100 Q134 78 114 72 Q120 90 104 94 Q98 72 80 74 Q86 90 70 96 Q62 82 54 88 Q46 98 40 114Z" fill="url(#' + id + 'r)"/>' +
           '<path d="M52 92 Q62 58 100 56 Q140 56 152 90 Q138 74 120 74 Q110 88 92 82 Q76 92 60 86 Q56 90 52 92Z" fill="url(#' + id + 'r)"/>' +
           '<path d="M62 46 Q74 30 92 34 Q108 22 126 32 Q144 36 150 54" stroke="url(#' + id + 'r)" stroke-width="10" fill="none" stroke-linecap="round"/>' +
           '<path d="M70 56 Q92 44 120 50 M60 72 Q72 60 88 62 M118 60 Q138 60 148 76" stroke="#a5754d" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".75"/>';
    }
    s += '<path d="M' + (g ? "56 136 Q50 112 56 88" : "50 136 Q44 108 52 86") + '" stroke="#fff" stroke-opacity=".28" stroke-width="3" fill="none" stroke-linecap="round"/>';
    s += '<ellipse cx="70" cy="132" rx="11" ry="7" fill="#ff7a8a" opacity=".36"/><ellipse cx="130" cy="132" rx="11" ry="7" fill="#ff7a8a" opacity=".36"/>';
    [78, 122].forEach(function (x, k) {
      s += '<g class="eye">' +
        '<ellipse cx="' + x + '" cy="112" rx="14.5" ry="17" fill="url(#' + id + 'w)"/>' +
        '<g class="pupil"><circle cx="' + x + '" cy="114" r="11" fill="url(#' + id + 'i)"/><circle cx="' + x + '" cy="115" r="5.2" fill="#120a05"/>' +
        '<circle cx="' + (x + 3.6) + '" cy="109" r="3.8" fill="#fff"/><circle cx="' + (x - 3.6) + '" cy="119" r="1.7" fill="#fff" opacity=".85"/></g>' +
        '<path d="M' + (x - 15) + ' 108 Q' + x + ' 91 ' + (x + 15) + ' 108" stroke="#2b1a10" stroke-width="3.6" fill="none" stroke-linecap="round"/>' +
        (g ? '<path d="M' + (k ? x + 14 : x - 14) + ' 104 l' + (k ? 6 : -6) + ' -5 M' + (k ? x + 11 : x - 11) + ' 99 l' + (k ? 4 : -4) + ' -6 M' + (k ? x + 6 : x - 6) + ' 96 l' + (k ? 2 : -2) + ' -6" stroke="#2b1a10" stroke-width="2.2" stroke-linecap="round"/>' : "") +
        '</g>';
    });
    var bc = g ? "#4a2a14" : "#3a2213";
    s += '<path class="brow brow-l" d="M65 88 Q78 79 91 85" stroke="' + bc + '" stroke-width="' + (g ? 3.4 : 4.6) + '" fill="none" stroke-linecap="round"/>' +
         '<path class="brow brow-r" d="M109 85 Q122 79 135 88" stroke="' + bc + '" stroke-width="' + (g ? 3.4 : 4.6) + '" fill="none" stroke-linecap="round"/>';
    s += '<ellipse cx="100" cy="128" rx="5.5" ry="3.8" fill="' + skin[2] + '" opacity=".45"/><ellipse cx="98.5" cy="126.5" rx="2" ry="1.2" fill="#fff" opacity=".5"/>';
    s += '<path class="mo-smile" d="M87 140 Q100 152 113 140" stroke="#8a2f22" stroke-width="3.6" fill="none" stroke-linecap="round"/>' +
         '<path class="mo-sad" d="M88 148 Q100 138 112 148" stroke="#8a2f22" stroke-width="3.6" fill="none" stroke-linecap="round"/>' +
         '<g class="mo-open"><path d="M85 137 Q100 164 115 137 Q100 141 85 137Z" fill="#6b1e1e"/>' +
         '<path d="M88 138 L112 138 L110 142 Q100 144 90 142Z" fill="#fff"/>' +
         '<ellipse cx="100" cy="153" rx="8" ry="4.5" fill="#ff8a8a"/></g>';
    s += '</g></g></svg>';
    return s;
  }

  /* ---------------- Kid controller ---------------- */
  var allKids = [];
  function Kid(el, type) {
    this.el = el;
    this.type = type;
    el.classList.add("kid", "kid-" + type);
    el.innerHTML = kidSVG(type);
    this.mouth = el.querySelector(".mo-open");
    this.pupils = el.querySelectorAll(".pupil");
    this._talk = null;
    this._state = "";
    allKids.push(this);
    var self = this;
    (function blink() {
      setTimeout(function () {
        el.classList.add("blink");
        setTimeout(function () { el.classList.remove("blink"); blink(); }, 130);
      }, 1800 + Math.random() * 3200);
    })();
  }
  Kid.prototype.talk = function (on) {
    var self = this;
    clearInterval(this._talk);
    if (on) {
      this.el.classList.add("talking");
      this._talk = setInterval(function () {
        self.mouth.style.transform = "scaleY(" + (0.25 + Math.random() * 0.8).toFixed(2) + ")";
      }, 95);
    } else {
      this.el.classList.remove("talking");
      this.mouth.style.transform = "";
    }
  };
  Kid.prototype.set = function (state) {
    if (this._state) this.el.classList.remove(this._state);
    this._state = state || "";
    if (state) this.el.classList.add(state);
  };
  Kid.prototype.flash = function (cls, ms) {
    var el = this.el;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
    setTimeout(function () { el.classList.remove(cls); }, ms || 700);
  };
  Kid.prototype.jump = function () { this.flash("jump", 720); };
  Kid.prototype.look = function (dx, dy) {
    var t = "translate(" + dx.toFixed(2) + "px," + dy.toFixed(2) + "px)";
    this.pupils.forEach(function (p) { p.style.transform = t; });
  };
  AZ.Kid = Kid;

  // eyes follow the pointer
  addEventListener("pointermove", function (e) {
    allKids.forEach(function (k) {
      var r = k.el.getBoundingClientRect();
      if (!r.width) return;
      var cx = r.left + r.width / 2, cy = r.top + r.height * 0.36;
      var dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy) || 1;
      var m = Math.min(1, d / 300) * 3.6;
      var flip = getComputedStyle(k.el).transform.indexOf("matrix(-1") === 0 ? -1 : 1;
      k.look(dx / d * m * flip, dy / d * m);
    });
  }, { passive: true });

  /* ---------------- voices ---------------- */
  var synth = window.speechSynthesis || null;
  var voices = [];
  function loadVoices() { if (synth) voices = synth.getVoices() || []; }
  loadVoices();
  if (synth && "onvoiceschanged" in synth) synth.onvoiceschanged = loadVoices;

  var muted = false;
  try { muted = localStorage.getItem("az-muted") === "1"; } catch (e) {}

  function pick(lang, gender) {
    if (!voices.length) loadVoices();
    var base = lang.split("-")[0].toLowerCase();
    var list = voices.filter(function (v) { return (v.lang || "").toLowerCase().replace("_", "-").indexOf(base) === 0; });
    if (!list.length) return null;
    var exact = list.filter(function (v) { return (v.lang || "").toLowerCase().replace("_", "-") === lang.toLowerCase(); });
    if (exact.length) list = exact.concat(list);
    if (gender) {
      var want = gender === "girl"
        ? /female|woman|girl|child|kid|samantha|victoria|karen|moira|tessa|serena|zira|aria|jenny|ana|libby|sonia|maisie|zariyah|amina|salma|laila|mona|dilara|uzma|gul|google uk english female|google us english/i
        : /male|man|boy|child|kid|daniel|alex|fred|oliver|guy|ryan|david|mark|thomas|hamed|majed|maged|tarik|naayf|farid|asad|salman|google uk english male/i;
      var avoid = gender === "girl" ? /\bmale\b|\bman\b/i : /female|woman/i;
      var hit = list.filter(function (v) { return want.test(v.name) && !avoid.test(v.name); });
      var kidV = hit.filter(function (v) { return /child|kid|ana\b|maisie/i.test(v.name); });
      if (kidV.length) return kidV[0];
      var natural = hit.filter(function (v) { return /natural|neural|online|premium|enhanced/i.test(v.name); });
      if (natural.length) return natural[0];
      if (hit.length) return hit[0];
    }
    var nat = list.filter(function (v) { return /natural|neural|online|premium|enhanced|google/i.test(v.name); });
    return nat[0] || list[0];
  }
  AZ.hasVoice = function (lang) { return !!pick(lang); };

  AZ.voice = {
    get muted() { return muted; },
    setMuted: function (m) {
      muted = !!m;
      try { localStorage.setItem("az-muted", muted ? "1" : "0"); } catch (e) {}
      if (muted && synth) synth.cancel();
    },
    stop: function () { if (synth) synth.cancel(); },
    /* say(text, {who:"girl"|"boy", lang:"en-GB", kid:Kid}) -> Promise */
    say: function (text, o) {
      o = o || {};
      var kid = o.kid, lang = o.lang || "en-GB", who = o.who || (kid && kid.type) || "girl";
      var est = Math.max(900, text.length * 62 + 500);
      return new Promise(function (res) {
        var done = false;
        function fin() { if (done) return; done = true; if (kid) kid.talk(false); res(); }
        if (kid) kid.talk(true);
        if (muted || !synth) { setTimeout(fin, muted ? est * 0.8 : est); return; }
        var u = new SpeechSynthesisUtterance(text);
        var v = pick(lang, who);
        if (v) u.voice = v;
        u.lang = v ? v.lang : lang;
        var isEn = lang.indexOf("en") === 0;
        u.pitch = who === "girl" ? 1.85 : 1.6;
        u.rate = (isEn ? 1.0 : 0.86) * (o.slow ? 0.7 : 1);
        u.onend = fin;
        u.onerror = fin;
        setTimeout(fin, est * 2.6 + 2500);
        try { synth.speak(u); } catch (e) { setTimeout(fin, est); }
      });
    }
  };
  AZ.plain = function (s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[ʿʾ']/g, "").replace(/-/g, "");
  };

  /* ---------------- sound effects ---------------- */
  var ac = null;
  function tone(freqs, dur, type, vol) {
    if (muted) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      var t = ac.currentTime;
      freqs.forEach(function (f, i) {
        var o = ac.createOscillator(), g = ac.createGain();
        o.type = type || "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0, t + i * dur * 0.6);
        g.gain.linearRampToValueAtTime(vol || 0.12, t + i * dur * 0.6 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + i * dur * 0.6 + dur);
        o.connect(g); g.connect(ac.destination);
        o.start(t + i * dur * 0.6); o.stop(t + i * dur * 0.6 + dur + 0.05);
      });
    } catch (e) {}
  }
  AZ.sfx = {
    tap: function () { tone([660], 0.08, "triangle", 0.06); },
    good: function () { tone([660, 880, 1175], 0.16, "sine", 0.13); },
    bad: function () { tone([300, 220], 0.2, "triangle", 0.1); },
    win: function () { tone([523, 659, 784, 1047, 1319], 0.18, "sine", 0.12); }
  };

  /* ---------------- starfield ---------------- */
  AZ.starfield = function (cv) {
    var ctx = cv.getContext("2d"), W, H, DPR, stars = [], shoots = [], t = 0, tS = 2;
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function rs() {
      DPR = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR; stars = [];
      var n = Math.min(420, W * H / 3200 | 0);
      for (var i = 0; i < n; i++) stars.push({ x: Math.random() * W, y: Math.random() * H, z: Math.random(), p: Math.random() * TAU,
        c: ["255,255,255", "200,222,255", "255,232,196", "255,205,220"][Math.random() * 4 | 0] });
    }
    function fr() {
      t += 0.016;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i], a = (0.3 + 0.7 * s.z) * (0.5 + 0.5 * Math.sin(t * (1 + s.z * 2) + s.p));
        var y = (s.y - t * 4 * s.z + H) % H;
        ctx.fillStyle = "rgba(" + s.c + "," + a.toFixed(2) + ")";
        var r = 0.5 + s.z * 1.4;
        ctx.beginPath(); ctx.arc(s.x, y, r, 0, TAU); ctx.fill();
        if (s.z > 0.93) { ctx.fillRect(s.x - r * 4, y - 0.3, r * 8, 0.6); ctx.fillRect(s.x - 0.3, y - r * 4, 0.6, r * 8); }
      }
      tS -= 0.016;
      if (tS < 0) { tS = 2 + Math.random() * 4; shoots.push({ x: Math.random() * W, y: Math.random() * H * 0.5, vx: 9 + Math.random() * 6, vy: 4 + Math.random() * 3, l: 1 }); }
      for (i = shoots.length - 1; i >= 0; i--) {
        var sh = shoots[i]; sh.x += sh.vx; sh.y += sh.vy; sh.l -= 0.02;
        var g = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 9, sh.y - sh.vy * 9);
        g.addColorStop(0, "rgba(255,255,255," + sh.l + ")"); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(sh.x - sh.vx * 9, sh.y - sh.vy * 9); ctx.stroke();
        if (sh.l <= 0) shoots.splice(i, 1);
      }
      if (!reduce) requestAnimationFrame(fr);
    }
    rs(); addEventListener("resize", rs); fr();
  };

  /* ---------------- confetti ---------------- */
  AZ.confetti = function (n) {
    var cv = document.createElement("canvas");
    cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
    document.body.appendChild(cv);
    var ctx = cv.getContext("2d"), W = cv.width = innerWidth, H = cv.height = innerHeight, ps = [];
    var cols = ["#3fd0b5", "#ffc94d", "#ff7a8a", "#a78bfa", "#5ab0ff", "#fff"];
    for (var i = 0; i < (n || 160); i++) ps.push({ x: W / 2 + (Math.random() - 0.5) * 120, y: H * 0.45, vx: (Math.random() - 0.5) * 18, vy: -Math.random() * 18 - 6,
      r: Math.random() * TAU, vr: (Math.random() - 0.5) * 0.4, w: 6 + Math.random() * 6, h: 3 + Math.random() * 5, c: cols[Math.random() * cols.length | 0], star: Math.random() < 0.3 });
    var f = 0;
    (function fr() {
      ctx.clearRect(0, 0, W, H); f++;
      ps.forEach(function (p) {
        p.vy += 0.45; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
        if (p.star) { ctx.beginPath(); for (var k = 0; k < 10; k++) { var rr = k % 2 ? 3 : 7, a = k / 10 * TAU; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.fill(); }
        else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (f < 200) requestAnimationFrame(fr); else cv.remove();
    })();
  };

  /* ---------------- helpers ---------------- */
  AZ.store = {
    get: function (k, d) { try { var v = localStorage.getItem("az-" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("az-" + k, JSON.stringify(v)); } catch (e) {} }
  };
  AZ.shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.random() * (i + 1) | 0; var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  AZ.sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
})();
