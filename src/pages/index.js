import "./index.css";
import profilePhotoSrc from "../images/profile-photo.jpg";
import headerLogoSrc from "../images/logo.svg";

const profilePhoto = document.getElementById("profile-photo");
profilePhoto.src = profilePhotoSrc;
const headerLogo = document.getElementById("header-logo");
headerLogo.src = headerLogoSrc;

import {
  profileName,
  profileInfo,
  editButton,
  addButton,
  popupEdit,
  popupAdd,
  popupCard,
  popupEditForm,
  fieldName,
  fieldAboutMe,
  popupAddForm,
  cardsList,
  initialCards,
  validationConfig
} from '../scripts/utils/constants.js';

import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImages.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Card } from '../scripts/components/Card.js';
import { Section } from "../scripts/components/Section.js";


const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

function createCard(item) {
  const card = new Card({
    cardData: item,
    cardTemplate: '#card-template',
    handleCardClick: (evt) => {
      const popupCardRenderer = new PopupWithImage(popupCard);
      popupCardRenderer.open(evt);
      popupCardRenderer.setEventListeners();
    }
  });
  const cardElement = card.createCard();
  return cardElement
}

const cardRenderer = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardRenderer.addItem(cardElement);
  }
}, cardsList);

const userInfoRenderer = new UserInfo(profileName, profileInfo);

cardRenderer.renderItems();

const editPopupBehavior = new PopupWithForm({
  somePopup: popupEdit,
  callBack: () => {
    const editFields = editPopupBehavior.getInputValues();

    userInfoRenderer.setUserInfo(editFields);

    editPopupBehavior.close();
  }
});
editPopupBehavior.setEventListeners();

const addPopupBehavior = new PopupWithForm({
  somePopup: popupAdd,
  callBack: () => {
    const addFields = addPopupBehavior.getInputValues();
    const card = {};
    card.name = addFields.placeTitle;
    card.link = addFields.placeLink;

    cardRenderer.renderer(card);
    addPopupBehavior.close();
  }
});
addPopupBehavior.setEventListeners();

editButton.addEventListener('click', () => {
  const userInfo = userInfoRenderer.getUserInfo();

  fieldName.value = userInfo.name;
  fieldAboutMe.value = userInfo.about;
  formValidators[popupEditForm.getAttribute('name')].resetValidation();

  editPopupBehavior.open();
});

addButton.addEventListener('click', () => {
  formValidators[popupAddForm.getAttribute('name')].resetValidation();
  addPopupBehavior.open();
});