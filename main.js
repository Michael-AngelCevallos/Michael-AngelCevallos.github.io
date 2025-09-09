// Slider logic (translateX)
(function () {
  function makeSlider(root) {
    const track = root.querySelector(".slides");
    const slides = Array.from(root.querySelectorAll(".slide"));
    const prevBtn = root.querySelector(".prev");
    const nextBtn = root.querySelector(".next");
    const dotsWrap = root.querySelector(".slider-dots");

    // Build dots dynamically
    dotsWrap.innerHTML = "";
    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.className = "dot";
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.tabIndex = i === 0 ? 0 : -1;
      dotsWrap.appendChild(b);
      return b;
    });

    let index = 0;

    // set track width implicitly by flex; just move it
    function go(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(${-index * 100}%)`;

      dots.forEach((d, idx) => {
        const active = idx === index;
        d.classList.toggle("is-active", active);
        d.setAttribute("aria-selected", active ? "true" : "false");
        d.tabIndex = active ? 0 : -1;
      });
    }

    const next = () => go(index + 1);
    const prev = () => go(index - 1);

    // Buttons
    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    // Dots
    dots.forEach((dot, i) => dot.addEventListener("click", () => go(i)));

    // Keyboard
    root.setAttribute("tabindex", "0");
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });

    // Touch swipe
    let startX = 0;
    root.addEventListener(
      "touchstart",
      (e) => {
        startX = e.changedTouches[0].clientX;
      },
      { passive: true }
    );
    root.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
      },
      { passive: true }
    );

    // Init
    go(0);
  }

  document.querySelectorAll(".slider").forEach(makeSlider);
})();
