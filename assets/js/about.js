// About PHA Stats Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // Animation duration in ms
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Run counters when section is in view
const aboutSection = document.querySelector('.about-pha-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (aboutSection) {
  observer.observe(aboutSection);
}