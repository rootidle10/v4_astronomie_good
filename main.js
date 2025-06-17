// === Import Three.js & Modules ===
import {
  Object3D,
  Mesh,
  MeshBasicMaterial,
  CylinderGeometry,
  TextureLoader,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  BackSide,
  AmbientLight
} from 'three';
// lumière : 

import createLight from './systems/light';

import createBackground from './systems/background.js';

import { VRButton } from 'three/addons/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


import { createPlanet } from './components/Planets';
import createRings from './components/ring';
import Soleil from './components/Soleil';

import planetData from './planete.json';

import tunelle from './public/Universe_Starry_Sky_Space_HD_Nebula_1600x1200.jpg';
import earthImg from './public/earth.jpg';
import moonImg from './public/details-en-noir-et-blanc-du-concept-de-texture-de-lune.jpg';
import mercuryImg from './public/2k_mercury.jpg';
import venusImg from './public/2k_venus_surface.jpg';
import marsImg from './public/2k_mars.jpg';
import jupiterImg from './public/2k_jupiter.jpg';
import saturnImg from './public/2k_saturn.jpg';
import plutoImg from './public/2k_mars.jpg'; 

// === Scène de base ===
const container = document.getElementById('threeAppli');//recupére l'élément 
const scene = new Scene();


const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //champ de vision, rappord (calculer grace au dimention), une distance minimum, distance maximum
camera.position.set(0, 0, 0);//initialisation de la postion de la camera

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);//definit les dimention la taille du rendue, via les dimention  de l'écran
renderer.xr.enabled = true;//Active le support de la réalité virtuelle
container.appendChild(renderer.domElement);// relie le rendue a la balise html
document.body.appendChild(VRButton.createButton(renderer));//Ajoute un bouton VR

const controls = new OrbitControls(camera, renderer.domElement);//permet de bouger dans le systeme solaire avec la souris

// === Tunnel ===
const texture = new TextureLoader().load(tunelle); //textutre
const tunnelGeometry = new CylinderGeometry(6, 6, 300, 64, 1, true); //radiusTop, radiusBottom, hauteur,RadialSegments(plus de segment plus lice),heightSegments,openEnded(pour dire si ouvert)
const tunnelMaterial = new MeshBasicMaterial({ map: texture, side: BackSide });// backside = interieur
const cylinder = new Mesh(tunnelGeometry, tunnelMaterial);// crée le cylindre
cylinder.rotation.x = Math.PI / 2; //correspond donc à 90°, car 180° = π radians
cylinder.position.z = -120;//recule le cylindre
scene.add(cylinder);//ajout le cilyndre a la scéne

const clock = new Clock();//chronomètre
let solarSystemInitialized = false; 

// Réinitialise le tunnel en début de session VR
renderer.xr.addEventListener('sessionstart', () => {
  cylinder.position.z = -120;
  clock.start();
  solarSystemInitialized = false;
});




// === Système Solaire ===
function initSystemeSolaire() {

  //fond
  // const backgroundTexture = createBackground();
  // scene.background = backgroundTexture;
  
  //associe les texture
  const textureMap = {
    mercury: mercuryImg,
    venus: venusImg,
    mars: marsImg,
    jupiter: jupiterImg,
    saturn: saturnImg,
    pluto: plutoImg,
    neptune: mercuryImg,
    uranus: mercuryImg,
  };
  //ajout la lumière
  scene.add(createLight());
  //ajout soleil
  const soleil = new Soleil(1);
  scene.add(soleil);

  //planet
  const planets = [];
  const scaleFactor = 1 / 30000;
  const radiusFactor = 0.0001;

  planetData.forEach((planet) => {
    const orbitPivot = new Object3D();//axe
    scene.add(orbitPivot);

    const scaledRadius = planet.radius * radiusFactor;//dimension
    const scaledDistance = planet.distance * scaleFactor;//ecartement

    const planetMesh = createPlanet({
      texture: textureMap[planet.name] || earthImg, // applique la texture spécifique à la planète, ou celle de la Terre par défaut
      radius: scaledRadius, // applique un rayon mis à l’échelle
      rotationSpeed: 0.01 / planet.rotation_period, // calcule la vitesse de rotation selon la période de rotation réelle
    });

    if (planet.anneaux) { // vérifie si la planète a des anneaux (ex : Saturne)
  const ring = createRings(scaledRadius * 1.2, scaledRadius * 2); // crée les anneaux avec un rayon interne et externe basé sur la taille de la planète
  planetMesh.add(ring); // ajoute les anneaux à la planète
}


    planetMesh.position.set(scaledDistance, 0, 0); // place la planète à une certaine distance du soleil sur l’axe X
orbitPivot.add(planetMesh); // ajoute la planète à son pivot d’orbite (pour qu’elle tourne autour du soleil)


    planets.push({
  orbitPivot, // le pivot qui fait tourner la planète autour du soleil
  planetMesh, // le mesh 3D de la planète
  orbitSpeed: 0.8 / planet.orbital_period, // vitesse de révolution (autour du soleil) basée sur la période orbitale réelle
});


    if (planet.lune) { // si la planète a une lune
  const luneOrbit = new Object3D(); // crée un pivot d’orbite pour la lune
  planetMesh.add(luneOrbit); // attache l’orbite de la lune à la planète


       const lune = createPlanet({
    texture: moonImg, // texture de la lune
    radius: 0.15, // petit rayon pour la lune
    rotationSpeed: 0.01, // vitesse de rotation constante
  });

        lune.position.set(scaledRadius * 3, 0, 0); // place la lune à une certaine distance de la planète
  luneOrbit.add(lune); // ajoute la lune à son orbite


      planets.push({
        orbitPivot: luneOrbit,// pivot de révolution de la lune
        planetMesh: lune, // mesh 3D de la lune
        orbitSpeed: 0.01,// vitesse orbitale de la lune autour de la planète
      });
    }
  });

  function animateSystemeSolaire() { // fonction d’animation du système solaire
  soleil.tick(); // fait tourner le soleil sur lui-même (ou mise à jour visuelle)
  planets.forEach(({ orbitPivot, planetMesh, orbitSpeed }) => { // parcourt chaque planète (et lune)
    orbitPivot.rotation.y += orbitSpeed; // fait tourner la planète autour de son pivot (orbite)
    planetMesh.tick(); // fait tourner la planète sur elle-même
  });


    requestAnimationFrame(animateSystemeSolaire); // relance l’animation à la prochaine frame
  }

  animateSystemeSolaire();// lance l’animation du système solaire
}

// === Animation principale ===
renderer.setAnimationLoop(() => { // boucle de rendu continue
  const elapsed = clock.getElapsedTime(); // récupère le temps écoulé depuis le début

  if (elapsed < 4) { // si moins de 4 secondes sont passées
    cylinder.position.z += 0.8; // avance le tunnel pour créer une animation de voyage spatial
  }


    if (elapsed >= 4 && !solarSystemInitialized) { // une fois 4 secondes passées et le système non encore initialisé
    scene.remove(cylinder); // supprime le tunnel de la scène
    camera.position.set(0, 2, 5); // positionne la caméra pour voir le système solaire
    camera.lookAt(0, 0, 0); // oriente la caméra vers le centre de la scène (le Soleil)


       initSystemeSolaire(); // initialise le système solaire (création des planètes, etc.)
    solarSystemInitialized = true; // empêche l'initialisation de se refaire
  }


  renderer.render(scene, camera);
});
