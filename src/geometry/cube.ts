import * as THREE from 'three'
import type { Polyhedron } from './types'

export function createCube(): Polyhedron {
  return {
    name: 'Куб',

    vertices: [
      { name: 'A', position: new THREE.Vector3(-1, -1, 1) },
      { name: 'B', position: new THREE.Vector3(1, -1, 1) },
      { name: 'C', position: new THREE.Vector3(1, -1, -1) },
      { name: 'D', position: new THREE.Vector3(-1, -1, -1) },

      { name: 'A1', position: new THREE.Vector3(-1, 1, 1) },
      { name: 'B1', position: new THREE.Vector3(1, 1, 1) },
      { name: 'C1', position: new THREE.Vector3(1, 1, -1) },
      { name: 'D1', position: new THREE.Vector3(-1, 1, -1) },
    ],

    edges: [
      // Нижнее основание
      { start: 'A', end: 'B' },
      { start: 'B', end: 'C' },
      { start: 'C', end: 'D' },
      { start: 'D', end: 'A' },

      // Верхнее основание
      { start: 'A1', end: 'B1' },
      { start: 'B1', end: 'C1' },
      { start: 'C1', end: 'D1' },
      { start: 'D1', end: 'A1' },

      // Боковые рёбра
      { start: 'A', end: 'A1' },
      { start: 'B', end: 'B1' },
      { start: 'C', end: 'C1' },
      { start: 'D', end: 'D1' },
    ],

    faces: [
      { vertices: ['A', 'D', 'C', 'B'] },
      { vertices: ['A1', 'B1', 'C1', 'D1'] },

      { vertices: ['A', 'B', 'B1', 'A1'] },
      { vertices: ['B', 'C', 'C1', 'B1'] },
      { vertices: ['C', 'D', 'D1', 'C1'] },
      { vertices: ['D', 'A', 'A1', 'D1'] },
    ],
  }
}