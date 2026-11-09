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
      url: "pages/prophetic-blueprint.html"
    },
    {
      number: "03",
      title: "Knowledge Library",
      url: "pages/knowledge-library.html"
    },
    {
      number: "04",
      title: "Hadiths",
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

  const button = document.createElement("button");
  button.className = "az-menu-button";
  button.type = "button";
  button.setAttribute("aria-label", "Open navigation menu");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = "<span></span><span></span>";

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
        اللَّهُمَّ عَجِّلْ لِوَلِيِّكَ الْفَرَجَ
      </div>
    </nav>
  `;

  document.body.append(button, overlay);

  function openMenu() {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", "Close navigation menu");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation menu");
    document.body.style.overflow = "";
    button.focus();
  }

  button.addEventListener("click", () => {
    if (overlay.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

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