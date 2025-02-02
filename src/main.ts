import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import './style.css';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.9;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
await new RGBELoader().loadAsync('img/venice_sunset_1k.hdr').then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.environmentIntensity = 0.5;
});
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft light
scene.add(ambientLight);
const roomMaterial = new THREE.MeshStandardMaterial({ color: 0x654321, roughness: 0.7, metalness: 0.1 });
const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), roomMaterial);
floor.rotateX(-Math.PI / 2);
floor.receiveShadow = true;
scene.add(floor);
const wallThickness = 0.5;
const wallHeight = 5;
const wallLength = 10;
const wallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness)
const wall1 = new THREE.Mesh(wallGeometry, roomMaterial) 
wall1.position.set(0, wallHeight / 2, -wallLength / 2)
wall1.castShadow = true
scene.add(wall1)
const wall2 = wall1.clone()
wall2.position.set(0, wallHeight / 2, wallLength / 2)
scene.add(wall2)
const wall3 = new THREE.Mesh(wallGeometry, roomMaterial)
wall3.scale.set(1, 1, 0.5) 
wall3.rotateY(Math.PI / 2)
wall3.position.set(-wallLength / 2, wallHeight / 2, 0)
scene.add(wall3)
const otherwallThickness = 0.5;
const otherwallHeight = 5;
const otherwallLength = 9;
const otherwallGeometry = new THREE.BoxGeometry(otherwallLength, otherwallHeight, otherwallThickness)
const wall4 = new THREE.Mesh(otherwallGeometry, roomMaterial) 
wall4.scale.set(1, 1, 0.5)
wall4.rotateY(Math.PI / 2)
wall4.position.set(wallLength / 2, wallHeight / 2, 2)
scene.add(wall4)
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
loader.load('models/my_desk.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(1.6, 1.6, 1.6);
  model1.position.set(4.3, 1.5, 0.5);
  model1.name = 'my_desk';
  model1.rotation.y = 3*Math.PI/2;
  clickableModels.push(model1);
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading Table model:', error);
});
loader.load('models/door.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(0.02, 0.022, 0.02);
  model1.position.set(wallLength / 2, wallHeight / 2, -3.5);
  model1.name = 'door';
  clickableModels.push(model1);
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading Door model:', error);
});
loader.load('models/paintcan.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(0.2, 0.2, 0.2);
  model1.position.set(2,0,0);
  model1.name = 'paintcan';
  clickableModels.push(model1);
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading painting model:', error);
});
loader.load('models/colorspot.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(100, 100, 100);
  model1.position.set(2,0,0);
  model1.name = 'colorspot';
  clickableModels.push(model1);
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading painting model:', error);
});
loader.load('models/caterpillar.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(4, 4, 4);
  model1.position.set(-4.5,2.4,4.5);
  model1.name = 'caterpillar';
  model1.rotation.y = Math.PI;
  clickableModels.push(model1);
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading painting model:', error);
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
loader.load('models/canvas.glb', (gltf) => {
  const model1 = gltf.scene
  model1.scale.set(1,1,1)
  model1.position.set(-4.5, 2, 3)
  model1.name = 'canvas';
  clickableModels.push(model1);
  scene.add(model1)
}, undefined, (error) => {
  console.error('Error loading .gltf model:', error)
})
loader.load('models/collage_wall.glb', (gltf) => {
  const model1 = gltf.scene
  model1.scale.set(4,4,4)
  model1.position.set(0, 2.5, 4.7)
  model1.name = 'collage_wall';
  model1.rotation.x = -Math.PI/2;
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
  model1.rotation.y = Math.PI;
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/colorpens.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(4, 4, 4);
  model1.position.set(-2,0.3, 1);
  model1.name = 'colorpens';
  model1.rotation.x = Math.PI;
  clickableModels.push(model1);
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/markers.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(0.3, 0.3, 0.3);
  model1.position.set(-2,0.3, 1);
  model1.name = 'markers';
  model1.rotation.x = Math.PI/2;
  clickableModels.push(model1);
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/papers.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(0.01, 0.01, 0.01);
  model1.position.set(0,0.3, 0);
  model1.name = 'color_palette';
  model1.rotation.x = 3*Math.PI/2;
  clickableModels.push(model1);
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/paintbrush.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(4, 4,4);
  model1.position.set(-2,0.3, 2);
  model1.name = 'paintbrush';
  model1.rotation.x = Math.PI/2;
  clickableModels.push(model1);
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/color palette.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(0.1, 0.1, 0.1);
  model1.position.set(-1,0.4, 0);
  model1.name = 'color_palette';
  model1.rotation.x = Math.PI/16;
  clickableModels.push(model1);
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/pencilcase.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(0.15, 0.15, 0.15);
  model1.position.set(3, 1.3, 4);
  model1.name = 'pencilcase';
  clickableModels.push(model1);
  model1.rotation.y = Math.PI;
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/cup_with_pencils.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(3, 3,3);
  model1.position.set(3.3, 1.3, 3.8);
  model1.name = 'pencils_cup';
  clickableModels.push(model1);
  model1.rotation.y = Math.PI;
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/pencil_case_model.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(0.03, 0.03,0.03);
  model1.position.set(3, 1.3, 3);
  model1.name = 'pencils_case_model';
  clickableModels.push(model1);
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
loader.load('models/painting2.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(0.3,0.3, 0.3);
  model1.position.set(-3, 3, -4.7);
  model1.name = 'mirror';
  clickableModels.push(model1);
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/painting3.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(0.01,0.01,0.01);
  model1.position.set(-4.5,3,0);
  model1.name = 'painting3';
  clickableModels.push(model1);
  model1.rotation.y = Math.PI/2;
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/rainbow.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(0.05,0.05,0.05);
  model1.position.set(-7.0,7,-2);
  model1.name = 'rainbow';
  clickableModels.push(model1);
  model1.rotation.y = Math.PI/2;
  scene.add(model1);
}, undefined, (error) => {
  console.error('Error loading .glb model:', error);
});
loader.load('models/painting.glb', (gltf) => {
  const model1 = gltf.scene;
  model1.scale.set(1, 1, 1);
  model1.position.set(-3,0,0);
  model1.name = 'painting';
  clickableModels.push(model1);
  model1.rotation.y = Math.PI/4;
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
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let shiftPressed = false;
window.addEventListener('keydown', (event) => {
  if (event.key === 'Shift') shiftPressed = true;
});
window.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') shiftPressed = false;
});
const boundingBoxes = clickableModels.map((model) => {
  const box = new THREE.Box3().setFromObject(model); 
  return box;
});

window.addEventListener('click', (event) => {
  if (!shiftPressed) return;
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickableModels, true);
  if (intersects.length === 0) {
    for (let i = 0; i < clickableModels.length; i++) {
      const model = clickableModels[i];
      const boundingBox = boundingBoxes[i];
      const intersectionPoint = new THREE.Vector3();
      const intersection = raycaster.ray.intersectBox(boundingBox, intersectionPoint);
      if (intersection) {
        const distance = intersectionPoint.distanceTo(model.position);
        if (distance < 2) {
          openGameWindow('Object Near', `You are near: ${model.name}`);
          break;
        }
      }
    }
  } else {
    const selectedModel = intersects[0].object;
    const modelName = selectedModel.parent?.name || "Unknown Object";
    if (!inventory.includes(modelName)) {
      addToInventory(modelName);
      scene.remove(selectedModel.parent as THREE.Object3D);
      openGameWindow('Item Collected', `You picked up: ${modelName}`);
    } else {
      openGameWindow('Object Selected', `You clicked on: ${modelName}`);
    }
  }
});

function openGameWindow(title: string, message: string): void {
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
    controls.lock();
  };
  windowDiv.appendChild(closeButton);
  document.body.appendChild(windowDiv);
}
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
crosshair.style.display = 'none';  
document.body.appendChild(crosshair);
controls.addEventListener('lock', () => {
  crosshair.style.display = 'block';  
});
controls.addEventListener('unlock', () => {
  crosshair.style.display = 'none';  
});
const keyMap: { [key: string]: boolean } = {};
document.addEventListener('keydown', (e) => (keyMap[e.code] = true));
document.addEventListener('keyup', (e) => (keyMap[e.code] = false));
const clock = new THREE.Clock();
function handleMovement(delta: number) {
  const speed = 5;
  const verticalSpeed = 3;
  if (keyMap['KeyW'] || keyMap['ArrowUp']) controls.moveForward(speed * delta);
  if (keyMap['KeyS'] || keyMap['ArrowDown']) controls.moveForward(-speed * delta);
  if (keyMap['KeyA'] || keyMap['ArrowLeft']) controls.moveRight(-speed * delta);
  if (keyMap['KeyD'] || keyMap['ArrowRight']) controls.moveRight(speed * delta);
  if (keyMap['Space']) camera.position.y += verticalSpeed * delta;
  if (keyMap['KeyX']) camera.position.y -= verticalSpeed * delta;
  const oldPosition = camera.position.clone();
  if (camera.position.y < 1.6) camera.position.y = 1.6;
  const roomHalfSize = 4.5;
  camera.position.x = Math.max(-roomHalfSize, Math.min(roomHalfSize, camera.position.x));
  camera.position.z = Math.max(-roomHalfSize, Math.min(roomHalfSize, camera.position.z));
}
const inventory: string[] = [];
const inventoryContainer = document.getElementById('inventory-items') as HTMLDivElement;
function addToInventory(itemName: string) {
  if (!inventory.includes(itemName)) {
    inventory.push(itemName);
    const itemElement = document.createElement('div');
    itemElement.classList.add('inventory-item');
    itemElement.textContent = itemName;
    itemElement.onclick = () => useItem(itemName);
    inventoryContainer.appendChild(itemElement);
  }
}
function useItem(itemName: string) {
  alert(`Using item: ${itemName}`);
}
const stats = new Stats();
document.body.appendChild(stats.dom);
const gui = new GUI({ width: 400 }).close();
const rendererFolder = gui.addFolder('Renderer');
rendererFolder.add(renderer, 'toneMappingExposure', 0, 2, 0.01);
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  handleMovement(delta);
  renderer.render(scene, camera);
  stats.update();
}

animate();
