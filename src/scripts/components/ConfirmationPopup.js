import { Popup } from "./Popup.js";

export class ConfirmationPopup extends Popup {
  constructor(somePopup) {
    super(somePopup);
    this._yesBtn = this._popup.querySelector('.popup__save-btn');
  }
  close() {
    super.close();
    if (this._onDelete) {
      this.removeEventListeners(this._onDelete);
      this._onDelete = null;
    }
  }

  setEventListeners(onDelete) {
    this._onDelete = onDelete;
    if (this._onDelete) {
      this._yesBtn.addEventListener('click', this._onDelete);
    }
    super.setEventListeners()
  }

  removeEventListeners() {
    this._yesBtn.removeEventListener('click', this._onDelete);
  }
}