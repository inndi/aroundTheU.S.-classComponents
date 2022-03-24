import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(somePopup) {
    super(somePopup);
    this._popupCardImage = this._popup.querySelector('.popup__card-img');
    this._popupCardTitle = this._popup.querySelector('.popup__card-title');
  }

  open(item) {
    this._popupCardImage.src = item.link;
    this._popupCardImage.alt = item.name;
    this._popupCardTitle.textContent = item.name;
    super.open();
  };
}