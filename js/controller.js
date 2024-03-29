import * as model from './model.js';
import { API_KEY } from './config.js';

import View from './views/View.js';
import btnView from './views/btnView.js';
import clearBtnView from './views/clearBtnView.js';
import localClockView from './views/localClockView.js';
import globalClockView from './views/globalClockView.js';
import addedClockView from './views/addedClockView.js';
import storedView from './views/storedView.js';
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

    // Render error to the DOM
    localClockView.renderError();

    // Remove spinner from the DOM
    localClockView.clearSpinner();
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

    // Render error to the DOM
    globalClockView.renderError();

    // Remove spinner from the DOM
    globalClockView.clearSpinner();
  }
};

const controlAddedTime = async function () {
  try {
    if (
      !document.querySelector('.form-box__country').value ||
      !document.querySelector('.form-box__city').value ||
      !document.querySelector('.form-box__continent').value
    )
      return addedClockView.renderError();
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

    // Save current to local storage
    model.saveZone(model.state.clocks.added);

    // On button click input fields are emptied
    btnView.clearInput();
  } catch (err) {
    console.error(err);

    // Render error to the DOM
    addedClockView.renderError();

    // Remove spinner from the DOM
    addedClockView.clearSpinner();
  }
};

const controlBtn = function () {
  // On click shows form if not visible
  btnView.toggleForm();
  btnView.togglePos();
  btnView.toggleIcon();
  // Change icon
  btnView.render();

  // // Render saved zones here also, to also show list when cleared and instantly added
  storedView.render();
};

const controlClearBtn = function () {
  // On click clears whole list
  clearBtnView.clearList();

  // Make list blank
  clearBtnView.render();
};

const controlSavedZones = function () {
  // Render saved zones
  storedView.render();

  // On click of element, load data to input fields
  storedView.loadSavedZone();
};

const init = function () {
  localClockView.addHandlerRender(controlLocalTime);
  globalClockView.addHandlerRender(controlWorldTime);
  btnView.addHandlerRender(controlBtn);
  clearBtnView.addHandlerRender(controlClearBtn);
  storedView.addHandlerRender(controlSavedZones);

  // On button click and if form is visible controlAddedTime is called
  document.querySelector('.btn__form').addEventListener('click', () => {
    // if form is visible (btn click isn't even nor 0)
    if (btnCounter % 2 !== 0) {
      controlAddedTime();
    }
    btnCounter++;
  });
};
init();
