import View from './View.js';

class addedClockView extends View {
  _parentElement = document.querySelectorAll('.curve__middle');
  _formElement = document.querySelector('.form-box');
  _errorMessage = 'error message';

  addHandlerRender(handler) {
    document.querySelector('.form__btn').addEventListener('click', handler);
  }

  _generateMarkup() {
    // If wrong data is given, middle circle turns blank
    if (Object.keys(this._data).length === Object.keys({}).length) {
      if (this._iterationCount === 1)
        // iteration is at the second element (country)
        return `Click the button in the top right, to add a time zone`; // If blank object is given in controller
      // ELSE
      return '&nbsp;';
      // --NOT DONE-- Last successful form data from browser locale storage
    }

    this._iterationCount === 1 // IF // iteration is at the second element (country) return string
      ? `Click the button in the top right, to add a time zone`
      : '&nbsp;';

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
