import { Popup } from "./Popup.js";

export class ConfirmationPopup extends Popup {
  constructor(somePopup) {
    super(somePopup);
    this._yesBtn = this._popup.querySelector('.popup__save-btn');
  }

  setEventListeners(onDelete) {
    this._yesBtn.addEventListener('click', onDelete);
    super.setEventListeners()
  }
}