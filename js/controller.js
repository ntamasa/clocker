import * as model from './model.js';
import { API_KEY } from './config.js';

import viewview from './views/View.js';
import btnView from './views/btnView.js';
import localClockView from './views/localClockView.js';
import globalClockView from './views/globalClockView.js';

// import "core-js/stable";
// import "regenerator-runtime/runtime";

const controlBtn = async function () {
  // Load form
};

const controlLocalTime = async function () {
  // Loading current location
  await model.loadLocation();

  // Loading local time
  await model._getLocalClock(API_KEY);

  // Render local objcet to the DOM
  localClockView.renderAll(model.state.clocks.local);
};

const controlWorldTime = async function () {
  // Load global time (UK/London time zone)
  await model.loadGlobalTime(API_KEY);

  // Render local object to the DOM
  globalClockView.render(model.state.clocks.global);
};

const controlAddedTime = async function () {
  await model._getAddedClock(API_KEY);
  // view.addHandlerForm();
};

const init = function () {
  localClockView.addHandlerRender(controlLocalTime);
  globalClockView.addHandlerRender(controlWorldTime);
};
init();
