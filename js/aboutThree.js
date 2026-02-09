import * as THREE from "three";

const container = document.getElementById("aboutThree");

if (!container) {
  console.error("No se encontró el elemento #aboutThree");
} else {
  // Tamaño del contenedor
  let width = container.clientWidth;
  let height = container.clientHeight;

  // Escena
  const scene = new THREE.Scene();

  // Cámara
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 3;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Geometría
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00aaff,
    metalness: 0.4,
    roughness: 0.3,
  });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 2, 2);
  scene.add(directionalLight);

  // Animación
  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();

  // Responsive
  window.addEventListener("resize", () => {
    width = container.clientWidth;
    height = container.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}
