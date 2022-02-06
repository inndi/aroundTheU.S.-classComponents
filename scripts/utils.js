function closePopupOnClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
  if (evt.target.classList.contains('popup__close-btn')) {
    closePopup(evt.currentTarget);
  };
}

function closePopupOnEscKeydown(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_opened');
    closePopup(modal);
  };
}

function openPopup(somePopup) {
  somePopup.addEventListener('mousedown', closePopupOnClick);
  document.addEventListener('keydown', closePopupOnEscKeydown);

  somePopup.classList.add('popup_opened');
}

function closePopup(somePopup) {
  somePopup.removeEventListener('mousedown', closePopupOnClick);
  document.removeEventListener('keydown', closePopupOnEscKeydown);

  somePopup.classList.remove('popup_opened');
}

export { openPopup, closePopup };