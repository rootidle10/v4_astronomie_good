import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
} from 'three';
import img from '../assets/images/details-en-noir-et-blanc-du-concept-de-texture-de-lune.jpg';

export default class Lune extends Mesh {
  constructor() {
    const textureLoader = new TextureLoader();
    const geometry = new SphereGeometry(0.5, 15, 15);{/*rayon ,segments horizontaux, segments verticaux */}
    const texture = textureLoader.load(img);
    const material = new MeshPhongMaterial({ map: texture });
    super(geometry, material);
  }

  tick() {
    this.rotation.y += 0.03;
  }
}
