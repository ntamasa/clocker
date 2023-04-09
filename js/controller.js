import * as model from './model.js';
import { API_KEY } from './config.js';

import View from './views/View.js';
import btnView from './views/btnView.js';
import localClockView from './views/localClockView.js';
import globalClockView from './views/globalClockView.js';
import addedClockView from './views/addedClockView.js';
import { runEverySec } from './helper.js';

// import "core-js/stable";
// import "regenerator-runtime/runtime";

// Variable to keep track of btn clicks
let btnCounter = 0;

const controlLocalTime = async function () {
  try {
    // Render spinner, and be visible until data is loaded
    localClockView.renderSpinner();

    // Load current location
    await model.loadLocation();

    // Load local clock object
    await model.loadLocalClock(API_KEY);

    // Render local objcet to the DOM
    localClockView.renderAll(model.state.clocks.local);

    // Load time
    model.loadTime(model.state.clocks.local);

    // Remove spinner from the DOM
    localClockView.clearSpinner();

    // Update clock
    localClockView.updateTime(model.state.clocks.local);
  } catch (err) {
    console.error(err);
    localClockView.renderError();
  }
};

const controlWorldTime = async function () {
  try {
    // Render spinner, and be visible until data is loaded
    globalClockView.renderSpinner();

    // Load global time (UK/London time zone)
    await model.loadGlobalTime(API_KEY);

    // Render local object to the DOM
    globalClockView.render(model.state.clocks.global);

    // Load time
    model.loadTime(model.state.clocks.global);

    // Remove spinner from the DOM
    globalClockView.clearSpinner();

    // Update clock
    globalClockView.updateTime(model.state.clocks.global);
  } catch (err) {
    console.error(err);
    globalClockView.renderError();
  }
};

const controlAddedTime = async function () {
  try {
    // Render spinner, and be visible until data is loaded
    addedClockView.renderSpinner();

    // Load added clock
    await model.loadAddedClock(API_KEY);
    // Render added clock to the DOM
    addedClockView.renderAll(model.state.clocks.added);

    // Load time
    model.loadTime(model.state.clocks.added);

    // Remove spinner from the DOM
    addedClockView.clearSpinner();

    // Update clock
    addedClockView.updateTime(model.state.clocks.added);
  } catch (err) {
    console.error(err);
    addedClockView.renderError();
  }
};

const controlBtn = function () {
  // On click shows form if not visible
  btnView.toggleForm();
  btnView.toggleInputPos();
  // Change icon
  btnView.render();
};
// controlBtn();

const init = function () {
  localClockView.addHandlerRender(controlLocalTime);
  globalClockView.addHandlerRender(controlWorldTime);
  btnView.addHandlerRender(controlBtn);

  // On button click and if form is visible controlAddedTime is called
  document.querySelector('.form__btn').addEventListener('click', () => {
    // if form is visible (btn click isn't even nor 0)
    if (btnCounter % 2 !== 0) {
      controlAddedTime();
    }
    btnCounter++;
  });
};
init();
