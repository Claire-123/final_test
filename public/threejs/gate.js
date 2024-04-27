import * as THREE from '/build/three.module.js';
import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)
const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('canvas-container').appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

const loader = new GLTFLoader();
loader.load('../assets/arch.glb', function (gltf) {
    const model = gltf.scene;
    model.position.set(0, 0, 0); 
    model.scale.set(0.01, 0.01, 0.01); 
    scene.add(model); 
}, undefined, function (error) {
    console.error('An error happened loading the model.', error);
});


window.onload=()=>{
	animate()
}

function animate(){
    requestAnimationFrame(animate)
	cube.rotation.x += 0.01
	cube.rotation.y += 0.01
	renderer.render(scene, camera)
}