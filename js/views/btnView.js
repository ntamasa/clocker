import View from './View.js';

class btnView extends View {
  _parentElement = document.querySelector('.form__icon');
  _errorMessage = 'ERROR MESSAGE';

  addHandlerRender(handler) {
    document.querySelector('.form__btn').addEventListener('click', handler);
  }

  // Method to toggle the position of input fields in form
  toggleInputPos() {
    document
      .querySelector('.form__background')
      .classList.toggle('form__background--active');
    document
      .querySelector('.form-box__heading')
      .classList.toggle('form-box__heading--active');
    document
      .querySelector('.form-box__content')
      .classList.toggle('form-box__content--active');
    document
      .querySelector('.form-box__list')
      .classList.toggle('form-box__list--active');
    document.querySelector('.footer').classList.toggle('footer--active');
  }

  // Method to toggle form visibility
  toggleForm() {
    document.querySelector('.form-box').classList.toggle('hidden');
  }

  _generateMarkup() {
    return this._parentElement.innerHTML.includes('form__icon--close')
      ? // IF (plus icon)
        `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="icon form__icon--add"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
       </svg>
       `
      : // ELSE (tick icon)
        `
      <svg
        xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="icon form__icon--close"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
      `;
  }
}

export default new btnView();
