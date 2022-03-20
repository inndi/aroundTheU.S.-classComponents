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
    this._likesAmount = this._element.querySelector('.card__likes-amount');///////////
    this._deleteButton = this._element.querySelector('.card__delete-btn');
    this._handleBinClick = handleBinClick;

    this.handleLikeClick = handleLikeClick;///////////////////////////////////////////////////////////////
    // console.log(cardData.myNewCard);///////////////////
    this._mineCard = cardData.isMine;
    this._myNewCard = cardData.myNewCard;

    this._cardId = cardData._id;////////////////////////////


    // fetch(`https://around.nomoreparties.co/v1/group-12/cards/6236bd718a8080023e419346`, {
    //   method: 'GET',
    //   headers: {
    //     authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b",
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(res => {
    //     return res.json();
    //   })

    //   .then((card) => {
    //     console.log(card);
    //     // return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
    //     //   method: 'GET',
    //     //   headers: {
    //     //     authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
    //     //   }
    //     // })
    //     //   .then(res => res.json())
    //     //   .then((user) => {

    //     //     likes.forEach((like) => {
    //     //       // console.log(like._id);
    //     //       // if (like._id === user._id) {
    //     //       // card.bla();
    //     //       console.log(like);
    //     //       // }
    //     //     })
    //     //     // if (card.owner._id === user._id) {
    //     //     //   card.isMine = true;
    //     //     // }
    //     //     // cardRenderer.renderer(card)

    //     //   })
    //   });

    this._initialLikes = cardData.likes.length;

    this._isLiked = cardData.isLiked;///////////////////////

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

    if (this._isLiked) {
      console.log(this._isLiked);
      // this._likeButton.classList.add('card__like-btn_active');
    }

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this.handleLikeClick);
    // this._likeButton.addEventListener('click', this.blabla);
    this._deleteButton.addEventListener('click', this._handleBinClick);
    this._cardImage.addEventListener('mousedown', this._handleCardClick);
  }


  addLike() {
    //   evt.target.classList.toggle('card__like-btn_active');
    //   //get likes data and ++ 
    this._likesAmount.textContent = +this._likesAmount.textContent + 1;
    //   // console.log(this._likesAmount.textContent);
  }

  _handleLikeInitAmount() {
    this._likesAmount.textContent = this._initialLikes;
  }

  bla() {
    this._likeButton.classList.add('card__like-btn_active');
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
    // this._element = null;
  }
}
