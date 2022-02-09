const body = document.querySelector('.page');

const profile = body.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__about-me');
const editButton = profile.querySelector('.profile__edit-btn');
const addButton = profile.querySelector('.profile__add-btn');

const popupEdit = body.querySelector('.popup_edit');
const popupAdd = body.querySelector('.popup_add');


const popupEditForm = popupEdit.querySelector('.popup__form');
const fieldName = popupEdit.querySelector('.popup__input_field_name');
const fieldAboutMe = popupEdit.querySelector('.popup__input_field_about-me');

const popupAddForm = popupAdd.querySelector('.popup__form');
const fieldTitle = popupAdd.querySelector('.popup__input_field_title');
const fieldLink = popupAdd.querySelector('.popup__input_field_link');
const createCardButton = popupAdd.querySelector('.popup__save-btn');

const cardsList = body.querySelector('.cards__list');

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';
import { Card } from './Card.js';

const addCardFormValidator = new FormValidator(validationConfig, popupAddForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(validationConfig, popupEditForm);
editProfileFormValidator.enableValidation();

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = fieldName.value;
  profileInfo.textContent = fieldAboutMe.value;

  closePopup(popupEdit);
}

function renderCard(cardData) {
  const card = new Card(cardData, '#card-template');
  const cardElement = card.createCard();
  cardsList.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card);
});

function addNewCard(evt) {
  evt.preventDefault();


  const card = {};
  card.name = fieldTitle.value;
  card.link = fieldLink.value;

  renderCard(card);
  closePopup(popupAdd);

  addCardFormValidator.disableButton();
  popupAddForm.reset();
}

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  fieldName.value = profileName.textContent;
  fieldAboutMe.value = profileInfo.textContent;
});

popupEditForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => { openPopup(popupAdd) });
popupAddForm.addEventListener('submit', addNewCard);