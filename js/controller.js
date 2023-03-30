import * as model from './model.js';
import { API_KEY } from './config.js';

import viewview from './views/View.js';
import btnView from './views/btnView.js';
import localClockView from './views/localClockView.js';
import globalClockView from './views/globalClockView.js';

// import "core-js/stable";
// import "regenerator-runtime/runtime";

const controlBtn = function () {
  document
    .querySelector('.form__btn')
    .addEventListener('click', btnView.render);
  // Load form
  // Render form to the DOM
  // Check if every data needed is given
  // YES --> Hide form, controlAddedTime
  // NO --> Error alert, stay on form
};
controlBtn();

const controlLocalTime = async function () {
  // Load current location
  await model.loadLocation();

  // Load local time
  await model.getLocalClock(API_KEY);

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
  await model.getAddedClock(API_KEY);
  // Render added clock to the DOM
  // await model._getAddedClock(API_KEY);
  // view.addHandlerForm();
};
// controlAddedTime();

const init = function () {
  localClockView.addHandlerRender(controlLocalTime);
  globalClockView.addHandlerRender(controlWorldTime);
};
init();
