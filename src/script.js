import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x04011a);
scene.fog = new THREE.Fog(0x333333, 5, 10);

// Grid Helper
let grid;

grid = new THREE.GridHelper(20, 20, 0xffffff, 0xffffff);
grid.material.opacity = 0.2;
grid.material.depthWrite = false;
grid.material.transparent = true;
scene.add(grid);

const material = new THREE.MeshNormalMaterial();

const cube = new THREE.Mesh(new THREE.BoxGeometry(), material);
cube.position.y = 0.5;

scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
});

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  40,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(4.25, 1.4, -4.5);

// Make the camera look at the cube
camera.lookAt(cube.position);

// // Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.maxDistance = 9;
// controls.maxPolarAngle = THREE.MathUtils.degToRad(90);
// controls.target.set(0, 0.5, 0);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const speed = 5;
  grid.position.z = (elapsedTime * speed) % 1;

  // Move camera in the opposite direction of the cursor
  camera.position.x = -cursor.x * 10;

  // Update camera to always look at the cube
  camera.lookAt(cube.position);
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
