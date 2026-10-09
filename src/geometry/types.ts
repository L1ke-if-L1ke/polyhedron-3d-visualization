import * as THREE from 'three'

export interface Vertex {
  name: string
  position: THREE.Vector3
}

export interface Edge {
  start: string
  end: string
}

export interface Face {
  vertices: string[]
}

export interface Polyhedron {
  name: string
  vertices: Vertex[]
  edges: Edge[]
  faces: Face[]
}