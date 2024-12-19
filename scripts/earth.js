import * as THREE from "file:///C:/Users/D817238/Documents/other/three/build/three.js";

console.log('THREE REVISION: %c${THREE.REVISION}', 'color: red');
window.THREE = THREE;

const earthGlobe = document.getElementById("earth-globe");
// const w = window.innerWidth
// const h = window.innerHeight;
const w = earthGlobe.clientWidth;
const h = earthGlobe.clientHeight;


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
// document.body.appendChild(renderer.domElement);
earthGlobe.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemiLight);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

