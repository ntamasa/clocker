const world = Globe({ animateIn: false })(document.querySelector('.globe-box'))
  .globeImageUrl('../../img/globe/earth.jpg') // Globe image
  .showAtmosphere(false) // No shadow
  .backgroundColor('rgba(0,0,0,0)'); // No background (default = black)

// Dimensions needed to fit container merfectly
world.height(750).width(850);

// Getting current screen width
let width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

// Making globe responsible for every device (changing height property)
if (width > 1600) world.height(750);
if (width <= 1600) world.height(715);
if (width <= 1400) world.height(750);
if (width <= 1200) world.height(690);
if (width <= 950) world.height(750);
if (width <= 850) world.height(695);
if (width <= 800) world.height(675);
if (width <= 770) world.height(655);
if (width <= 700) world.height(605);
if (width <= 600) world.height(525);
if (width <= 550) world.height(460);
if (width <= 500) world.height(435);
if (width <= 450) world.height(390);
if (width <= 420) world.height(370);
if (width <= 390) world.height(360);
if (width <= 350) world.height(290);

// Listen for resize event so it works the same when on bigger screens you resize the page it adjusts to the new screen size
window.addEventListener('resize', () => {
  // Getting current screen width
  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  // Making globe responsible for every device (changing height property)
  if (width > 1600) world.height(750);
  if (width <= 1600) world.height(715);
  if (width <= 1400) world.height(750);
  if (width <= 1200) world.height(690);
  if (width <= 950) world.height(750);
  if (width <= 850) world.height(695);
  if (width <= 800) world.height(675);
  if (width <= 770) world.height(655);
  if (width <= 700) world.height(605);
  if (width <= 600) world.height(525);
  if (width <= 550) world.height(460);
  if (width <= 500) world.height(435);
  if (width <= 450) world.height(390);
  if (width <= 420) world.height(370);
  if (width <= 390) world.height(360);
  if (width <= 350) world.height(290);
});

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
