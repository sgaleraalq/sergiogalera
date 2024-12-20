import * as THREE from "./three/build/three.module.js";
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js';

console.log('THREE REVISION: %c${THREE.REVISION}', 'color: red');
window.THREE = THREE;

const earthGlobe = document.getElementById("earth-globe");
const w = window.innerWidth
const h = window.innerHeight;
// const w = earthGlobe.clientWidth;
// const h = earthGlobe.clientHeight;


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
// earthGlobe.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
    map: loader.load('../textures/earthmap1k.jpg')
});

const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemiLight);

function animate() {
    requestAnimationFrame(animate);

    earthMesh.rotation.x += 0.001;
    earthMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
}

animate();

