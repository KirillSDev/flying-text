import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import './styles.css';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

//Canvas
const canvas = document.getElementById('webgl') as HTMLCanvasElement;


//Lights
const light = new THREE.AmbientLight( 0x404040, 10);
light.position.y = 5;


//Texture
const textureLoader = new THREE.TextureLoader();
const matcampTexture = textureLoader.load('./textures/matcaps/3.png');
matcampTexture.colorSpace = THREE.SRGBColorSpace;

//Meterial
const mainMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcampTexture
})


// //Mesh
// const boxMesh = new THREE.Mesh(box, mainMaterial);

const fontLoader = new FontLoader();
// Scene
const scene = new THREE.Scene();

scene.add(light);
fontLoader.load('./fonts/Heyhoo_Regular.json', 
    (font)=>{
        const textGeometry = new TextGeometry("Crazyyy :)", {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 16,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 6
            
        })
        textGeometry.center();
        const textMesh = new THREE.Mesh(textGeometry, mainMaterial);
       
        scene.add(textMesh);
    })



for(let i = 0; i < 100; i++){
    const random = () => (Math.random() - 0.5) * 10;
    const torus = new THREE.TorusGeometry(1, (Math.random() - 0.4), 16);  
    const torusMesh = new THREE.Mesh(torus, mainMaterial);  
    const scale = (Math.random() - 0.5) * 2
    torus.scale(scale, scale, scale);
    torusMesh.position.x = random();
    torusMesh.position.y = random();
    torusMesh.position.z = random();
    torusMesh.rotation.x = random();
    torusMesh.rotation.y = random();
    scene.add(torusMesh);
}

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





