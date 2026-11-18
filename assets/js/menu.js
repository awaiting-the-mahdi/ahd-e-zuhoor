(() => {
  const onInnerPage = window.location.pathname.includes("/pages/");
  const base = onInnerPage ? "../" : "";

  const sections = [
    {
      number: "01",
      title: "Who is Imam Mahdi (ATFS)?",
      url: "pages/who-is-imam.html"
    },
    {
      number: "02",
      title: "Prophetic Blueprint",
      url: "pages/constellation.html"
    },
    {
      number: "03",
      title: "Knowledge Library",
      url: "pages/knowledge-library.html"
    },
    {
      number: "04",
      title: "Duas & Hadiths",
      url: "pages/hadiths.html"
    },
    {
      number: "05",
      title: "Digital Learning Academy",
      url: "pages/academy.html"
    },
    {
      number: "06",
      title: "Research & Preservation Archive",
      url: "pages/research-archive.html"
    }
  ];

  /* Inner pages: a Home button (top right) that goes back to the home page. No menu button anywhere. */
  if (onInnerPage) {
    const home = document.createElement("a");
    home.className = "az-home-button";
    home.href = base + "index.html";
    home.setAttribute("aria-label", "Home");
    home.title = "Home";
    home.innerHTML = '<svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9v11h13V9"/><path d="M10 20v-6h4v6"/></svg>';
    document.body.append(home);
    return;
  }

  /* Home page: the "Explore Now" button opens the sections overlay. */

  const overlay = document.createElement("div");
  overlay.className = "az-menu-overlay";
  overlay.setAttribute("aria-hidden", "true");

  overlay.innerHTML = `
    <nav class="az-menu-content" aria-label="AHD-E-ZUHOOR sections">
      <div class="az-menu-eyebrow">
        AHD-E-ZUHOOR · EXPLORE
      </div>

      <div class="az-menu-links">
        ${sections.map(section => `
          <a class="az-menu-link"
             href="${base + section.url}">
            <span class="az-menu-number">${section.number}</span>
            <span class="az-menu-title">${section.title}</span>
          </a>
        `).join("")}
      </div>

      <div class="az-menu-footer" lang="ar" dir="rtl">
        اللّٰهُمَّ عَجِّلْ لِوَلِيِّكَ الْفَرَجَ
      </div>
    </nav>
  `;

  document.body.append(overlay);
// Homepage Explore Now opens the same navigation menu
const exploreButton = document.getElementById("explore-now");

if (exploreButton) {
  exploreButton.addEventListener("click", openMenu);
}
  function openMenu() {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (exploreButton) exploreButton.focus();
  }


  overlay.addEventListener("click", event => {
    if (event.target === overlay) closeMenu();
  });

  overlay.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeMenu();
    }
  });
})();
