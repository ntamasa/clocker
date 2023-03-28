import View from './View.js';

class localClockView extends View {
  _parentElement = document.querySelectorAll('.curve__outer');
  _errorMessage = 'error message';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._iterationCount);
    if (!this._iterationCount) {
      return `
        UTC${this._data.zone >= 0 ? '+' : '-'}${this._data.zone}
      `;
    }

    if (this._iterationCount === 1) {
      return `
      ${this._data.country}
    `;
    }

    if (this._iterationCount === 2) {
      return `
    ${this._data.time.hour}:${this._data.time.minute}`;
    }

    if (this._iterationCount === 3) {
      return `
      ${this._data.date.month}`;
    }

    return `${this._data.date.day}`;
  }
}

export default new localClockView();
