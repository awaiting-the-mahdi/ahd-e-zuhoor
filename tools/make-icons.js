/*
  Renders the app icons from assets/icons/icon-source.html (needs Playwright and internet for the font).
  Run from the repository root:   node tools/make-icons.js
  - icon-192/512.png      the icon as designed
  - maskable-192/512.png  the art scaled into Android's safe zone (the inner 80%), background to the edges
  - apple-touch-icon.png  180 px, no transparency
  - favicon-32.png        32 px: the ring and the letter ظ (the full calligraphy is unreadable that small)
*/
const { chromium } = require("playwright");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 512, height: 512 } });
  await p.goto("file://" + path.join(ROOT, "assets/icons/icon-source.html"), { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  const ok = await p.evaluate(() => [...document.fonts].some(f => f.family.includes("Aref") && f.status === "loaded"));
  if (!ok) throw new Error("The Aref Ruqaa font did not load (internet needed).");
  const shot = async (file, size, prep) => {
    await p.evaluate(prep || (() => {}));
    await p.setViewportSize({ width: 512, height: 512 });
    const buf = await p.locator("#icon").screenshot({ omitBackground: false });
    const sharpless = await b.newPage({ viewport: { width: size, height: size } });
    await sharpless.setContent('<html><body style="margin:0"><img src="data:image/png;base64,' + buf.toString("base64") + '" style="width:' + size + 'px;height:' + size + 'px;display:block"></body></html>');
    await sharpless.waitForTimeout(100);
    await sharpless.screenshot({ path: path.join(ROOT, "assets/icons", file) });
    await sharpless.close();
    console.log("wrote", file, size);
  };
  const reset = () => { const a = document.getElementById("art"); a.removeAttribute("transform"); document.getElementById("fav") && document.getElementById("fav").remove(); a.style.display = ""; };
  await shot("icon-512.png", 512, reset);
  await shot("icon-192.png", 192, reset);
  await shot("apple-touch-icon.png", 180, reset);
  const mask = () => { const a = document.getElementById("art"); a.style.display = ""; a.setAttribute("transform", "translate(256 256) scale(.84) translate(-256 -256)"); };
  await shot("maskable-512.png", 512, mask);
  await shot("maskable-192.png", 192, mask);
  await shot("favicon-32.png", 32, () => {
    const a = document.getElementById("art"); a.style.display = "none";
    const ns = "http://www.w3.org/2000/svg", g = document.createElementNS(ns, "g"); g.id = "fav";
    g.innerHTML = '<circle cx="256" cy="256" r="200" fill="none" stroke="url(#gold)" stroke-width="30"/>' +
      '<text x="256" y="350" text-anchor="middle" font-family="Aref Ruqaa" font-weight="700" font-size="300" fill="url(#gold)">ظ</text>';
    document.getElementById("icon").appendChild(g);
  });
  await b.close();
})();
