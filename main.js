// Makes sure Javascript file is loaded
console.log("Success! Your JS is loaded!")


// Slider logic
(function () {
    function makeSlider(root) {
      const slides = Array.from(root.querySelectorAll(".slide"));
      const prevBtn = root.querySelector(".prev");
      const nextBtn = root.querySelector(".next");
      const dots = Array.from(root.querySelectorAll(".dot"));
      let index = 0;
  
      function go(i) {
        index = (i + slides.length) % slides.length;
        slides.forEach((s, idx) => s.classList.toggle("is-active", idx === index));
        dots.forEach((d, idx) => {
          d.classList.toggle("is-active", idx === index);
          d.setAttribute("aria-selected", idx === index ? "true" : "false");
          d.tabIndex = idx === index ? 0 : -1;
        });
      }
  
      function next() {
        go(index + 1);
      }
      function prev() {
        go(index - 1);
      }
  
      // Button events
      if (nextBtn) nextBtn.addEventListener("click", next);
      if (prevBtn) prevBtn.addEventListener("click", prev);
  
      // Dot events
      dots.forEach((dot, i) =>
        dot.addEventListener("click", () => go(i))
      );
  
      // Keyboard navigation
      root.setAttribute("tabindex", "0");
      root.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      });
  
      // Touch swipe
      let touchStartX = 0;
      root.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });
  
      root.addEventListener("touchend", (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) {
          dx < 0 ? next() : prev();
        }
      });
  
      // Initialize
      go(0);
    }
  
    // Activate all sliders on the page
    document.querySelectorAll(".slider").forEach(makeSlider);
  })();