import * as model from "./model.js";
import { API_KEY } from "./config.js";

import view from "./views/view.js";

// import "core-js/stable";
// import "regenerator-runtime/runtime";

const controlLocalTime = async function () {
  await model._getLocalClock(API_KEY);
};
controlLocalTime();

const controlWorldTime = async function () {
  await model._getWorldClock(API_KEY);
};
controlWorldTime();

const controlAddedTime = async function () {
  await model._getAddedClock(API_KEY);
};
controlAddedTime();
