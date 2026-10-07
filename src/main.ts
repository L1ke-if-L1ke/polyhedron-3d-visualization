import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// --------------------------------------------------
// 1. Сцена
// --------------------------------------------------

const scene = new THREE.Scene()

scene.background = new THREE.Color(0xf4f4f4)

// --------------------------------------------------
// 2. Камера
// --------------------------------------------------

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

camera.position.set(4, 3, 5)

// --------------------------------------------------
// 3. Renderer
// --------------------------------------------------

const renderer = new THREE.WebGLRenderer({
  antialias: true,
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

document.body.appendChild(renderer.domElement)

// --------------------------------------------------
// 4. Куб
// --------------------------------------------------

const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)

const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x6fa8dc,
  transparent: true,
  opacity: 0.45,
  side: THREE.DoubleSide,
})

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

scene.add(cube)

// --------------------------------------------------
// 5. Рёбра куба
// --------------------------------------------------

const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry)

const edgesMaterial = new THREE.LineBasicMaterial({
  color: 0x222222,
})

const edges = new THREE.LineSegments(
  edgesGeometry,
  edgesMaterial
)

scene.add(edges)

// --------------------------------------------------
// 6. Освещение
// --------------------------------------------------

const ambientLight = new THREE.AmbientLight(
  0xffffff,
  1.5
)

scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(
  0xffffff,
  2
)

directionalLight.position.set(5, 5, 5)

scene.add(directionalLight)

// --------------------------------------------------
// 7. Управление камерой
// --------------------------------------------------

const controls = new OrbitControls(
  camera,
  renderer.domElement
)

controls.enableDamping = true
controls.dampingFactor = 0.05

controls.target.set(0, 0, 0)

// --------------------------------------------------
// 8. Изменение размера окна
// --------------------------------------------------

window.addEventListener('resize', () => {
  camera.aspect =
    window.innerWidth / window.innerHeight

  camera.updateProjectionMatrix()

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  )
})

// --------------------------------------------------
// 9. Цикл рендеринга
// --------------------------------------------------

function animate() {
  controls.update()

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

animate()