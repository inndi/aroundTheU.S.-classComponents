import { openPopup } from './utils.js';

export class Card {

  constructor(cardData, cardTemplate) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__img');
    const cardTitle = this._element.querySelector('.card__title');
    this._handleLikeButton();
    this._handleImagePopup();
    this._handleDeleteButton();

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    return this._element;
  }

  _handleLikeButton() {
    const likeButton = this._element.querySelector('.card__like-btn');
    likeButton.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like-btn_active');
    });
  }

  _handleDeleteButton() {
    const deleteButton = this._element.querySelector('.card__delete-btn');
    deleteButton.addEventListener('click', () => {
      deleteButton.parentElement.remove();
    })
  }

  _handleImagePopup() {
    const popupCard = document.querySelector('.popup_card');
    const popupCardImage = popupCard.querySelector('.popup__card-img');
    const popupCardTitle = popupCard.querySelector('.popup__card-title');
    const cardImage = this._element.querySelector('.card__img');
    cardImage.addEventListener('click', (evt) => {
      popupCardImage.src = evt.target.src;
      popupCardImage.alt = evt.target.alt;
      popupCardTitle.textContent = evt.target.alt;

      openPopup(popupCard);
    });
  }
}