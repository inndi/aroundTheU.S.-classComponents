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

    const likeButton = this._element.querySelector('.card__like-btn');
    likeButton.addEventListener('click', this._handleLikeButton);

    const deleteButton = this._element.querySelector('.card__delete-btn');
    deleteButton.addEventListener('click', this._handleDeleteButton);

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    return this._element;
  }

  _handleLikeButton = (evt) => {
    evt.target.classList.toggle('card__like-btn_active');
  }


  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  }
}
