class Popup {
  constructor(somePopup) {
    this._popup = somePopup;
  }

  open() {
    this.setEventListeners();

    this._popup.classList.add('popup_opened');
  }

  close() {
    this.deleteEventListeners();
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  _handleClickClose = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    };
    if (evt.target.classList.contains('popup__close-btn')) {
      this.close();
    };
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  deleteEventListeners() {
    this._popup.removeEventListener('mousedown', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
class PopupWithImage extends Popup {
  constructor(somePopup, someCard) {
    super(somePopup);
    this._card = someCard;
  }


  _handleImagePopup = (evt) => {
    const popupCardImage = this._popup.querySelector('.popup__card-img');
    const popupCardTitle = this._popup.querySelector('.popup__card-title');
    popupCardImage.src = evt.target.src;
    popupCardImage.alt = evt.target.alt;
    popupCardTitle.textContent = evt.target.alt;
  }

  open() {
    const cardImage = this._card.querySelector('.card__img');
    cardImage.addEventListener('mousedown', this._handleImagePopup);
    cardImage.addEventListener('mousedown', () => { super.open() });
  };
}
class PopupWithForm extends Popup {
  constructor({ somePopup, callBack }) {
    super(somePopup);
    this._callBack = callBack;
  }
  _getInputValues() {
    const fieldsList = {};
    const fields = this._popup.querySelectorAll('.popup__input');
    fields.forEach((field) => {
      fieldsList[field.name] = field.value;
    });
    return fieldsList;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callBack();
    });
    super.setEventListeners();
  }

  open() {
    super.setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close() {
    super.close();
    const popupForm = this._popup.querySelector('.popup__form');
    popupForm.reset();
  }
}


class UserInfo {
  constructor(selectorName, selectorAbout) {
    this._name = selectorName;
    this._about = selectorAbout;
  }
  getUserInfo() {
    const userInfoList = {};
    userInfoList.name = this._name.textContent;
    userInfoList.about = this._about.textContent;
    return userInfoList;
  }
  setUserInfo(newUserData) {
    this._name.textContent = newUserData.profileName;
    this._about.textContent = newUserData.profileAbout;
  }
}

// function closePopupOnClick(evt) {
//   if (evt.target.classList.contains('popup_opened')) {
//     closePopup(evt.target);
//   };
//   if (evt.target.classList.contains('popup__close-btn')) {
//     closePopup(evt.currentTarget);
//   };
// }

// function closePopupOnEscKeydown(evt) {
//   if (evt.key === 'Escape') {
//     const modal = document.querySelector('.popup_opened');
//     closePopup(modal);
//   };
// }

// function openPopup(somePopup) {
//   somePopup.addEventListener('mousedown', closePopupOnClick);
//   document.addEventListener('keydown', closePopupOnEscKeydown);

//   somePopup.classList.add('popup_opened');
// }

// function closePopup(somePopup) {
//   somePopup.removeEventListener('mousedown', closePopupOnClick);
//   document.removeEventListener('keydown', closePopupOnEscKeydown);

//   somePopup.classList.remove('popup_opened');
// }

// export { openPopup, closePopup };

export { PopupWithImage, PopupWithForm, UserInfo };