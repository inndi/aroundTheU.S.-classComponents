import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ somePopup, callBack }) {
    super(somePopup);
    this._callBack = callBack;
    this._fields = this._popup.querySelectorAll('.popup__input');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._saveBtn = this._popup.querySelector('.popup__save-btn');
    this._saveButtonText = this._saveBtn.textContent;
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
      this._callBack();
    });
    super.setEventListeners();
  }

  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._saveBtn.textContent = loadingText;
    } else {
      this._saveBtn.textContent = this._saveButtonText;
    }
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
