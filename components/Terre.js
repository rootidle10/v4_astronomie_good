import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
} from 'three';
import img from '../assets/images/earth.jpg';

// Classe Terre qui hérite de Mesh (un objet 3D dans Three.js)
export default class Terre extends Mesh {
  // Constructeur qui reçoit un paramètre
  constructor() {
    const textureLoader = new TextureLoader(); //ajout texture
    const geometry = new SphereGeometry(0.5, 15, 15);{/*rayon ,segments horizontaux, segments verticaux */}
    const texture = textureLoader.load(img);
    const material = new MeshPhongMaterial({ map: texture }); 
    super(geometry, material);// Appel du constructeur parent Mesh avec la géométrie et le matériau créés
    this.rotation.z = 0.41;// Rotation sur l'axe Z
  }

  // Méthode tick qui sera appelée à chaque frame pour animer la Terre
  tick() {
    this.rotation.y += 0.03;// Fait tourner la Terre autour de son axe Y
    this.rotation.z = 0.41// rotation fixe sur l'axe Z
  }
}
