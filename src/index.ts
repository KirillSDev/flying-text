import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './styles.css';

//Canvas
const canvas = document.getElementById('webgl') as HTMLCanvasElement;



//Geometry
const box = new THREE.BoxGeometry(1, 1, 1);

//Meterial
const mainMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
})


//Mesh
const boxMesh = new THREE.Mesh(box, mainMaterial);

// Scene
const scene = new THREE.Scene();

scene.add(boxMesh);


// Object
const mainData = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// camera
const camera = new THREE.PerspectiveCamera(70, mainData.width / mainData.height); 
camera.position.z = 4;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(mainData.width, mainData.height);

window.addEventListener('resize', () => {
    mainData.height = window.innerHeight;
    mainData.width = window.innerWidth;
    camera.aspect = mainData.width / mainData.height;
    camera.updateProjectionMatrix();
    renderer.setSize(mainData.width, mainData.height);


})

const tick = () => {
    controls.update();
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
}


tick();





