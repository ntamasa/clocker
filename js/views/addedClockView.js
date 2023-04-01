import View from './View.js';

class addedClockView extends View {
  _parentElement = document.querySelectorAll('.curve__middle');
  _errorMessage = 'error message';

  addHandlerRender(handler) {
    document.querySelector('.form__btn').addEventListener('click', handler);
  }

  _generateMarkup() {
    // If wrong data is given, middle circle turns blank
    if (Object.keys(this._data).length === Object.keys({}).length)
      // If blank object is given in controller
      this._iterationCount === 1 // iteration is at the second element (country) return string
        ? // IF
          `Click the button in the top right, to add a time zone`
        : // ELSE
          '&nbsp;';
    // --NOT DONE-- Last successful form data from browser locale storage

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

    // Third element (time)
    if (this._iterationCount === 2)
      return `
    ${this._data.time.hour}:${this._data.time.minute}`; // 18:01

    // Fourth element (month)
    if (this._iterationCount === 3)
      return `
      ${this._data.date.month}`; // March

    // Fifth element (day)
    return `${this._data.date.day}`; // 21
  }
}

export default new addedClockView();
