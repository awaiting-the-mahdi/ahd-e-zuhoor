/*
  AHD-E-ZUHOOR — service worker for the installable web app.

  The app is the website itself: every request goes to the network first, so the
  app always shows exactly what the website shows. A copy of what was fetched is
  kept only so that pages, books and audio already opened still work offline.
  Nothing here changes how a page looks or behaves.
*/
var CACHE = "az-v1";
/* opened once at install, so the home screen app can start offline */
var CORE = ["./", "index.html", "assets/css/site.css", "assets/css/menu.css", "assets/js/i18n.js",
  "assets/js/ur/common.js", "assets/js/ur/index.js", "assets/js/ro.js", "assets/js/ro/words.js",
  "assets/icons/icon-192.png", "manifest.webmanifest"];
/* other sites whose files the pages load (fonts, three.js); kept for offline use too */
var KEEP_HOSTS = /^(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$/;

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(CORE.map(function (u) { return c.add(new Request(u, { cache: "reload" })).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || req.headers.has("range")) return;          // uploads, API calls and partial (streamed) audio/PDF go straight to the network
  var url = new URL(req.url);
  var same = url.origin === self.location.origin;
  if (!same && !KEEP_HOSTS.test(url.hostname)) return;                     // Ask Zahra, sistani.org, recitation audio: untouched
  e.respondWith(fetch(req).then(function (res) {
    if (res && (res.ok || res.type === "opaque")) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
    }
    return res;
  }).catch(function () {
    return caches.match(req).then(function (hit) {
      if (hit) return hit;
      return caches.match(req, { ignoreSearch: true }).then(function (hit2) {   // e.g. a page opened with another ?lang=
        if (hit2) return hit2;
        if (req.mode === "navigate") return caches.match("index.html");
        return Response.error();
      });
    });
  }));
});
