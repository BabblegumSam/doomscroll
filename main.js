import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('#bg')
const textureLoader = new THREE.TextureLoader()

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

// window.addEventListener('mousemove', (event) =>
// {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = - (event.clientY / sizes.height - 0.5)
// })

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
// scene.add(mesh)

/**
 * Models
 */
const loader = new OBJLoader();
// loader.load('/assets/smallbunny.obj', object => {
//     const material = new THREE.MeshNormalMaterial();
//     // scene.add(object);

// });

// OBJECTS BLENDER MESHES
// const ctxt = textureLoader.load('/assets/texture/face.jpeg');

// const objLoader = new OBJLoader();
// const mtlLoader = new MTLLoader();

// mtlLoader.load('assets/bunny.mtl', (mtl) => {
//   mtl.preload();
//   objLoader.setMaterials(mtl);
//   objLoader.load('assets/bunny.obj', (root) => {
//     scene.add(root);
//   });
// });

// function LoadOBJ()
// 	{
// 	  var mtlLoader = new MTLLoader();
// 	  mtlLoader.setResourcePath("") ;
// 	  mtlLoader.setPath("");
// 	  mtlLoader.load("bunny.mtl", function(materials){
// 	  materials.preload();

//       var objLoader = new OBJLoader();
//       objLoader.setMaterials(materials);
//       objLoader.setPath("");
// 	  objLoader.load("bunny.obj",
	  
// 	        function(object)
// 			 {
// 			    console.log("Adding Object");
// 			    //track.add(object);
// 				var track  = object;
// 				track.position.set(0,0,0);
// 				scene.add(track);
// 			 }
// 		);	
// 	  });
	  
	 
// 	}

//   LoadOBJ();

/**
 * Models
 */
const gltfLoader = new GLTFLoader()
var brainObj = null;

var vecBrain = [0, 1, 0];

gltfLoader.load(
  'orange brain.glb',
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
//         for (let i = 0; i < gltf.scene.children.length; i++) {
//             scene.add(gltf.scene.children[i])
//         }
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
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
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

/**
 * Scroll
 */
let scrollY = window.scrollY
let currentSection = 0

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height);
})


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
    // camera.rotation.z = vecBrain[1] + 2.3;
    // camera.lookAt(vecBrain[0], vecBrain[1], vecBrain[2]);



    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

window.addEventListener('keydown', function(w){
    vecBrain[1] -= 0.01;
    console.log(vecBrain[1]);
});



tick()