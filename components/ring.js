import { RingGeometry, MeshBasicMaterial, Mesh, DoubleSide } from 'three';

function createRings(innerRadius, outerRadius) {
  const geometry = new RingGeometry(innerRadius, outerRadius, 64);
  const material = new MeshBasicMaterial({
    color: 0xffffff,
    side: DoubleSide,
    //transparent: true,
    opacity: 0.5,
  });
  const ring = new Mesh(geometry, material);
  ring.rotation.x = Math.PI / 2;
  return ring;
}

export default createRings