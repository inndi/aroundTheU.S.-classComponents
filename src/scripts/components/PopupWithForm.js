import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
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
