import { Popup } from "./Popup.js";

export class PopupWithAvaForm extends Popup {
  constructor({ somePopup, callBack }) {
    super(somePopup);
    this._callBack = callBack;
    this._field = this._popup.querySelector('.popup__input');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._saveBtn = this._popup.querySelector('.popup__save-btn');
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callBack(this._field, this._saveBtn);
    });
    super.setEventListeners();
  }

  switchBtnToSave() {
    this._saveBtn.textContent = 'Save';
  }

  open() {
    super.setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}