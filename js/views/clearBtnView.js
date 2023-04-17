import View from './View.js';

class clearBtnView extends View {
  _parentElement = document.querySelector('.form-box__list');

  addHandlerRender(handler) {
    document.querySelector('.btn__clear').addEventListener('click', handler);
  }

  clearList() {
    localStorage.clear();
  }

  _generateMarkup() {
    return `&nbsp;`;
  }
}

export default new clearBtnView();
