import View from './View.js';

class globalClockView extends View {
  _parentElement = document.querySelector('.clocks__data');
  _errorMessage = 'error message';

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
}

export default new globalClockView();
