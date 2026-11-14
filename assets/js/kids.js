/*
  AHD-E-ZUHOOR — Noor & Rayan
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
    var skin = g ? ["#ffe0c4", "#f2b48c", "#d98d66"] : ["#f8d2ac", "#e0a77c", "#c4835a"];
    var outfit = g ? ["#8ef0d4", "#2fb59a", "#1c7f6c"] : ["#ffc65c", "#f08a24", "#b85f10"];
    var hijab = ["#e9ddff", "#b49cf5", "#7f62d6"];
    var s = '<svg viewBox="0 0 200 300" aria-hidden="true"><defs>' +
      '<radialGradient id="' + id + 's" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="' + skin[0] + '"/><stop offset=".65" stop-color="' + skin[1] + '"/><stop offset="1" stop-color="' + skin[2] + '"/></radialGradient>' +
      '<linearGradient id="' + id + 'o" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="' + outfit[0] + '"/><stop offset=".6" stop-color="' + outfit[1] + '"/><stop offset="1" stop-color="' + outfit[2] + '"/></linearGradient>' +
      '<radialGradient id="' + id + 'h" cx=".4" cy=".3" r=".85"><stop offset="0" stop-color="' + hijab[0] + '"/><stop offset=".6" stop-color="' + hijab[1] + '"/><stop offset="1" stop-color="' + hijab[2] + '"/></radialGradient>' +
      '<radialGradient id="' + id + 'i" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="' + (g ? "#b07a3f" : "#8a5a2b") + '"/><stop offset=".7" stop-color="' + (g ? "#5a3414" : "#4a2a10") + '"/><stop offset="1" stop-color="#1e0f05"/></radialGradient>' +
      '<radialGradient id="' + id + 'c" cx=".4" cy=".25" r=".9"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f1ede4"/><stop offset="1" stop-color="#cfc6b3"/></radialGradient>' +
      '<linearGradient id="' + id + 'w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e6ecf5"/></linearGradient>' +
      '</defs>';

    s += '<ellipse class="kshadow" cx="100" cy="294" rx="48" ry="7" fill="#000" opacity=".5"/>';
    s += '<g class="kb">';
    // legs + shoes
    if (g) {
      s += '<rect x="84" y="258" width="13" height="26" rx="6" fill="#6b5cc4"/><rect x="103" y="258" width="13" height="26" rx="6" fill="#6b5cc4"/>';
    } else {
      s += '<rect x="80" y="236" width="17" height="48" rx="8" fill="#34407a"/><rect x="103" y="236" width="17" height="48" rx="8" fill="#34407a"/>';
    }
    s += '<ellipse cx="88" cy="285" rx="14" ry="7.5" fill="#e8e3ff"/><ellipse cx="112" cy="285" rx="14" ry="7.5" fill="#e8e3ff"/>' +
         '<ellipse cx="88" cy="283" rx="10" ry="3" fill="#fff" opacity=".7"/><ellipse cx="112" cy="283" rx="10" ry="3" fill="#fff" opacity=".7"/>';
    // back arm (left)
    s += '<g class="arm arm-l"><path d="M66 180 Q54 206 58 232" stroke="url(#' + id + 'o)" stroke-width="18" stroke-linecap="round" fill="none"/>' +
         '<circle cx="58" cy="236" r="9.5" fill="url(#' + id + 's)"/></g>';
    // torso
    if (g) {
      s += '<path d="M64 170 Q100 158 136 170 L156 266 Q100 280 44 266 Z" fill="url(#' + id + 'o)"/>' +
           '<path d="M50 252 Q100 266 150 252" stroke="#fff" stroke-opacity=".55" stroke-width="3" fill="none" stroke-dasharray="1 7" stroke-linecap="round"/>' +
           '<path d="M70 176 Q66 220 60 262" stroke="#fff" stroke-opacity=".18" stroke-width="6" fill="none"/>';
    } else {
      s += '<path d="M62 172 Q100 160 138 172 L146 250 Q100 262 54 250 Z" fill="url(#' + id + 'o)"/>' +
           '<path d="M100 170 L100 214" stroke="' + outfit[2] + '" stroke-width="2.5"/>' +
           '<circle cx="100" cy="184" r="2.6" fill="#fff6dd"/><circle cx="100" cy="196" r="2.6" fill="#fff6dd"/><circle cx="100" cy="208" r="2.6" fill="#fff6dd"/>' +
           '<path d="M86 166 Q100 176 114 166" stroke="' + outfit[2] + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
           '<path d="M68 178 Q64 214 60 246" stroke="#fff" stroke-opacity=".2" stroke-width="6" fill="none"/>';
    }
    // front arm (right)
    s += '<g class="arm arm-r"><path d="M134 180 Q146 206 142 232" stroke="url(#' + id + 'o)" stroke-width="18" stroke-linecap="round" fill="none"/>' +
         '<circle cx="142" cy="236" r="9.5" fill="url(#' + id + 's)"/><ellipse cx="139" cy="232" rx="3" ry="2" fill="#fff" opacity=".35"/></g>';

    // head
    s += '<g class="kh">';
    if (g) {
      s += '<path d="M33 104 Q28 168 56 194 Q100 216 144 194 Q172 168 167 104 Z" fill="url(#' + id + 'h)"/>' +
           '<path d="M44 176 Q100 206 156 176" stroke="' + hijab[2] + '" stroke-opacity=".35" stroke-width="3" fill="none" stroke-linecap="round"/>' +
           '<circle cx="100" cy="102" r="70" fill="url(#' + id + 'h)"/>' +
           '<path d="M44 84 Q60 40 104 34" stroke="#fff" stroke-opacity=".4" stroke-width="6" fill="none" stroke-linecap="round"/>' +
           '<ellipse cx="100" cy="110" rx="52" ry="55" fill="url(#' + id + 's)"/>' +
           '<path d="M48 104 Q52 58 100 54 Q148 58 152 104" stroke="' + hijab[2] + '" stroke-opacity=".55" stroke-width="5" fill="none"/>' +
           '<circle cx="146" cy="150" r="4.5" fill="#ffd36b"/><circle cx="145" cy="149" r="1.6" fill="#fff"/>';
    } else {
      s += '<rect x="90" y="150" width="20" height="20" rx="6" fill="' + skin[1] + '"/>' +
           '<circle cx="43" cy="114" r="11" fill="url(#' + id + 's)"/><circle cx="157" cy="114" r="11" fill="url(#' + id + 's)"/>' +
           '<circle cx="43" cy="114" r="5" fill="' + skin[2] + '" opacity=".5"/><circle cx="157" cy="114" r="5" fill="' + skin[2] + '" opacity=".5"/>' +
           '<circle cx="100" cy="106" r="58" fill="url(#' + id + 's)"/>' +
           '<path d="M44 106 Q40 52 100 46 Q160 52 156 106 Q150 84 134 78 Q120 92 98 82 Q78 94 62 82 Q48 92 44 106Z" fill="#3a2416"/>' +
           '<path d="M70 70 Q86 62 104 66" stroke="#6a4630" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>' +
           '<path d="M50 74 Q56 32 100 28 Q144 32 150 74 Q100 60 50 74Z" fill="url(#' + id + 'c)"/>' +
           '<path d="M50 74 Q100 60 150 74 L150 66 Q100 52 50 66Z" fill="#e8c77d"/>' +
           '<path d="M60 64 Q100 50 140 64" stroke="#fff" stroke-width="1.6" stroke-dasharray="2 4" fill="none" opacity=".8"/>';
    }
    // rim light
    s += '<path d="M' + (g ? "56 136 Q50 112 56 88" : "50 136 Q44 108 52 86") + '" stroke="#fff" stroke-opacity=".28" stroke-width="3" fill="none" stroke-linecap="round"/>';
    // cheeks
    s += '<ellipse cx="70" cy="132" rx="11" ry="7" fill="#ff7a8a" opacity=".38"/><ellipse cx="130" cy="132" rx="11" ry="7" fill="#ff7a8a" opacity=".38"/>';
    // eyes
    [78, 122].forEach(function (x, k) {
      s += '<g class="eye">' +
        '<ellipse cx="' + x + '" cy="112" rx="14" ry="16.5" fill="url(#' + id + 'w)"/>' +
        '<g class="pupil"><circle cx="' + x + '" cy="114" r="10.5" fill="url(#' + id + 'i)"/><circle cx="' + x + '" cy="115" r="5" fill="#120a05"/>' +
        '<circle cx="' + (x + 3.5) + '" cy="109" r="3.6" fill="#fff"/><circle cx="' + (x - 3.5) + '" cy="119" r="1.6" fill="#fff" opacity=".85"/></g>' +
        '<path d="M' + (x - 14) + ' 108 Q' + x + ' 92 ' + (x + 14) + ' 108" stroke="#2b1a10" stroke-width="3.4" fill="none" stroke-linecap="round"/>' +
        (g ? '<path d="M' + (k ? x + 13 : x - 13) + ' 104 l' + (k ? 6 : -6) + ' -5 M' + (k ? x + 10 : x - 10) + ' 99 l' + (k ? 4 : -4) + ' -6" stroke="#2b1a10" stroke-width="2.4" stroke-linecap="round"/>' : "") +
        '</g>';
    });
    // brows
    s += '<path class="brow brow-l" d="M66 88 Q78 80 90 86" stroke="' + (g ? "#5a3414" : "#3a2416") + '" stroke-width="4" fill="none" stroke-linecap="round"/>' +
         '<path class="brow brow-r" d="M110 86 Q122 80 134 88" stroke="' + (g ? "#5a3414" : "#3a2416") + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
    // nose
    s += '<ellipse cx="100" cy="128" rx="5.5" ry="3.8" fill="' + skin[2] + '" opacity=".45"/><ellipse cx="98.5" cy="126.5" rx="2" ry="1.2" fill="#fff" opacity=".5"/>';
    // mouths
    s += '<path class="mo-smile" d="M86 140 Q100 154 114 140" stroke="#8a2f22" stroke-width="3.6" fill="none" stroke-linecap="round"/>' +
         '<path class="mo-sad" d="M88 148 Q100 138 112 148" stroke="#8a2f22" stroke-width="3.6" fill="none" stroke-linecap="round"/>' +
         '<g class="mo-open"><path d="M85 137 Q100 164 115 137 Q100 141 85 137Z" fill="#6b1e1e"/>' +
         '<path d="M88 138 L112 138 L110 142 Q100 144 90 142Z" fill="#fff"/>' +
         '<ellipse cx="100" cy="153" rx="8" ry="4.5" fill="#ff8a8a"/></g>';
    s += '</g>'; // head
    s += '</g>'; // body
    s += '</svg>';
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
    if (base === "en" && gender) {
      var want = gender === "girl"
        ? /female|samantha|victoria|karen|moira|tessa|serena|zira|aria|jenny|libby|sonia|google uk english female|google us english/i
        : /male|daniel|alex|fred|oliver|guy|ryan|david|mark|google uk english male/i;
      var avoid = gender === "girl" ? /\bmale\b/i : /female/i;
      var hit = list.filter(function (v) { return want.test(v.name) && !avoid.test(v.name); });
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
        var v = pick(lang, lang.indexOf("en") === 0 ? who : null);
        if (v) u.voice = v;
        u.lang = v ? v.lang : lang;
        var isEn = lang.indexOf("en") === 0;
        u.pitch = isEn ? (who === "girl" ? 1.5 : 1.25) : 1.15;
        u.rate = isEn ? 0.98 : 0.82;
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
