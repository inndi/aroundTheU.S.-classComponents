export class Card {

  constructor({ cardData, cardTemplate, handleCardClick, handleBinClick, blabla }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = cardTemplate;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__img');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeButton = this._element.querySelector('.card__like-btn');
    // this._likesAmount = this._element.querySelector('.card__likes-amount');///////////
    this._deleteButton = this._element.querySelector('.card__delete-btn');
    this._handleBinClick = handleBinClick;

    this.blabla = blabla;///////////////////////////////////////////////////////////////
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
    // this._likeButton.addEventListener('click', this._handleLikeButton);
    this._likeButton.addEventListener('click', this.blabla);
    this._deleteButton.addEventListener('click', this._handleBinClick);
    this._cardImage.addEventListener('mousedown', this._handleCardClick);
  }


  _handleLikeButton = (evt) => {
    evt.target.classList.toggle('card__like-btn_active');
    //get likes data and ++ 
    // this._likesAmount.textContent = +this._likesAmount.textContent + 1;
    // console.log(this._likesAmount.textContent);
  }

  // blabla() {
  // fetch("https://around.nomoreparties.co/v1/group-12/cards/_id/", {
  //   method: 'GET',
  //   headers: {
  //     authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
  // }
  // })
  // .then(res => res.json())
  // .then((result) => {
  // console.log(result)})


  // //   // this._deleteButton.classList.add('card__delete-btn_active');

  // }


  _handleDeleteButton = () => {
    this._element.remove();
    // this._element = null;
  }
}
