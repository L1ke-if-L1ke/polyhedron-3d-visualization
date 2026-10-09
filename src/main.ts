import './style.css'
import { createCube } from './geometry/cube'
import { createPolyhedronMesh } from './rendering/polyhedronRenderer'

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {
  CSS2DObject,
  CSS2DRenderer,
} from 'three/addons/renderers/CSS2DRenderer.js'

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

const labelRenderer = new CSS2DRenderer()

labelRenderer.setSize(
  window.innerWidth,
  window.innerHeight
)

labelRenderer.domElement.style.position = 'absolute'
labelRenderer.domElement.style.top = '0'
labelRenderer.domElement.style.left = '0'
labelRenderer.domElement.style.pointerEvents = 'none'

document.body.appendChild(
  labelRenderer.domElement
)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

document.body.appendChild(renderer.domElement)

// --------------------------------------------------
// 4. Куб
// --------------------------------------------------

type Vertex = {
  name: string
  position: THREE.Vector3
}

const cubeModel = createCube()

const vertices = cubeModel.vertices

// --------------------------------------------------
// Поверхности куба из математической модели
// --------------------------------------------------

const cubeMesh = createPolyhedronMesh(cubeModel)

scene.add(cubeMesh)

// --------------------------------------------------
// 5. Рёбра куба
// --------------------------------------------------

const edgePoints: THREE.Vector3[] = []

cubeModel.edges.forEach((edge) => {
  const startVertex = cubeModel.vertices.find(
    (vertex) => vertex.name === edge.start
  )

  const endVertex = cubeModel.vertices.find(
    (vertex) => vertex.name === edge.end
  )

  if (!startVertex || !endVertex) {
    throw new Error(
      `Не найдены вершины ребра ${edge.start}-${edge.end}`
    )
  }

  edgePoints.push(
    startVertex.position,
    endVertex.position
  )
})

const edgesGeometry = new THREE.BufferGeometry()
  .setFromPoints(edgePoints)

const edgesMaterial = new THREE.LineBasicMaterial({
  color: 0x222222,
})

const edges = new THREE.LineSegments(
  edgesGeometry,
  edgesMaterial
)

scene.add(edges)

// --------------------------------------------------
// Вершины куба и их подписи
// --------------------------------------------------

const vertexGeometry = new THREE.SphereGeometry(
  0.06,
  16,
  16
)

const vertexMaterial = new THREE.MeshBasicMaterial({
  color: 0x111111,
})

cubeModel.vertices.forEach((vertex) => {
  // Отображаем вершину
  const point = new THREE.Mesh(
    vertexGeometry,
    vertexMaterial
  )

  point.position.copy(vertex.position)
  scene.add(point)

  // Создаём подпись вершины
  const labelElement = document.createElement('div')

  labelElement.className = 'vertex-label'
  labelElement.textContent = vertex.name

  const label = new CSS2DObject(labelElement)

  label.position.copy(vertex.position)
  label.position.y += 0.12

  scene.add(label)
})


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

  labelRenderer.setSize(
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
  labelRenderer.render(scene, camera)

  requestAnimationFrame(animate)
}

animate()