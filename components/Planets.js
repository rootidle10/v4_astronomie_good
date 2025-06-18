// components/Planets.js
import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
} from 'three';


export function createPlanet({
  texture,
  radius = 0.5,
  segments = 32,
  inclination = 0,
  rotationSpeed = 0.01,
}) {
  const loader = new TextureLoader();
  const geometry = new SphereGeometry(radius, segments, segments);
  const tex = loader.load(texture);
  const material = new MeshPhongMaterial({ map: tex });

  const mesh = new Mesh(geometry, material);
  mesh.rotation.z = inclination;

  // Ajoute une méthode tick pour l'animation
  mesh.tick = () => {
    mesh.rotation.y += rotationSpeed;
  };

  return mesh;
}
