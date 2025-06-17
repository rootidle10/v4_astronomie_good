// components/Planets.js
import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
} from 'three';

/**
 * Crée une planète personnalisée.
 * @param {Object} options - Options de configuration
 * @param {string} options.texture - Chemin vers la texture
 * @param {number} options.radius - Rayon de la sphère
 * @param {number} options.segments - Segments de géométrie (défaut : 32)
 * @param {number} options.inclination - Inclinaison de l’axe (en radians)
 * @param {number} options.rotationSpeed - Vitesse de rotation journalière
 * @returns {Mesh & { tick: Function }} - Planète avec méthode tick()
 */
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
