(() => {
  const qs = (s, ctx = document) => ctx.querySelector(s);
  const qsa = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  function initNav() {
    const toggle = qs(".nav-toggle");
    const nav = qs("#primary-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      toggle.classList.toggle("active");
      nav.classList.toggle("show");
    });

    // Mobile dropdown toggle
    const dropdowns = qsa(".nav-list .dropdown > a");
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("click", (e) => {
        // Only toggle on mobile
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const parent = dropdown.parentElement;

          // Close other dropdowns
          qsa(".dropdown.mobile-open").forEach((d) => {
            if (d !== parent) {
              d.classList.remove("mobile-open");
            }
          });

          // Toggle current dropdown
          parent.classList.toggle("mobile-open");
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        qsa(".dropdown.mobile-open").forEach((d) =>
          d.classList.remove("mobile-open")
        );
      }
    });
  }

  function initSmoothScroll() {
    qsa('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const target = this.getAttribute("href");
        if (!target || target === "#") return;
        const el = document.querySelector(target);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });

        // close mobile nav if open
        const nav = qs("#primary-nav");
        const toggle = qs(".nav-toggle");
        if (nav && nav.classList.contains("show")) {
          nav.classList.remove("show");
          toggle && toggle.setAttribute("aria-expanded", "false");
          toggle && toggle.classList.remove("active");
        }
      });
    });
  }

  function setFooterYear() {
    const yearEl = qs("#year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  /* Reveal on scroll and number counter */
  function initScrollReveal() {
    if ("IntersectionObserver" in window === false) return;

    const revealEls = qsa(".reveal");
    // apply initial stagger delays so reveals feel sequential
    revealEls.forEach((el, i) => {
      const delay = Math.min(i * 80, 600); // cap delay
      el.style.transitionDelay = `${delay}ms`;
    });

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.style.transitionDelay = ""; // clear inline delay after reveal
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => io.observe(el));

    // Histogram counters
    const counters = qsa(".histogram-block h3");
    const counterObserver = new IntersectionObserver(
      (entries, obs2) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const start = 0;
            const end =
              parseInt(el.textContent.replace(/[^0-9]/g, ""), 10) || 0;
            animateCount(el, start, end, 1200);
            obs2.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => counterObserver.observe(c));
  }

  function animateCount(el, start, end, duration) {
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      el.textContent =
        String(value) + (el.textContent.includes("+") ? "+" : "");
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initSmoothScroll();
    initScrollReveal();
    setFooterYear();
  });
})();
