export default class View {
  _data;
  _iterationCount;

  renderAll(data, render = true) {
    this._data = data;
    this._iterationCount = 0;

    if (!render) return markup;

    this._parentElement.forEach(element => {
      const markup = this._generateMarkup();

      element.innerHTML = '';
      element.insertAdjacentHTML('afterbegin', markup);
      this._iterationCount++;
    });
  }

  render(data, render = true) {
    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _updateTime() {}
}
