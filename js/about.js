document.addEventListener('DOMContentLoaded', () => {
  [
    'particles-about',
    'particles-events'
  ].forEach(initParticles);
});

function initParticles(id) {
  const container = document.getElementById(id);
  if (!container || typeof particlesJS === 'undefined') return;

  particlesJS(id, {
    particles: {
      number: {
        value: 160,
        density: {
          enable: true,
          value_area: 900
        }
      },
      color: { value: '#28a8b4' },
      shape: { type: 'circle' },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#135a70',
        opacity: 0.35,
        width: 1
      },
      move: {
        enable: true,
        speed: 2.5,
        out_mode: 'out'
      }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: 'grab' },
        resize: true
      },
      modes: {
        grab: {
          distance: 160,
          line_linked: { opacity: 0.6 }
        }
      }
    },
    retina_detect: true
  });
}
