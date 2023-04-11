import { UPDATE_SEC } from '../config.js';
import { isNodeList, numberDigit2, runEverySec } from '../helper.js';

export default class View {
  _data;
  _iterationCount;

  // Method to render all data to the DOM (needed if parent element isn't one element but a few)
  renderAll(data) {
    this._data = data;

    // Count iteration so we can decide what to load to DOM when (curved text)
    this._iterationCount = 0;

    this._parentElement.forEach(element => {
      // Generate markup
      const markup = this._generateMarkup();

      // Clear parent element
      element.innerHTML = '';
      // Insert recently generated markup to parent element
      element.insertAdjacentHTML('afterbegin', markup);
      // Continue the iretation counter
      this._iterationCount++;
    });
  }

  // Method to render data to the DOM
  render(data) {
    this._data = data;

    // Generate markup
    const markup = this._generateMarkup();

    // Clear parent element
    this._clear();

    // Insert markup to parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  clearSpinner() {
    document.body.removeChild(document.querySelector('.spinner'));
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="spinner__logo"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage, request = this._errorRequest) {
    const markup = `
    <figure class="error">
        <div class="error__logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="error__logo-img"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <div class="error__text">
          <p class="invalid-data">${message}</p>
          <p class="try-again">${request}</p>
        </div>
      </figure>
    `;
    this._clear();
    document
      .querySelector('.container')
      .insertAdjacentHTML('afterbegin', markup);
  }
}
