document.addEventListener('DOMContentLoaded', () => {
  ['particles-about', 'particles-events'].forEach(initParticles);
  initScrollReveal();
});

function initParticles(id) {
  const container = document.getElementById(id);
  if (!container || typeof particlesJS === 'undefined') return;

  particlesJS(id, {
    particles: {
      number: { value: 155, density: { enable: true, value_area: 1000 } },
      color: { value: ['#04BFBF', '#F2911B', '#037F8C'] },
      shape: { type: 'circle' },
      opacity: {
        value: 0.35,
        random: true,
        anim: { enable: true, speed: 0.6, opacity_min: 0.05, sync: false }
      },
      size: {
        value: 1.5,
        random: true,
        anim: { enable: true, speed: 1.5, size_min: 0.3, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 130,
        color: '#037F8C',
        opacity: 0.18,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 160, line_linked: { opacity: 0.4 } },
        push: { particles_nb: 2 }
      }
    },
    retina_detect: true
  });
}

/* Simple scroll reveal using IntersectionObserver */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => entry.target.classList.add('visible'), Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}
