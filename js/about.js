document.addEventListener('DOMContentLoaded', function() {
      particlesJS('particles-bg', {
        "particles": {
          "number": {
            "value": 400,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#28a8b4" // Usando tu color --primary
          },
          "shape": {
            "type": "circle",
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#135a70", // Usando tu color --tertiary
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          }
        },
        "retina_detect": true
      });
    });


    