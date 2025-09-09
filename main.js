// Makes sure Javascript file is loaded
// console.log("Success! Your JS is loaded!");

// Slider logic (translateX)
(function () {
  function makeSlider(root) {
    const track = root.querySelector(".slides");       // the moving container
    const slides = Array.from(root.querySelectorAll(".slide"));
    const prevBtn = root.querySelector(".prev");
    const nextBtn = root.querySelector(".next");
    const dots = Array.from(root.querySelectorAll(".dot"));
    let index = 0;

    function go(i) {
      index = (i + slides.length) % slides.length;
      // move the track
      track.style.transform = `translateX(${-index * 100}%)`;
      // dot states
      dots.forEach((d, idx) => {
        d.classList.toggle("is-active", idx === index);
        d.setAttribute("aria-selected", idx === index ? "true" : "false");
        d.tabIndex = idx === index ? 0 : -1;
      });
    }

    function next(){ go(index + 1); }
    function prev(){ go(index - 1); }

    // Buttons
    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    // Dots
    dots.forEach((dot, i) => dot.addEventListener("click", () => go(i)));

    // Keyboard
    root.setAttribute("tabindex", "0");
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    });

    // Touch swipe
    let startX = 0;
    root.addEventListener("touchstart", (e) => { startX = e.changedTouches[0].clientX; }, { passive: true });
    root.addEventListener("touchend",   (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
    });

    // Init at first slide
    go(0);
  }

  document.querySelectorAll(".slider").forEach(makeSlider);
})();