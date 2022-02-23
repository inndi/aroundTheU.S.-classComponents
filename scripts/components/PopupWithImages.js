import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
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