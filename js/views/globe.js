const world = Globe({ animateIn: false })(document.querySelector('.globe-box'))
  .globeImageUrl('../../img/globe/earth.jpg') // Globe image
  .showAtmosphere(false) // No shadow
  .backgroundColor('rgba(0,0,0,0)') // No background (default = black)
  // Dimensions needed to fit container merfectly
  .height(750)
  .width(850);

// Auto-rotate
world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 1;

// Disable zooming in and out and also clicking and roating the globe by the user
world.controls().enabled = false;

// Zoon camera in to fit the circle perfectly
world.camera().zoom = 1.335;

// Add clouds sphere
const CLOUDS_IMG_URL = '../../img/globe/clouds.png'; // from https://github.com/turban/webgl-earth
const CLOUDS_ALT = 0.004;
const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(world.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
    new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
  );
  world.scene().add(clouds);

  (function rotateClouds() {
    clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
    requestAnimationFrame(rotateClouds);
  })();
});
