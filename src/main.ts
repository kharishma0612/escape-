
// import * as THREE from 'three';
// import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// import Stats from 'three/addons/libs/stats.module.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Import GLTFLoader
// import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// import './style.css';

// const scene = new THREE.Scene()

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// camera.position.set(0, 1.6, 5) // Camera starts inside the room

// const light = new THREE.DirectionalLight(0xffffff, 1)
// light.castShadow = true
// light.shadow.camera.far = 50
// light.shadow.camera.left = -10
// light.shadow.camera.right = 10
// light.shadow.camera.top = 10
// light.shadow.camera.bottom = -10
// light.shadow.blurSamples = 10
// light.shadow.radius = 5
// light.position.set(10, 20, 10)
// scene.add(light)

// // Renderer
// const renderer = new THREE.WebGLRenderer({ antialias: true })
// renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMappingExposure = 0.9
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// document.body.appendChild(renderer.domElement)

// // Environment Map
// await new RGBELoader().loadAsync('img/venice_sunset_1k.hdr').then((texture) => {
//   texture.mapping = THREE.EquirectangularReflectionMapping
//   scene.environment = texture
//   scene.environmentIntensity = 0.5
// })

// // Walls and Floor
// const roomMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.7, metalness: 0.1 })

// // Floor
// const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), roomMaterial)
// floor.rotateX(-Math.PI / 2) // Horizontal floor
// floor.receiveShadow = true
// scene.add(floor)

// // Walls (4 sides)
// const wallThickness = 0.5
// const wallHeight = 5
// const wallLength = 10

// const wallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness)
// const wall1 = new THREE.Mesh(wallGeometry, roomMaterial) // Back wall
// wall1.position.set(0, wallHeight / 2, -wallLength / 2)
// wall1.castShadow = true
// scene.add(wall1)

// const wall2 = wall1.clone() // Front wall
// wall2.position.set(0, wallHeight / 2, wallLength / 2)
// scene.add(wall2)

// const wall3 = new THREE.Mesh(wallGeometry, roomMaterial) // Left wall
// wall3.scale.set(1, 1, 0.5) // Adjust thickness for side walls
// wall3.rotateY(Math.PI / 2)
// wall3.position.set(-wallLength / 2, wallHeight / 2, 0)
// scene.add(wall3)

// const wall4 = wall3.clone() // Right wall
// wall4.position.set(wallLength / 2, wallHeight / 2, 0)
// scene.add(wall4)
// const clickableModels: THREE.Object3D[] = [];

// // GLTF Model Loader
// const loader = new GLTFLoader()
// loader.load('models/Lantern.glb', (gltf) => {
//   const model1 = gltf.scene
//   model1.scale.set(0.1,0.1,0.1)
//   model1.position.set(-4.5, 0, 4.5)
//   scene.add(model1)
// }, undefined, (error) => {
//   console.error('Error loading .gltf model:', error)
// })
// loader.load('models/table.glb', (gltf) => {
//   const model1 = gltf.scene
//   model1.scale.set(1.5,1.5,1.5)
//   model1.position.set(4, 0, 4)
//   scene.add(model1)
//   model1.name = 'table'; 
//   clickableModels.push(model1); 
// }, undefined, (error) => {
//   console.error('Error loading .gltf model:', error)
// })
// loader.load('models/GlamVelvetSofa.glb', (gltf) => {
//   const model1 = gltf.scene;
//   model1.scale.set(2, 2, 2);
//   model1.position.set(0, 0, 4);

//   // Rotate the model by 180 degrees around the Y-axis
//   model1.rotation.y = Math.PI;

//   scene.add(model1);
// }, undefined, (error) => {
//   console.error('Error loading .glb model:', error);
// });
// loader.load('models/DiffuseTransmissionPlant.glb', (gltf) => {
//   const model1 = gltf.scene;
//   model1.scale.set(2, 2, 2);
//   model1.position.set(3, 1.2, 4);

//   // Rotate the model by 180 degrees around the Y-axis
//   model1.rotation.y = Math.PI;

//   scene.add(model1);
// }, undefined, (error) => {
//   console.error('Error loading .glb model:', error);
// });
// loader.load('models/GlassBrokenWindow.glb', (gltf) => {
//   const model1 = gltf.scene;
//   model1.scale.set(2, 2, 2);
//   model1.position.set(3, 1.5, -4.5);


//   scene.add(model1);
// }, undefined, (error) => {
//   console.error('Error loading .glb model:', error);
// });
// loader.load('models/SheenWoodLeatherSofa.glb', (gltf) => {
//   const model1 = gltf.scene;
//   model1.scale.set(2, 2, 2);
//   model1.position.set(-1, 0, -4.2);


//   scene.add(model1);
// }, undefined, (error) => {
//   console.error('Error loading .glb model:', error);
// });

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
// let shiftPressed = false; // Track if the shift key is pressed

// // Add an event listener for keydown to check when Shift is pressed
// window.addEventListener('keydown', (event) => {
//   if (event.key === 'Shift') {
//     shiftPressed = true;
//   }
// });

// // Add an event listener for keyup to check when Shift is released
// window.addEventListener('keyup', (event) => {
//   if (event.key === 'Shift') {
//     shiftPressed = false;
//   }
// });

// // Add the click event listener for the mouse
// window.addEventListener('click', (event) => {
//   if (!shiftPressed) return; // Only proceed if the Shift key is pressed

//   // Normalize mouse coordinates to -1 to 1 range
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   // Update raycaster based on camera and mouse position
//   raycaster.setFromCamera(mouse, camera);

//   // Check for intersections with clickable models
//   const intersects = raycaster.intersectObjects(clickableModels, true);

//   if (intersects.length > 0) {
//     const selectedModel = intersects[0].object;

//     // For example, if the selected model is the 'Lantern', open a small window
//     if (selectedModel.parent?.name === 'table') {
//       openGameWindow('Table', 'You clicked on the table!');
//     } else if (selectedModel.parent?.name === 'Sofa') {
//       openGameWindow('Sofa Information', 'You clicked on the sofa!');
//     }
//   }
// });

// function openGameWindow(title: string, message: string): void {
//   // Create a small window or UI element displaying the information
//   const windowDiv = document.createElement('div');
//   windowDiv.style.position = 'absolute';
//   windowDiv.style.top = '50px';
//   windowDiv.style.left = '50px';
//   windowDiv.style.width = '300px';
//   windowDiv.style.height = '200px';
//   windowDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
//   windowDiv.style.color = 'white';
//   windowDiv.style.padding = '10px';
//   windowDiv.style.borderRadius = '10px';
//   windowDiv.style.zIndex = '10';

//   // Add title and message to the window
//   const titleElement = document.createElement('h2');
//   titleElement.textContent = title;
//   windowDiv.appendChild(titleElement);

//   const messageElement = document.createElement('p');
//   messageElement.textContent = message;
//   windowDiv.appendChild(messageElement);

//   // Append the window to the body
//   document.body.appendChild(windowDiv);

//   // Optionally, add a close button
//   const closeButton = document.createElement('button');
//   closeButton.textContent = 'Close';
//   closeButton.style.marginTop = '10px';
//   closeButton.onclick = () => {
//     document.body.removeChild(windowDiv);
//   };
//   windowDiv.appendChild(closeButton);
// }

// // Pointer Lock Controls
// const menuPanel = document.getElementById('menuPanel') as HTMLDivElement
// const startButton = document.getElementById('startButton') as HTMLButtonElement

// const controls = new PointerLockControls(camera, renderer.domElement)
// controls.addEventListener('lock', () => (menuPanel.style.display = 'none'))
// controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'))
// startButton.addEventListener('click', () => controls.lock())

// // Handle resizing
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight
//   camera.updateProjectionMatrix()
//   renderer.setSize(window.innerWidth, window.innerHeight)
// })

// // Key Input for Movement
// const keyMap: { [key: string]: boolean } = {}
// document.addEventListener('keydown', (e) => (keyMap[e.code] = true))
// document.addEventListener('keyup', (e) => (keyMap[e.code] = false))

// // FPS Movement
// const clock = new THREE.Clock()
// function handleMovement(delta: number) {
//   const speed = 5 // Movement speed

//   if (keyMap['KeyW'] || keyMap['ArrowUp']) controls.moveForward(speed * delta)
//   if (keyMap['KeyS'] || keyMap['ArrowDown']) controls.moveForward(-speed * delta)
//   if (keyMap['KeyA'] || keyMap['ArrowLeft']) controls.moveRight(-speed * delta)
//   if (keyMap['KeyD'] || keyMap['ArrowRight']) controls.moveRight(speed * delta)
// }

// // Stats
// const stats = new Stats()
// document.body.appendChild(stats.dom)

// // GUI
// const gui = new GUI({ width: 400 }).close()
// const rendererFolder = gui.addFolder('Renderer')
// rendererFolder.add(renderer, 'toneMappingExposure', 0, 2, 0.01)

// function animate() {
//   requestAnimationFrame(animate)

//   const delta = clock.getDelta()
//   handleMovement(delta)

//   renderer.render(scene, camera)
//   stats.update()
// }

// animate()
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import './style.css';

// Scene Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5); // Camera starts inside the room

const light = new THREE.DirectionalLight(0xffffff, 1);
light.castShadow = true;
light.position.set(10, 20, 10);
scene.add(light);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.9;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Environment Map
await new RGBELoader().loadAsync('img/venice_sunset_1k.hdr').then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.environmentIntensity = 0.5;
});

// Floor and Walls Setup
const roomMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.7, metalness: 0.1 });

// Floor
const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), roomMaterial);
floor.rotateX(-Math.PI / 2);
floor.receiveShadow = true;
scene.add(floor);

// Walls
const wallThickness = 0.5;
const wallHeight = 5;
const wallLength = 10;

const wallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness)
const wall1 = new THREE.Mesh(wallGeometry, roomMaterial) // Back wall
wall1.position.set(0, wallHeight / 2, -wallLength / 2)
wall1.castShadow = true
scene.add(wall1)

const wall2 = wall1.clone() // Front wall
wall2.position.set(0, wallHeight / 2, wallLength / 2)
scene.add(wall2)

const wall3 = new THREE.Mesh(wallGeometry, roomMaterial) // Left wall
wall3.scale.set(1, 1, 0.5) // Adjust thickness for side walls
wall3.rotateY(Math.PI / 2)
wall3.position.set(-wallLength / 2, wallHeight / 2, 0)
scene.add(wall3)

const otherwallThickness = 0.5;
const otherwallHeight = 5;
const otherwallLength = 6;
const otherwallGeometry = new THREE.BoxGeometry(otherwallLength, otherwallHeight, otherwallThickness)
const wall4 = new THREE.Mesh(otherwallGeometry, roomMaterial) 
wall4.scale.set(1, 1, 0.5)// Right wall
wall4.rotateY(Math.PI / 2)
wall4.position.set(wallLength / 2, wallHeight / 2, 2)
scene.add(wall4)


// GLTF Models (Example Models)
const loader = new GLTFLoader();

const clickableModels: THREE.Object3D[] = [];

loader.load('models/table.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(1.5, 1.5, 1.5);
  model1.position.set(4, 0, 4);
  model1.name = 'table';
  clickableModels.push(model1);
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading Table model:', error);
});

loader.load('models/Lantern.glb', (gltf) => {
  const model1 = gltf.scene
  model1.scale.set(0.1,0.1,0.1)
  model1.position.set(-4.5, 0, 4.5)
  model1.name = 'Lantern';
  clickableModels.push(model1);
  scene.add(model1)
}, undefined, (error) => {
  console.error('Error loading .gltf model:', error)
})
loader.load('models/GlamVelvetSofa.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(2, 2, 2);
  model1.position.set(0, 0, 4);
  model1.name = 'GlamVelvetSofa';
  clickableModels.push(model1);
  // Rotate the model by 180 degrees around the Y-axis
  model1.rotation.y = Math.PI;

  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/DiffuseTransmissionPlant.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(2, 2, 2);
  model1.position.set(3, 1.2, 4);
  model1.name = 'plant';
  clickableModels.push(model1);
  // Rotate the model by 180 degrees around the Y-axis
  model1.rotation.y = Math.PI;

  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});

loader.load('models/old_key.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(2, 2, 2);
  model1.position.set(3., 1.5, 4);
  model1.name = 'key';
  clickableModels.push(model1);
  // Rotate the model by 180 degrees around the Y-axis
  model1.rotation.y = Math.PI/4;

  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});

loader.load('models/GlassBrokenWindow.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(2, 2, 2);
  model1.position.set(3, 1.5, -4.5);
  model1.name = 'mirror';
  clickableModels.push(model1);

  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/SheenWoodLeatherSofa.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(2, 2, 2);
  model1.position.set(-1, 0, -4.2);
  model1.name = 'sheenWoodLeatherSofa';
  clickableModels.push(model1);

  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});


// Raycasting and Mouse Events
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let shiftPressed = false;

window.addEventListener('keydown', (event) => {
  if (event.key === 'Shift') shiftPressed = true;
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') shiftPressed = false;
});
// Create a bounding box for each model
const boundingBoxes = clickableModels.map((model) => {
  const box = new THREE.Box3().setFromObject(model); // Get bounding box for the model
  return box;
});

// Update raycaster logic to check proximity
window.addEventListener('click', (event) => {
  if (!shiftPressed) return;

  // Update the mouse position
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Cast the ray from the camera
  raycaster.setFromCamera(mouse, camera);
  
  // Check for intersections with the models directly
  const intersects = raycaster.intersectObjects(clickableModels, true);
  
  // If no exact intersection, check for proximity using bounding boxes
  if (intersects.length === 0) {
    for (let i = 0; i < clickableModels.length; i++) {
      const model = clickableModels[i];
      const boundingBox = boundingBoxes[i];
      
      // Check if the ray intersects the bounding box using intersectBox()
      const intersectionPoint = new THREE.Vector3();
      const intersection = raycaster.ray.intersectBox(boundingBox, intersectionPoint);
      
      if (intersection) {
        // Calculate distance from ray's intersection point to the center of the model
        const distance = intersectionPoint.distanceTo(model.position);
        
        // If the intersection point is within a certain proximity distance
        if (distance < 2) {
          openGameWindow('Object Near', `You are near: ${model.name}`);
          break; // Exit loop as soon as a nearby object is found
        }
      }
    }
  } else {
    // If the ray directly intersects with the model, show the selected object
    const selectedModel = intersects[0].object;
    openGameWindow('Object Selected', `You clicked on: ${selectedModel.parent?.name}`);
  }
});

// Function to open in-game window with object info
function openGameWindow(title: string, message: string): void {
  // Unlock pointer when game window is opened
  controls.unlock();

  const windowDiv = document.createElement('div');
  windowDiv.style.position = 'absolute';
  windowDiv.style.top = '50px';
  windowDiv.style.left = '50px';
  windowDiv.style.width = '300px';
  windowDiv.style.height = '200px';
  windowDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  windowDiv.style.color = 'white';
  windowDiv.style.padding = '10px';
  windowDiv.style.borderRadius = '10px';
  windowDiv.style.zIndex = '10';

  const titleElement = document.createElement('h2');
  titleElement.textContent = title;
  windowDiv.appendChild(titleElement);

  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  windowDiv.appendChild(messageElement);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.marginTop = '10px';
  closeButton.onclick = () => {
    document.body.removeChild(windowDiv);
    // Re-lock pointer when closing the window
    controls.lock();
  };
  windowDiv.appendChild(closeButton);

  document.body.appendChild(windowDiv);
}


// Pointer Lock Controls Setup
const menuPanel = document.getElementById('menuPanel') as HTMLDivElement;
const startButton = document.getElementById('startButton') as HTMLButtonElement;

const controls = new PointerLockControls(camera, renderer.domElement);
controls.addEventListener('lock', () => (menuPanel.style.display = 'none'));
controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'));
startButton.addEventListener('click', () => controls.lock());

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Crosshair UI Element
const crosshair = document.createElement('div');
crosshair.style.position = 'absolute';
crosshair.style.top = '50%';
crosshair.style.left = '50%';
crosshair.style.width = '10px';
crosshair.style.height = '10px';
crosshair.style.backgroundColor = 'red';
crosshair.style.borderRadius = '50%';
crosshair.style.transform = 'translate(-50%, -50%)';
crosshair.style.zIndex = '10';
crosshair.style.display = 'none';  // Initially hidden
document.body.appendChild(crosshair);

// Show Crosshair When Pointer is Locked
controls.addEventListener('lock', () => {
  crosshair.style.display = 'block';  // Show crosshair when locked
});

controls.addEventListener('unlock', () => {
  crosshair.style.display = 'none';  // Hide crosshair when unlocked
});

// Movement Controls
const keyMap: { [key: string]: boolean } = {};
document.addEventListener('keydown', (e) => (keyMap[e.code] = true));
document.addEventListener('keyup', (e) => (keyMap[e.code] = false));

const clock = new THREE.Clock();
function handleMovement(delta: number) {
  const speed = 5;
  if (keyMap['KeyW'] || keyMap['ArrowUp']) controls.moveForward(speed * delta);
  if (keyMap['KeyS'] || keyMap['ArrowDown']) controls.moveForward(-speed * delta);
  if (keyMap['KeyA'] || keyMap['ArrowLeft']) controls.moveRight(-speed * delta);
  if (keyMap['KeyD'] || keyMap['ArrowRight']) controls.moveRight(speed * delta);
}

// Stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// GUI for Settings
const gui = new GUI({ width: 400 }).close();
const rendererFolder = gui.addFolder('Renderer');
rendererFolder.add(renderer, 'toneMappingExposure', 0, 2, 0.01);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  handleMovement(delta);
  renderer.render(scene, camera);
  stats.update();
}

animate();
