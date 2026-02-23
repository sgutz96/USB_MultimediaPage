import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.getElementById("aboutThree");
if (!container) { console.error("No se encontró #aboutThree"); }
else { initScene(container); }

function initScene(container) {
  let W = container.clientWidth;
  let H = container.clientHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080C10, 0.08);

  const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
  camera.position.set(0, 4.5, 9);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  // === LIGHTS ===
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);
  const rimLight = new THREE.DirectionalLight(0x04BFBF, 0.4);
  rimLight.position.set(-5, 2, -5);
  scene.add(rimLight);

  // === GRUPOS ===
  const pivotSpin = new THREE.Group();
  const pivotLook = new THREE.Group();
  pivotSpin.add(pivotLook);
  scene.add(pivotSpin);

  // === ESTADO ===
  let model     = null;
  let baseScale = 1;
  let isHovered = false;

  const SCALE_NORMAL = 1.0;
  const SCALE_HOVER  = 2.12;
  let currentScale   = SCALE_NORMAL;
  let targetScale    = SCALE_NORMAL;

  let targetLookX = 0;
  let targetLookY = 0;

  const mouse     = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  // === CARGAR GLB ===
  const loader = new GLTFLoader();
  loader.load(
    "./assets/3d/modelo.glb",
    (gltf) => {
      model = gltf.scene;

      const box    = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size   = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      baseScale = 4 / maxDim;
      model.position.sub(center);
      model.scale.setScalar(baseScale);

      pivotLook.add(model);
      console.log("✅ Modelo cargado");
    },
    (xhr) => console.log(`Cargando: ${Math.round(xhr.loaded / xhr.total * 100)}%`),
    (error) => console.error("❌ Error:", error)
  );

  // === MOUSE GLOBAL ===
  window.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();

    // Parallax relativo a toda la ventana
    targetLookX = (e.clientY / window.innerHeight - 0.5) *  0.5;
    targetLookY = (e.clientX / window.innerWidth  - 0.5) *  1.2;

    // Raycast solo si el mouse está sobre el contenedor
    const insideX = e.clientX >= rect.left && e.clientX <= rect.right;
    const insideY = e.clientY >= rect.top  && e.clientY <= rect.bottom;

    if (insideX && insideY) {
      mouse.x =  (e.clientX - rect.left) / rect.width  * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    } else {
      // Por esto — fuera del frustum, el raycast no toca nada:
mouse.set(-9999, -9999);
      if (isHovered) {
        isHovered   = false;
        targetScale = SCALE_NORMAL;
        onModelHoverEnd();
      }
    }
  });

  // === CALLBACKS HOVER ===
  function onModelHover() {
    container.style.cursor = "pointer";
    console.log("🎯 hover — activa animación");
  }

  function onModelHoverEnd() {
    container.style.cursor = "default";
    console.log("💤 hover end");
  }

  // === LOOP ===
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.008;

    if (model) {

      // Raycast
      raycaster.setFromCamera(mouse, camera);
      const hits   = raycaster.intersectObject(model, true);
      const hitNow = hits.length > 0;

      if (hitNow && !isHovered) {
        isHovered   = true;
        targetScale = SCALE_HOVER;
        onModelHover();
      } else if (!hitNow && isHovered) {
        isHovered   = false;
        targetScale = SCALE_NORMAL;
        onModelHoverEnd();
      }

      // Escala suave
      currentScale += (targetScale - currentScale) * 0.06;
      model.scale.setScalar(baseScale * currentScale);

      // Mira al mouse — independiente del spin
      pivotLook.rotation.x += (targetLookX - pivotLook.rotation.x) * 0.05;
      pivotLook.rotation.y += (targetLookY - pivotLook.rotation.y) * 0.05;

      // Rotación base lenta — pausa en hover
      if (!isHovered) {
        pivotSpin.rotation.y += 0.003;
      }

      // Bob flotante
      pivotSpin.position.y = Math.sin(t) * 0.15;
    }

    renderer.render(scene, camera);
  }

  animate();

  // === RESIZE ===
  window.addEventListener("resize", () => {
    W = container.clientWidth;
    H = container.clientHeight;
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  });
}