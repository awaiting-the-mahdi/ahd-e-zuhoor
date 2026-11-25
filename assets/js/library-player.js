/*
  AHD-E-ZUHOOR — Knowledge Library audiobook player.
  Plays the recorded chapter narrations (assets/audio/library/<lang>/<hash>.mp3, listed in
  assets/audio/library/clips.js by tools/library-audio/make.py) one chapter after another, with a
  soft ambient music bed made live with Web Audio (no file, no gaps). English: Christopher;
  Urdu and Roman Urdu: Asad. Uses the reader's BOOKS, cur, jump(), mode and close() from
  knowledge-library.html. With no recordings, falls back to the browser's own voice.
*/
(function () {
  "use strict";
  var CLIPS = window.AZ_LIB_AUDIO || { en: {}, ur: {} };
  var BASE = "../assets/audio/library/";
  var UR = window.AZ_LANG === "ur";
  var T = UR ? { play: "چلائیں", pause: "روکیں", prev: "پچھلا باب", next: "اگلا باب", music: "پس منظر موسیقی", speed: "رفتار", close: "بند کریں", ch: "باب", of: "از", seek: "باب میں آگے پیچھے جائیں" }
             : { play: "Play", pause: "Pause", prev: "Previous chapter", next: "Next chapter", music: "Background music", speed: "Speed", close: "Close", ch: "Chapter", of: "of", seek: "Seek in the chapter" };
  var SPEEDS = [1, 1.15, 1.3, 0.9];
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- the bar ---------- */
  var css = document.createElement("style");
  css.textContent =
    "#ap{position:absolute;left:10px;right:10px;bottom:calc(env(safe-area-inset-bottom,0px) + 10px);z-index:4;display:none;align-items:center;gap:8px;" +
    "padding:10px 12px;border-radius:18px;background:rgba(12,14,36,.94);color:#e9e4f7;border:1px solid rgba(215,188,128,.45);box-shadow:0 10px 30px rgba(0,0,0,.45);" +
    "-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);font:14px/1.3 system-ui,sans-serif}" +
    "#ap *{position:static;transform:none;float:none}#ap .ap-mid{position:relative}#ap.on{display:flex}#rd.paper #ap{background:rgba(44,36,24,.94);color:#f4ead3}" +
    "#ap button{flex:none;width:38px;height:38px;border-radius:50%;border:1px solid rgba(215,188,128,.5);background:none;color:inherit;font-size:15px;cursor:pointer;display:grid;place-items:center;padding:0}" +
    "#ap button.ap-pp{width:46px;height:46px;background:#d7bc80;color:#1a1530;border-color:#d7bc80;font-size:18px}" +
    "#ap button.ap-off{opacity:.45}#ap .ap-sp{width:auto;padding:0 10px;border-radius:19px;font-size:12px;font-weight:700}" +
    "#ap .ap-mid{flex:1;min-width:0}#ap .ap-ttl{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:600}" +
    "#ap .ap-sub{font-size:11px;opacity:.7;margin-top:2px}" +
    "#ap input{width:100%;margin:6px 0 0;accent-color:#d7bc80;height:14px}" +
    "#sc.ap-on{padding-bottom:calc(env(safe-area-inset-bottom,0px) + 130px)}" +
    "@media(max-width:420px){#ap{gap:5px;padding:8px 8px}#ap button{width:34px;height:34px}#ap button.ap-pp{width:42px;height:42px}#ap .ap-x{display:none}}";
  document.head.appendChild(css);
  var bar = document.createElement("div");
  bar.id = "ap"; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "Audiobook");
  bar.innerHTML =
    '<button class="ap-pv" type="button">⏮</button><button class="ap-pp" type="button">▶</button><button class="ap-nx" type="button">⏭</button>' +
    '<div class="ap-mid"><div class="ap-ttl"></div><div class="ap-sub"></div><input type="range" min="0" max="1000" value="0"></div>' +
    '<button class="ap-mu" type="button">♫</button><button class="ap-sp" type="button">1×</button><button class="ap-x" type="button">✕</button>';
  var q = function (s) { return bar.querySelector(s); };
  q(".ap-pv").setAttribute("aria-label", T.prev); q(".ap-nx").setAttribute("aria-label", T.next); q(".ap-mu").setAttribute("aria-label", T.music);
  q(".ap-sp").setAttribute("aria-label", T.speed); q(".ap-x").setAttribute("aria-label", T.close); q("input").setAttribute("aria-label", T.seek);

  /* ---------- state ---------- */
  var audio = new Audio(); audio.preload = "auto";
  var book = -1, ch = 0, lang = "en", speed = +(store("ath:speed") || 1), musicOn = store("ath:music") !== "0";
  function langFor(b) { var want = UR ? "ur" : "en"; return CLIPS[want] && CLIPS[want][b + "-0"] ? want : (CLIPS.en[b + "-0"] ? "en" : null); }
  function src(b, c) { var h = CLIPS[lang] && CLIPS[lang][b + "-" + c]; return h ? BASE + lang + "/" + h + ".mp3" : null; }
  function chapters() { return (window.BOOKS[book] || { ch: [] }).ch; }

  /* ---------- ambient music bed (Web Audio) ---------- */
  var ac = null, master = null;
  function musicStart() {
    if (!musicOn) return;
    try {
      if (!ac) {
        ac = new (window.AudioContext || window.webkitAudioContext)();
        master = ac.createGain(); master.gain.value = 0;
        var lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 900;
        var dl = ac.createDelay(2); dl.delayTime.value = 0.6; var fb = ac.createGain(); fb.gain.value = 0.35;
        lp.connect(master); lp.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(master); master.connect(ac.destination);
        /* a low, slowly breathing chord: A2, E3, A3, C4, E4 */
        [[110, .5, .078], [164.81, .35, .0625], [220, .3, .047], [261.63, .2, .07], [329.63, .12, .016]].forEach(function (n, i) {
          var o = ac.createOscillator(), g = ac.createGain(), l = ac.createOscillator(), lg = ac.createGain();
          o.type = "sine"; o.frequency.value = n[0]; g.gain.value = n[1] * .6;
          l.frequency.value = n[2]; lg.gain.value = n[1] * .4; l.connect(lg); lg.connect(g.gain);
          o.connect(g); g.connect(lp); o.start(); l.start();
        });
      }
      if (ac.state === "suspended") ac.resume();
      master.gain.cancelScheduledValues(ac.currentTime);
      master.gain.setTargetAtTime(0.05, ac.currentTime, 1.2);   /* about 15 dB under the voice */
    } catch (e) {}
  }
  function musicStop() { if (ac && master) { master.gain.cancelScheduledValues(ac.currentTime); master.gain.setTargetAtTime(0, ac.currentTime, .5); } }

  /* ---------- playback ---------- */
  function show() {
    var C = chapters(), c = C[ch] || ["", []];
    var title = c[0], rd = document.getElementById("rd");
    if (UR && window.AZ_UR) title = window.AZ_UR.t(title);
    q(".ap-ttl").textContent = (ch + 1) + ". " + title;
    q(".ap-sub").textContent = T.ch + " " + (ch + 1) + " " + T.of + " " + C.length;
    q(".ap-pp").textContent = audio.paused ? "▶" : "⏸"; q(".ap-pp").setAttribute("aria-label", audio.paused ? T.play : T.pause);
    q(".ap-mu").classList.toggle("ap-off", !musicOn); q(".ap-sp").textContent = speed + "×";
    q(".ap-pv").disabled = ch === 0; q(".ap-nx").disabled = ch >= C.length - 1;
    if ("mediaSession" in navigator) try {
      navigator.mediaSession.metadata = new MediaMetadata({ title: title, artist: window.BOOKS[book].t, album: "AHD-E-ZUHOOR · Knowledge Library",
        artwork: [{ src: "../assets/icons/icon-512.png", sizes: "512x512", type: "image/png" }] });
    } catch (e) {}
  }
  function load(c, autoplay) {
    ch = c; var s = src(book, ch); if (!s) return;
    audio.src = s; audio.playbackRate = speed; show();
    if (typeof window.mode !== "undefined" && window.mode !== "b" && typeof window.jump === "function") window.jump(ch);
    if (autoplay) play();
  }
  function play() { var p = audio.play(); if (p && p.catch) p.catch(function () {}); musicStart(); }
  function pause() { audio.pause(); musicStop(); }
  audio.addEventListener("play", show); audio.addEventListener("pause", show);
  audio.addEventListener("ratechange", function () { audio.playbackRate = speed; });
  audio.addEventListener("timeupdate", function () { if (audio.duration) q("input").value = Math.round(audio.currentTime / audio.duration * 1000); });
  audio.addEventListener("ended", function () {
    if (ch < chapters().length - 1) setTimeout(function () { load(ch + 1, true); }, 1200);
    else { musicStop(); show(); }
  });
  q("input").addEventListener("input", function () { if (audio.duration) audio.currentTime = this.value / 1000 * audio.duration; });
  q(".ap-pp").onclick = function () { audio.paused ? play() : pause(); };
  q(".ap-pv").onclick = function () { if (audio.currentTime > 5) audio.currentTime = 0; else if (ch > 0) load(ch - 1, !audio.paused); };
  q(".ap-nx").onclick = function () { if (ch < chapters().length - 1) load(ch + 1, !audio.paused); };
  q(".ap-mu").onclick = function () { musicOn = !musicOn; store("ath:music", musicOn ? "1" : "0"); if (musicOn && !audio.paused) musicStart(); else musicStop(); show(); };
  q(".ap-sp").onclick = function () { speed = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length]; store("ath:speed", speed); audio.playbackRate = speed; show(); };
  q(".ap-x").onclick = stop;
  if ("mediaSession" in navigator) try {
    navigator.mediaSession.setActionHandler("play", play); navigator.mediaSession.setActionHandler("pause", pause);
    navigator.mediaSession.setActionHandler("previoustrack", function () { q(".ap-pv").onclick(); });
    navigator.mediaSession.setActionHandler("nexttrack", function () { q(".ap-nx").onclick(); });
  } catch (e) {}

  function stop() { pause(); bar.classList.remove("on"); var s = document.getElementById("sc"); if (s) s.classList.remove("ap-on"); }

  /* the 🎧 button: open the player for this book (or fall back to the browser's voice) */
  window.AZ_LIB_PLAYER = {
    has: function (b) { return !!langFor(b); },
    toggle: function () {
      var b = window.cur;
      if (bar.classList.contains("on") && book === b) { stop(); return; }
      lang = langFor(b); if (!lang) return false;
      if (book !== b) { book = b; ch = 0; }
      var rd = document.getElementById("rd"); if (bar.parentNode !== rd) rd.appendChild(bar);
      bar.classList.add("on"); var s = document.getElementById("sc"); if (s) s.classList.add("ap-on");
      load(ch, true); return true;
    },
    stop: stop,
    /* another book opened: the player belongs to the book it was started on */
    opened: function (b) { if (b !== book) stop(); }
  };
})();
