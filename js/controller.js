import * as model from './model.js';
import { API_KEY } from './config.js';

import viewview from './views/View.js';
import btnView from './views/btnView.js';
import localClockView from './views/localClockView.js';
import globalClockView from './views/globalClockView.js';
import addedClockView from './views/addedClockView.js';

// import "core-js/stable";
// import "regenerator-runtime/runtime";

const controlBtn = function () {
  // On click shows form if not visible
  btnView.toggleForm();
  btnView.toggleInputPos();
  // On click if visible
  ///// if data is invalid give error and still show form, do not call model.loadAddedClock
  ///// if data is valid hide form with animations, call model.loadAddedClock, clear input fields in the background
  // Load added clock to the DOM
};
// controlBtn();

const controlLocalTime = async function () {
  // Load current location
  await model.loadLocation();

  // Load local time
  await model.loadLocalClock(API_KEY);

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
  // Load added clock
  await model.loadAddedClock(API_KEY);
  // Render added clock to the DOM
  // await model._getAddedClock(API_KEY);
  // view.addHandlerForm();
};
// controlAddedTime();

const init = function () {
  localClockView.addHandlerRender(controlLocalTime);
  globalClockView.addHandlerRender(controlWorldTime);
  btnView.addHandlerRender(controlBtn);
  // addedClockView.addHandlerRender(controlAddedTime)
};
init();
