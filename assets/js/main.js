// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // ===============================
  // Active link highlighting
  // ===============================
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // ===============================
  // Hero slider functionality
  // ===============================
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  const slider = document.querySelector(".hero-slider");
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds
  let slideTimer;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  function nextSlide() {
    const newIndex = (currentSlide + 1) % slides.length;
    showSlide(newIndex);
  }

  function startSlideShow() {
    slideTimer = setInterval(nextSlide, slideInterval);
  }

  function stopSlideShow() {
    clearInterval(slideTimer);
  }

  if (slides.length && dots.length && slider) {
    startSlideShow();

    slider.addEventListener("mouseenter", stopSlideShow);
    slider.addEventListener("mouseleave", startSlideShow);

    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        stopSlideShow();
        const slideIndex = parseInt(this.getAttribute("data-slide"));
        showSlide(slideIndex);
        startSlideShow();
      });
    });
  }

  // ===============================
  // Form handling functionality
  // ===============================
  function handleFormSubmit(form, actionUrl) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

    // Collect form data
    const formData = new FormData(form);

    // Send AJAX request
    fetch(actionUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.text();
      })
      .then((data) => {
        if (data === "success") {
          if (window.successModal) {
            window.successModal.show();
          } else {
            alert("Thank you! Your message has been sent successfully.");
          }
          form.reset();
        } else {
          throw new Error(data);
        }
      })
      .catch((error) => {
        if (window.errorModal) {
          document.getElementById("errorMessage").textContent = error.message;
          window.errorModal.show();
        } else {
          alert("Error: " + error.message);
        }
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      });
  }

  // Home page enquiry form
  const enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleFormSubmit(this, "form-process.php");
    });
  }

  // Contact page form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleFormSubmit(this, "../form-process.php");
    });
  }

  // Initialize modals if they exist
  if (document.getElementById("successModal")) {
    window.successModal = new bootstrap.Modal(
      document.getElementById("successModal")
    );
  }
  if (document.getElementById("errorModal")) {
    window.errorModal = new bootstrap.Modal(
      document.getElementById("errorModal")
    );
  }
});
