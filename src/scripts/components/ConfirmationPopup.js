import { Popup } from "./Popup.js";

export class ConfirmationPopup extends Popup {
  constructor(somePopup) {
    super(somePopup);
    this._yesBtn = this._popup.querySelector('.popup__save-btn');
  }

  open(onDelete) {
    super.open()
    this._onDelete = onDelete;
    this._yesBtn.addEventListener('click', this._onDelete);
  }

  close() {
    super.close();
    this._yesBtn.removeEventListener('click', this._onDelete);
    this._onDelete = null;
  }
}
