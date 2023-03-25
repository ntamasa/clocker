import * as model from "./model.js";
import { API_KEY } from "./config.js";

import view from "./views/view.js";

// import "core-js/stable";
// import "regenerator-runtime/runtime";

const controlLocalTime = async function () {
  await model._getLocalClock(API_KEY);
};

const controlWorldTime = async function () {
  await model._getWorldClock(API_KEY);
};

const controlAddedTime = async function () {
  await model._getAddedClock(API_KEY);
  view.addHandlerForm();
};

const init = function () {
  controlLocalTime();
  controlWorldTime();
  controlAddedTime();
};
init();
