// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// Active link highlighting
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Slider functionality
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  function nextSlide() {
    let newIndex = (currentSlide + 1) % slides.length;
    showSlide(newIndex);
  }

  // Auto slide change
  let slideTimer = setInterval(nextSlide, slideInterval);

  // Pause on hover
  const slider = document.querySelector(".hero-slider");
  slider.addEventListener("mouseenter", () => clearInterval(slideTimer));
  slider.addEventListener(
    "mouseleave",
    () => (slideTimer = setInterval(nextSlide, slideInterval))
  );

  // Dot navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      clearInterval(slideTimer);
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      showSlide(slideIndex);
      slideTimer = setInterval(nextSlide, slideInterval);
    });
  });
});


