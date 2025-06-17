import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
} from 'three';
import img from '../assets/images/earth.jpg';

export default class Terre extends Mesh {
  constructor(size) {
    const textureLoader = new TextureLoader();
    const geometry = new SphereGeometry(0.5, 15, 15);
    const texture = textureLoader.load(img);
    const material = new MeshPhongMaterial({ map: texture });
    super(geometry, material);
    this.rotation.z = 0.41;
  }

  tick() {
    this.rotation.y += 0.03;
    this.rotation.z = 0.41;
  }
}
