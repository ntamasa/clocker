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
  _updateTime() {}
}
