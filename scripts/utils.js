class Popup {
  constructor(somePopup) {
    this._popup = somePopup;
  }

  open() {
    this._popup.addEventListener('mousedown', (evt) => { this.setEventListeners(evt) });
    document.addEventListener('keydown', (evt) => { this._handleEscClose(evt) });

    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.removeEventListener('mousedown', (evt) => { this.setEventListeners(evt) });
    document.removeEventListener('keydown', (evt) => { this._handleEscClose(evt) });

    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close(evt.target);
    };
    if (evt.target.classList.contains('popup__close-btn')) {
      this.close(evt.currentTarget);
    };
  }

}


class PopupWithImage extends Popup {
  constructor(somePopup) {
    super(somePopup);
  }

  open() {
    // super.open();
    // const popupCard = document.querySelector('.popup_card');
    const popupCardImage = this._popup.querySelector('.popup__card-img');
    const popupCardTitle = this._popup.querySelector('.popup__card-title');
    popupCardImage.src = this._popup.src;
    popupCardImage.alt = this._popup.alt;
    popupCardTitle.textContent = this._popup.alt;

    popupCardImage.addEventListener('mousedown', this.setEventListeners);
    document.addEventListener('keydown', this._handleEscClose);

    popupCardImage.classList.add('popup_opened');

    // openPopup(popupCard);
  };
}


// function closePopupOnClick(evt) {
//   if (evt.target.classList.contains('popup_opened')) {
//     closePopup(evt.target);
//   };
//   if (evt.target.classList.contains('popup__close-btn')) {
//     closePopup(evt.currentTarget);
//   };
// }

// function closePopupOnEscKeydown(evt) {
//   if (evt.key === 'Escape') {
//     const modal = document.querySelector('.popup_opened');
//     closePopup(modal);
//   };
// }

// function openPopup(somePopup) {
//   somePopup.addEventListener('mousedown', closePopupOnClick);
//   document.addEventListener('keydown', closePopupOnEscKeydown);

//   somePopup.classList.add('popup_opened');
// }

// function closePopup(somePopup) {
//   somePopup.removeEventListener('mousedown', closePopupOnClick);
//   document.removeEventListener('keydown', closePopupOnEscKeydown);

//   somePopup.classList.remove('popup_opened');
// }

// export { openPopup, closePopup };

export { Popup, PopupWithImage };