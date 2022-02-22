const body = document.querySelector('.page');

const profile = body.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__about-me');
const editButton = profile.querySelector('.profile__edit-btn');
const addButton = profile.querySelector('.profile__add-btn');

const popupEdit = body.querySelector('.popup_edit');
const popupAdd = body.querySelector('.popup_add');

const popupCard = document.querySelector('.popup_card');

const popupEditForm = popupEdit.querySelector('.popup__form');
const fieldName = popupEdit.querySelector('.popup__input_field_name');
const fieldAboutMe = popupEdit.querySelector('.popup__input_field_about-me');

const popupAddForm = popupAdd.querySelector('.popup__form');

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
import { PopupWithImage, PopupWithForm } from './utils.js';
import { Card } from './Card.js';

const addCardFormValidator = new FormValidator(validationConfig, popupAddForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(validationConfig, popupEditForm);
editProfileFormValidator.enableValidation();


// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();

//   profileName.textContent = fieldName.value;
//   profileInfo.textContent = fieldAboutMe.value;

//   const editClosePopup = new Popup(popupEdit);
//   editClosePopup.close();
// }
class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._container.prepend(element);
  }
};

const cardRenderer = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template');
    const cardElement = card.createCard();
    cardRenderer.addItem(cardElement);
    const popupCardRenderer = new PopupWithImage(popupCard, cardElement);
    popupCardRenderer.open();
  }
}, cardsList);

cardRenderer.renderItems();

// function addNewCard(evt) {
//   evt.preventDefault();

//   const card = {};
//   card.name = fieldTitle.value;
//   card.link = fieldLink.value;

//   const newCardRenderer = new Section({
//     renderer: (card) => {
//       const newCard = new Card(card, '#card-template');
//       const cardElement = newCard.createCard();
//       newCardRenderer.addItem(cardElement);
//       const popupCardRenderer = new PopupWithImage(popupCard, cardElement);
//       popupCardRenderer.open();
//     }
//   }, cardsList);


//   newCardRenderer._renderer(card);
//   const addClosePopup = new Popup(popupAdd);
//   addClosePopup.close();

//   addCardFormValidator.disableButton();
//   popupAddForm.reset();
// }



// popupEditForm.addEventListener('submit', handleProfileFormSubmit);
//iji;io;o

const editPopupBehavior = new PopupWithForm({
  somePopup: popupEdit,
  callBack: () => {
    const editFields = editPopupBehavior._getInputValues();
    profileName.textContent = editFields.profileName;
    profileInfo.textContent = editFields.profileAbout;
    editPopupBehavior.close();
    editProfileFormValidator.disableButton();
  }
});
editPopupBehavior.setEventListeners();

const addPopupBehavior = new PopupWithForm({
  somePopup: popupAdd,
  callBack: () => {
    const addFields = addPopupBehavior._getInputValues();
    const card = {};
    card.name = addFields.placeTitle;
    card.link = addFields.placeLink;

    const newCardRenderer = new Section({
      renderer: (card) => {
        const newCard = new Card(card, '#card-template');
        const cardElement = newCard.createCard();
        newCardRenderer.addItem(cardElement);
        const popupCardRenderer = new PopupWithImage(popupCard, cardElement);
        popupCardRenderer.open();
      }
    }, cardsList);

    newCardRenderer._renderer(card);
    addPopupBehavior.close();

    addCardFormValidator.disableButton();
    popupAddForm.reset();
  }
});
addPopupBehavior.setEventListeners();

editButton.addEventListener('click', () => {
  fieldName.value = profileName.textContent;
  fieldAboutMe.value = profileInfo.textContent;

  editPopupBehavior.open();
});

addButton.addEventListener('click', () => {
  addPopupBehavior.open();
});