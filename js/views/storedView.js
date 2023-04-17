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
      </div>`);
    });

    // Returns the array
    return arr;
  }

  loadSavedZone() {
    // Get every element of list
    document.querySelectorAll('.form-box__list-item').forEach(item => {
      console.log(item);
      // List element on 'click' event
      item.addEventListener('click', () => {
        console.log(item + 'clicked');
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
