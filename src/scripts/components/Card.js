export class Card {

  constructor({ cardData, cardTemplate, handleCardClick, handleBinClick, handleLikeClick }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = cardTemplate;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__img');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeButton = this._element.querySelector('.card__like-btn');
    this._likesAmount = this._element.querySelector('.card__likes-amount');
    this._deleteButton = this._element.querySelector('.card__delete-btn');
    this._handleBinClick = handleBinClick;
    this._handleLikeClick = handleLikeClick;
    this._mineCard = cardData.isMine;
    this._myNewCard = cardData.myNewCard;
    this._cardLikes = cardData.likes;
    this._initialLikes = cardData.likes.length;
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
    this._addDeleteButtonToNewCard()
    this._handleLikeInitAmount();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeClick);
    this._deleteButton.addEventListener('click', this._handleBinClick);
    this._cardImage.addEventListener('mousedown', this._handleCardClick);
  }


  addLike(likes) {
    this._likeButton.classList.add('card__like-btn_active');
    this._likesAmount.textContent = likes.length;
    this._cardLikes = likes;
  }

  removeLike(likes) {
    this._likeButton.classList.remove('card__like-btn_active');
    this._likesAmount.textContent = likes.length;
    this._cardLikes = likes;
  }

  toggleLike(myId) {
    const isMyLike = this._cardLikes.some(like => like._id === myId);
    return isMyLike;
  }

  _handleLikeInitAmount() {
    this._likesAmount.textContent = this._initialLikes;
  }

  _addDeleteButtonToNewCard() {
    if (this._myNewCard) {
      this._deleteButton.classList.add('card__delete-btn_active');
    }
  }

  addDeleteButton() {
    if (this._mineCard) {
      this._deleteButton.classList.add('card__delete-btn_active');
    }
  }

  _handleDeleteButton = () => {
    this._element.remove();
  }

  myLike(myId) {
    this._cardLikes.forEach((like) => {
      if (like._id === myId) {
        this._likeButton.classList.add('card__like-btn_active');
      };
    })
  }
}