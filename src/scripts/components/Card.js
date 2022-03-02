export class Card {

  constructor({ cardData, cardTemplate, handleCardClick }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = cardTemplate;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__img');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeButton = this._element.querySelector('.card__like-btn');
    this._deleteButton = this._element.querySelector('.card__delete-btn');
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
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeButton);
    this._deleteButton.addEventListener('click', this._handleDeleteButton);
    this._cardImage.addEventListener('mousedown', this._handleCardClick);
  }


  _handleLikeButton = (evt) => {
    evt.target.classList.toggle('card__like-btn_active');
  }


  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  }
}
