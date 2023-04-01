import { UPDATE_SEC } from '../config.js';
import { isNodeList, numberDigit2 } from '../helper.js';

export default class View {
  _data;
  _iterationCount;

  // Method to render all data to the DOM (needed if parent element isn't one element but a few)
  renderAll(data, render = true) {
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
  render(data, render = true) {
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

  // Function to update time in the DOM
  updateTime(data) {
    const _generateGlobalMarkup = () => `
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
        <span class="clocks__time clocks__time-global">${numberDigit2(
          data.time.hour
        )}:${numberDigit2(data.time.minute)}</span>`;

    const _generateMarkup = () =>
      `${numberDigit2(data.time.hour)}:${numberDigit2(data.time.minute)}`;

    setInterval(() => {
      let markup;
      // When it has to be midnight (0:00)
      console.log(data.time);
      if (
        data.time.second === 59 &&
        data.time.minute === 59 &&
        data.time.hour === 23
      ) {
        data.time.hour = 0;
        data.time.minute = 0;
        data.time.second = 0;
        markup = isNodeList(this._parentElement)
          ? _generateMarkup()
          : _generateGlobalMarkup();
      }
      // When it has to change hours
      if (data.time.second === 59 && data.time.minute === 59) {
        data.time.hour++;
        data.time.minute = 0;
        data.time.second = 0;
        markup = isNodeList(this._parentElement)
          ? _generateMarkup()
          : _generateGlobalMarkup();
      }
      // When it has to change minutes
      if (data.time.second === 59) {
        data.time.minute++;
        data.time.second = 0;
        markup = isNodeList(this._parentElement)
          ? _generateMarkup()
          : _generateGlobalMarkup();
      }
      // Second changes
      if (data.time.second < 59) {
        data.time.second++;
        markup = isNodeList(this._parentElement)
          ? _generateMarkup()
          : _generateGlobalMarkup();
      }
      if (isNodeList(this._parentElement)) {
        this._parentElement.forEach((element, i) => {
          if (i === 2) {
            // Clear parent element
            element.innerHTML = '';
            // Insert recently generated markup to parent element
            element.insertAdjacentHTML('afterbegin', markup);
          }
        });
      }
      if (!isNodeList(this._parentElement)) {
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }
    }, 1000);
  }
}
