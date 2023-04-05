import View from './View.js';
import { runEverySec, numberDigit2 } from '../helper.js';

class addedClockView extends View {
  _parentElement = document.querySelectorAll('.curve__middle');
  _btnIcon = document.querySelector('.icon');
  _errorMessage = 'error message';

  addHandlerRender(handler) {
    document.querySelector('.form__btn').addEventListener('click', handler);
  }

  _generateMarkup() {
    // If wrong data is given, middle circle turns blank
    if (Object.keys(this._data).length === Object.keys({}).length) {
      if (this._iterationCount === 1) {
        console.error('Wrong data given please try again!');
        // iteration is at the second element (country)
        return `Click the button in the top right, to add a time zone`; // If blank object is given in controller
      }
      // ELSE
      return '&nbsp;';
      // --NOT DONE-- Last successful form data from browser locale storage
    }

    // First element (zone)
    if (!this._iterationCount)
      return `
        UTC${this._data.zone >= 0 ? '+' : ''}${this._data.zone}
      `; // UTC+1

    // Second element (country)
    if (this._iterationCount === 1)
      return `
      ${this._data.country}
    `; // Hungary
  }

  // Function to update time in the DOM
  updateTime(data) {
    // Time, date elements in html
    const timeElement = document.querySelector('.curve__middle--time');
    const monthElement = document.querySelector('.curve__middle--month');
    const dayElement = document.querySelector('.curve__middle--day');

    // Function to update DOM
    const updateDOM = function () {
      // Clear
      timeElement.innerHTML = '';
      monthElement.innerHTML = '';
      dayElement.innerHTML = '';

      // Render current time to the DOM
      timeElement.insertAdjacentHTML(
        'afterbegin',
        `${numberDigit2(data.time.hour)}:${numberDigit2(
          data.time.minute
        )}:${numberDigit2(data.time.second)}`
      );

      // Render current date to the DOM
      monthElement.insertAdjacentHTML('afterbegin', `${data.date.month}`);
      dayElement.insertAdjacentHTML('afterbegin', `${data.date.day}`);
    };
    // Need to call once for immediate DOM update
    updateDOM();

    // Calling it in every second for the correct displayal of the time
    runEverySec(updateDOM);
  }
}

export default new addedClockView();
