import View from './View.js';
import { numberDigit2, runEverySec } from '../helper.js';

class localClockView extends View {
  _parentElement = document.querySelectorAll('.curve__outer');
  _errorMessage = "Couldn't get your position"; // On error rendered to the UI the 'heading' part
  _errorRequest = 'Please refresh the page and enable location '; // On error rendered to the UI the 'sub' part

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // First element (zone)
    if (!this._iterationCount) {
      return `
        UTC${this._data.zone >= 0 ? '+' : '-'}${this._data.zone}
      `;
    }

    // Second element (country)
    if (this._iterationCount === 1) {
      return `
      ${this._data.country}
    `;
    }
  }

  updateTime(data) {
    // Time, date elements in html
    const timeElement = document.querySelector('.curve__outer--time');
    const monthElement = document.querySelector('.curve__outer--month');
    const dayElement = document.querySelector('.curve__outer--day');

    // Function to update DOM
    function updateDOM() {
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
    }
    // Need to call once for immediate DOM update
    updateDOM();

    // Calling it in every second for the correct displayal of the time
    runEverySec(updateDOM);
  }
}

export default new localClockView();
