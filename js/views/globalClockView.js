import View from './View.js';
import { numberDigit2, runEverySec } from '../helper.js';

class globalClockView extends View {
  _parentElement = document.querySelector('.clocks__data');
  _errorMessage = 'Too many requests'; // On error rendered to the UI the 'heading' part
  _errorRequest = 'Please wait a little, then refresh the page!'; // On error rendered to the UI the 'sub' part

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return `
          <div class="clocks__details">
          <span class="clocks__zone clocks__zone-global">UTC${
            this._data.zone >= 0 ? '+' : '-'
          }${this._data.zone}</span>
                <span class="clocks__country clocks__country-global"
                  >${this._data.country}</span
                >
          </div>

          <!-- Month -->
          <span class="clocks__date clocks__date-global">${
            this._data.date.month
          } ${this._data.date.day}</span>

          <!-- Time -->
          <span class="clocks__time clocks__time-global">${
            this._data.time.hour
          }:${this._data.time.minute}</span>
    `;
  }

  // Function to update time in the DOM
  updateTime(data) {
    // Time, date elements in html
    const timeElement = document.querySelector('.clocks__time-global');
    const dateElement = document.querySelector('.clocks__date-global');

    // Function to update DOM
    const updateDOM = function () {
      // Clear
      timeElement.innerHTML = '';
      dateElement.innerHTML = '';

      // Render current time to the DOM
      timeElement.insertAdjacentHTML(
        'afterbegin',
        `${numberDigit2(data.time.hour)}:${numberDigit2(
          data.time.minute
        )}:${numberDigit2(data.time.second)}`
      );

      // Render current date to the DOM
      dateElement.insertAdjacentHTML(
        'afterbegin',
        `${data.date.month} ${data.date.day}`
      );
    };
    // Need to call once for immediate DOM update
    updateDOM();

    // Calling it in every second for the correct displayal of the time
    runEverySec(updateDOM);
  }
}

export default new globalClockView();
