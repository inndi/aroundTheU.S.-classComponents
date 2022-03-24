import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ somePopup, callBack }) {
    super(somePopup);
    this._callBack = callBack;
    this._fields = this._popup.querySelectorAll('.popup__input');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._saveBtn = this._popup.querySelector('.popup__save-btn');
  }
  getInputValues() {
    const fieldsList = {};
    this._fields.forEach((field) => {
      fieldsList[field.name] = field.value;
    });
    return fieldsList;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callBack(this._saveBtn);
    });
    super.setEventListeners();
  }

  switchBtnToCreate() {
    this._saveBtn.textContent = 'Create';
  }

  switchBtnToSave() {
    this._saveBtn.textContent = 'Save';
  }

  close() {
    super.close();
  }
}
