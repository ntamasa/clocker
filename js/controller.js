import * as model from './model.js';
import { API_KEY } from './config.js';

import view from './views/viewOLD.js';
import viewview from './views/View.js';
import btnView from './views/btnView.js';
import localClockView from './views/localClockView.js';

// import "core-js/stable";
// import "regenerator-runtime/runtime";

const controlLocalTime = async function () {
  // Loading current location
  await model.loadLocation();

  // Loading local time
  await model._getLocalClock(API_KEY);

  // Render local objcet to the DOM
  localClockView.renderAll(model.state.clocks.local);
};
controlLocalTime();

const controlWorldTime = async function () {
  await model._getWorldClock(API_KEY);
};

const controlAddedTime = async function () {
  await model._getAddedClock(API_KEY);
  // view.addHandlerForm();
};

const init = function () {
  // btnView.addHandlerRender(controlAddedTime);
  // controlLocalTime();
  // controlWorldTime();
  // controlAddedTime();
};
init();
