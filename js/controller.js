import * as model from "./model.js";

// import "core-js/stable";
// import "regenerator-runtime/runtime";

const controlCurrentLocation = async function () {
  await model.getPosition();
};
controlCurrentLocation();
