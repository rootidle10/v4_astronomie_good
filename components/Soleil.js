import {
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  TextureLoader,
  PointLight,
  Object3D,
} from 'three';
import img from '../public/sun.jpg';

export default class Soleil extends Object3D {
  constructor(size) {
    super();// Appel au constructeur de la classe parente Object3D

    const textureLoader = new TextureLoader();
    const geometry = new SphereGeometry(size, 32, 32);{/*rayon ,segments horizontaux, segments verticaux */}
    const texture = textureLoader.load(img);
    const material = new MeshStandardMaterial({ map: texture, emissive: 0xffff00, emissiveIntensity: 0.9 });

    const sphere = new Mesh(geometry, material);
    const lumière = new PointLight(0xffffff, 1, 100);

    this.add(sphere);
    this.add(lumière);
  }

  tick() {
    this.rotation.y += 0.005;
  }
}
