export class Card {

  constructor({ cardData, userId, cardTemplate, handleCardClick, handleBinClick, handleLikeClick }) {
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
    this._userId = userId;
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
    this._handleLikeInitAmount();
    this._addDeleteButton();
    this._checkLikes();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeClick);
    this._deleteButton.addEventListener('click', this._handleBinClick);
    this._cardImage.addEventListener('mousedown', this._handleCardClick);
  }

  _updateLikes(likes) {
    this._likesAmount.textContent = likes.length;
    this._cardLikes = likes;
  }

  addLike(likes) {
    this._likeButton.classList.add('card__like-btn_active');
    this._updateLikes(likes);
  }

  removeLike(likes) {
    this._likeButton.classList.remove('card__like-btn_active');
    this._updateLikes(likes);
  }

  isLiked() {
    const isMyLike = this._cardLikes.some(like => like._id === this._userId);
    return isMyLike;
  }

  _handleLikeInitAmount() {
    this._likesAmount.textContent = this._initialLikes;
  }

  _addDeleteButton() {
    if (this._mineCard || this._myNewCard) {
      this._deleteButton.classList.add('card__delete-btn_active');
    }
  }

  handleDeleteButton = () => {
    this._element.remove();
  }

  _checkLikes() {
    this._cardLikes.forEach((like) => {
      if (like._id === this._userId) {
        this._likeButton.classList.add('card__like-btn_active');
      };
    })
  }
}