class ViewOLD {
  // zone = document.querySelector(".curved-text__middle--zone");
  // country = document.querySelector(".curved-text__middle--country");
  // time = document.querySelector(".curved-text__middle--time");
  // month = document.querySelector(".curved-text__middle--month");
  // day = document.querySelector(".curved-text__middle--day");

  _btn = document.querySelector('.form__btn');
  _btnIcon = document.querySelector('.form__icon');

  _formBox = document.querySelector('.form-box');

  _formCountry = document.querySelector('.form-box__country');
  _formCity = document.querySelector('.form-box__city');
  _formContinent = document.querySelector('.form-box__continent');

  _generateMarkupPlus() {
    return `
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="form__icon--add"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            `;
  }
  _generateMarkupTick() {
    return `
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="form__icon--close"
            >
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
            />
            </svg>
            `;
  }

  _btnActive() {
    const formBackground = document.querySelector('.form__background');
    const formHeading = document.querySelector('.form-box__heading');
    const formContent = document.querySelector('.form-box__content');
    const formMap = document.querySelector('.form-box__map');
    const footer = document.querySelector('.footer');

    formBackground.style.transform = 'scale(80)';
    formHeading.style.transform = 'translateY(0)';
    formContent.style.transform = 'translateX(0)';
    formMap.style.width = '70rem';
    formMap.style.border = '1px solid $color-primary-dark-1';
    footer.style.transform = 'translateX(0)';
  }

  _btnInactive() {
    const formBackground = document.querySelector('.form__background');
    const formHeading = document.querySelector('.form-box__heading');
    const formContent = document.querySelector('.form-box__content');
    const formMap = document.querySelector('.form-box__map');
    const footer = document.querySelector('.footer');

    formBackground.style.transform = 'scale(1)';
    formHeading.style.transform = 'translateY(-200rem)';
    formContent.style.transform = 'translateX(-200rem)';
    formMap.style.width = '0';
    formMap.style.border = 'none';
    footer.style.transform = 'translateX(-200rem)';
  }

  addHandlerForm() {
    const btn = this._btn;
    const btnIcon = this._btnIcon;
    const formBox = this._formBox;
    const formCountry = this._formCountry;
    const formCity = this._formCity;
    const formContinent = this._formContinent;

    btn.addEventListener('click', () => {
      btnIcon.textContent = '';
      btnIcon.classList.toggle('add');
      btnIcon.innerHTML = btnIcon.classList.contains('add')
        ? this._generateMarkupTick()
        : this._generateMarkupPlus();
      formBox.classList.toggle('hidden');
      formBox.classList.contains('hidden')
        ? this._btnInactive()
        : this._btnActive();

      // Code that only runs if form is visible
      if (formBox.classList.contains('hidden')) {
        // Setting input field values to empty string so on form reopen it shows it is empty
        formCity.value = '';
        formCountry.value = '';
        formContinent.value = '';
      }
    });
  }
}

export default new View();
