// RABBIT HOLE
// 2/3/2023
// Code borrowed and retooled from Bruno Simon's Three.js Journey course

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


// Canvas
const canvas = document.querySelector('#bg')

// Sizes
const sizes = {
    width: 1200,
    height: 800
}

// Cursor
const cursor = {
    x: 0,
    y: 0
}

// Add Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const gltfLoader = new GLTFLoader()
var brainObj = null;

var vecBrain = [0, 1, 0];

gltfLoader.load(
  'bunny.glb',
  (gltf) =>
  {
      brainObj = gltf.scene.children[0];
      brainObj.position.y = vecBrain[1];
      console.log(gltf.scene.children[0].position.y);
      scene.add(brainObj);
  }
)


gltfLoader.load(
  'wc1.glb',
  (gltf) =>
  {
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        scene.add(gltf.scene)
  }
)


// Light
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 2
scene.add(ambientLight)

const plight = new THREE.PointLight(0xffffff, 10)
scene.add(plight)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = vecBrain[0];

camera.position.z = vecBrain[1] + 2.3;
camera.position.y = vecBrain[2] + 2;
camera.lookAt(vecBrain[0], vecBrain[1], vecBrain[2]);
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()
let previousTime = 0;

// ANIMATE

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    plight.position.x = (Math.sin(elapsedTime) * 2);
    plight.position.z = (Math.cos(elapsedTime) * 2);

    if (brainObj) brainObj.rotation.x = elapsedTime * 0.1;
    if (brainObj) brainObj.rotation.y = elapsedTime * 0.1;
    if (brainObj) brainObj.rotation.z = elapsedTime * 0.1;

    if (brainObj) brainObj.position.x = vecBrain[1];
    camera.position.z = vecBrain[1] + 2.3;
    camera.lookAt(vecBrain[0], vecBrain[1], vecBrain[2]);


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


// We use a keydown function to mimic the scroll interaction in the final build
window.addEventListener('keydown', function(w){
    vecBrain[1] -= 0.01;
    console.log(vecBrain[1]);
});

tick()