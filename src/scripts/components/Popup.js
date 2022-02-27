export class Popup {
  constructor(somePopup) {
    this._popup = somePopup;
  }

  open() {
    this.setEventListeners();

    this._popup.classList.add('popup_opened');
  }

  close() {
    this.deleteEventListeners();
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  _handleClickClose = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    };
    if (evt.target.classList.contains('popup__close-btn')) {
      this.close();
    };
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  deleteEventListeners() {
    this._popup.removeEventListener('mousedown', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}