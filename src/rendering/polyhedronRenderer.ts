import * as THREE from 'three'
import type { Polyhedron } from '../geometry/types'

export function createPolyhedronMesh(
  polyhedron: Polyhedron
): THREE.Group {
  const group = new THREE.Group()

  const material = new THREE.MeshStandardMaterial({
    color: 0x6fa8dc,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
    depthWrite: false,
  })

  // Создаём карту вершин для быстрого поиска
  const vertexMap = new Map(
    polyhedron.vertices.map((vertex) => [
      vertex.name,
      vertex.position,
    ])
  )

  // Перебираем грани многогранника
  polyhedron.faces.forEach((face) => {
    const positions: number[] = []

    const points = face.vertices.map((name) => {
      const position = vertexMap.get(name)

      if (!position) {
        throw new Error(`Вершина ${name} не найдена`)
      }

      return position
    })

    // Разбиваем выпуклую грань на треугольники
    for (let i = 1; i < points.length - 1; i++) {
      const triangle = [
        points[0],
        points[i],
        points[i + 1],
      ]

      triangle.forEach((point) => {
        positions.push(point.x, point.y, point.z)
      })
    }

    const geometry = new THREE.BufferGeometry()

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    )

    geometry.computeVertexNormals()

    const mesh = new THREE.Mesh(geometry, material)

    group.add(mesh)
  })

  return group
}