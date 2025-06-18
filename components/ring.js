import { RingGeometry, MeshBasicMaterial, Mesh, DoubleSide } from 'three';

function createRings(innerRadius, outerRadius) {
  const geometry = new RingGeometry(innerRadius, outerRadius, 64);{/*interieur, exteireir, nombre d emotif*/}
  const material = new MeshBasicMaterial({
    color: 0xffffff,
    side: DoubleSide,
    opacity: 0.5,
  });
  const ring = new Mesh(geometry, material);
  ring.rotation.x = Math.PI / 2;
  return ring;
}

export default createRings