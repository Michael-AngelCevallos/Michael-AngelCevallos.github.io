// Makes sure Javascript file is loaded
console.log("Success! Your JS is loaded!")


// Slider for pictures 

let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    const slideWidth = slides.children[0].clientWidth;
    
    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // wrap around to the last slide
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0; // wrap around to the first slide
    }

    slides.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
}