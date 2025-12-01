// testimonials.js
// Simple, dependency-free carousel for the testimonials block

(function () {
  function initTestimonialCarousel(carousel) {
    var track = carousel.querySelector("[data-track]");
    if (!track) return;
    var cards = Array.from(track.querySelectorAll(".testimonial-card"));
    if (!cards.length) return;

    var prevBtn = carousel.querySelector(".testimonials-nav.prev");
    var nextBtn = carousel.querySelector(".testimonials-nav.next");
    var dotsContainer = carousel.querySelector("[data-dots]");

    var index = 0;
    var cardWidth = cards[0].getBoundingClientRect().width;
    var gap = parseInt(getComputedStyle(track).gap || 18, 10) || 18;

    function updateSizes() {
      cardWidth = cards[0].getBoundingClientRect().width;
      gap = parseInt(getComputedStyle(track).gap || 18, 10) || 18;
      moveTo(index);
    }

    function moveTo(i) {
      index = Math.max(0, Math.min(i, cards.length - 1));
      var x = index * (cardWidth + gap);
      track.style.transform = "translateX(" + -x + "px)";
      updateButtons();
      updateDots();
    }

    function updateButtons() {
      if (prevBtn) prevBtn.disabled = index <= 0;
      if (nextBtn) nextBtn.disabled = index >= cards.length - 1;
    }

    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = "";
      for (var i = 0; i < cards.length; i++) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.dataset.index = i;
        if (i === index) btn.classList.add("active");
        btn.addEventListener("click", function (e) {
          moveTo(Number(e.currentTarget.dataset.index));
        });
        dotsContainer.appendChild(btn);
      }
    }

    function updateDots() {
      if (!dotsContainer) return;
      var btns = Array.from(dotsContainer.children);
      btns.forEach(function (b) {
        b.classList.toggle("active", Number(b.dataset.index) === index);
      });
    }

    if (prevBtn)
      prevBtn.addEventListener("click", function () {
        moveTo(index - 1);
      });
    if (nextBtn)
      nextBtn.addEventListener("click", function () {
        moveTo(index + 1);
      });

    // touch support (drag to swipe)
    var startX = 0;
    var isDown = false;
    var startTranslate = 0;

    function getCurrentTranslateX(el) {
      var style = getComputedStyle(el).transform;
      if (!style || style === "none") return 0;
      try {
        var m = new DOMMatrixReadOnly(style);
        return m.m41;
      } catch (err) {
        var match = style.match(/matrix\(([^)]+)\)/);
        if (match) {
          var parts = match[1].split(",");
          return parseFloat(parts[4]);
        }
        return 0;
      }
    }

    track.addEventListener("pointerdown", function (e) {
      isDown = true;
      startX = e.clientX;
      startTranslate = getCurrentTranslateX(track);
      track.style.transition = "none";
      if (track.setPointerCapture) track.setPointerCapture(e.pointerId);
    });

    track.addEventListener("pointermove", function (e) {
      if (!isDown) return;
      var diff = e.clientX - startX;
      track.style.transform = "translateX(" + (startTranslate + diff) + "px)";
    });

    function endDrag(e) {
      if (!isDown) return;
      isDown = false;
      if (track.releasePointerCapture)
        try {
          track.releasePointerCapture(e.pointerId);
        } catch (err) {}
      track.style.transition = "";
      var diff = (e && e.clientX ? e.clientX : startX) - startX;
      // use a threshold relative to card width for a more natural swipe
      var threshold = Math.min(80, cardWidth / 3);
      if (Math.abs(diff) > threshold) {
        if (diff < 0) moveTo(index + 1);
        else moveTo(index - 1);
      } else {
        moveTo(index);
      }
    }

    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("pointerleave", endDrag);

    window.addEventListener("resize", function () {
      // debounce-ish
      clearTimeout(carousel._resizeT);
      carousel._resizeT = setTimeout(updateSizes, 120);
    });

    // initialize
    createDots();
    updateSizes();
    updateButtons();
    updateDots();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var carousels = document.querySelectorAll("[data-carousel]");
    carousels.forEach(function (c) {
      initTestimonialCarousel(c);
    });
  });
})();
