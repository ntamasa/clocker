import View from './View.js';

class addedClockView extends View {
  _parentElement = document.querySelectorAll('.curve__middle');
  _errorMessage = 'error message';

  addHandlerRender(handler) {
    // if ()
    document.querySelector('.form__btn').addEventListener('click', handler);
  }

  _generateMarkup() {
    // If wrong data is given, middle circle turns blank
    if (Object.keys(this._data).length === Object.keys({}).length)
      if (this._iterationCount === 1)
        return `Click the button in the top right, to add a time zone`;
      else {
        return '&nbsp;';
      }
    // --NOT DONE-- Last successful form data from browser locale storage

    // First element (zone)
    if (!this._iterationCount) {
      return `
        UTC${this._data.zone >= 0 ? '+' : ''}${this._data.zone}
      `;
    }

    // Second element (country)
    if (this._iterationCount === 1) {
      return `
      ${this._data.country}
    `;
    }

    // Third element (time)
    if (this._iterationCount === 2) {
      return `
    ${this._data.time.hour}:${this._data.time.minute}`;
    }
    // Fourth element (month)
    if (this._iterationCount === 3) {
      return `
      ${this._data.date.month}`;
    }

    // Fifth element (day)
    return `${this._data.date.day}`;
  }
}

export default new addedClockView();
