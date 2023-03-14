import * as model from "./model.js";
import { API_KEY_GEO } from "./config.js";

// import "core-js/stable";
// import "regenerator-runtime/runtime";

const controlCurrentLocation = async function () {
  await model._getPosition();
  model._API(API_KEY_GEO);
};
controlCurrentLocation();
