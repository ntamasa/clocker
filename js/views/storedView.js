import View from './View.js';
import { capitalize, countryList } from '../helper.js';

class storedView extends View {
  _parentElement = document.querySelector('.form-box__list');
  _name = document.querySelector('.form-box__city').value; // Name of the saved item in localStorage
  _errorMessage = `Couldn't save your zone`;
  _errorRequest = 'Please try again!';

  addHandlerRender(handler) {
    document.querySelector('.btn__form').addEventListener('click', handler); // need to be click because on window loaded it calls loadSavedZone before data is rendered
  }

  // Array to get keys of local storage
  _getKeys() {
    // Storing all keys in a variable
    const keys = Object.keys(localStorage);

    // Get rid of the first element (automatically generated (DEBUG))
    const index = keys.indexOf('debug'); // Storing index of keys array where value is 'debug'
    if (index > -1) keys.splice(index, 1); // If the element is found (> -1) then it removes 1 char from the index of the value 'debug'

    // Return the keys array without automatically generated one (DEBUG)
    return keys;
  }

  _generateMarkup() {
    // Array to store saved keys of local storage
    const arr = [];

    // Getting keys of local storage
    const keys = this._getKeys();
    // Fill up array where 1 element of the array is the markup of the zone
    keys.forEach(key => {
      arr.push(`<div class="form-box__list-item">
      <span class="country">${localStorage.getItem(key).split(',')[0]}</span>
      <span class="city">${localStorage.getItem(key).split(',')[1]}</span>
      <span class="zone">${localStorage.getItem(key).split(',')[2]}</span>
      <div class="icon-box">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="form-box__list-item-icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </div>
      </div>`);
    });

    // Returns the array
    return arr;
  }

  loadSavedZone() {
    // Get every element of list
    document.querySelectorAll('.form-box__list-item').forEach(item => {
      // List element on 'click' event
      item.addEventListener('click', () => {
        // Store all saved data of clicked element in a variable
        const data = localStorage
          .getItem(item.children[1].textContent) // City value of saved item (localStorage key)
          .split(','); // Making it an array

        // Import value into input field
        document.querySelector('.form-box__country').value = data[0];
        document.querySelector('.form-box__city').value = data[1];
        document.querySelector('.form-box__continent').value = data[2];
      });
    });
  }
}
export default new storedView();
