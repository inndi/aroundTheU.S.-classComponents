import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(somePopup) {
    super(somePopup);
    this._popupCardImage = this._popup.querySelector('.popup__card-img');
    this._popupCardTitle = this._popup.querySelector('.popup__card-title');
  }

  open = (evt) => {
    this._popupCardImage.src = evt.target.src;
    this._popupCardImage.alt = evt.target.alt;
    this._popupCardTitle.textContent = evt.target.alt;
    super.open();
  };
}