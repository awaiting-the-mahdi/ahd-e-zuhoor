document.addEventListener("DOMContentLoaded", () => {
  const opening = document.getElementById("opening");
  const header = document.getElementById("site-header");
  const continueButton = document.getElementById("skip-intro");
  const revelation = document.getElementById("revelation");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Continue button
  if (continueButton && header && revelation) {
    continueButton.addEventListener("click", () => {
      header.classList.add("is-visible");

      revelation.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  }

  // Reveal navigation after the opening
  if (opening && header) {
    if ("IntersectionObserver" in window) {
      const headerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            header.classList.toggle(
              "is-visible",
              !entry.isIntersecting
            );
          });
        },
        { threshold: 0.05 }
      );

      headerObserver.observe(opening);
    } else {
      header.classList.add("is-visible");
    }
  }

  // Scroll reveal animations
  const revealElements = document.querySelectorAll(".reveal");

  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }
});