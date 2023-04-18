import View from './View.js';

class deleteZoneView extends View {
  _parentElement = document.querySelector('.form-box__list');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
    // document
    //   .querySelector('.form-box__list-item-icon')
    //   .addEventListener('click', handler);
  }

  removeItem() {
    document.querySelectorAll('.form-box__list-item-icon').forEach(btn => {
      console.log(btn);
      btn.addEventListener('click', e => {
        // CLICK NOT RECOGNISED
        console.log('clicked');
        const key = e.target.closest('.form-box__list-item').childNodes[3]; // get city
        console.log(key);

        localStorage.removeItem(key);
      });
    });
  }
}

export default new deleteZoneView();
