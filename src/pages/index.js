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
  // initialCards,
  validationConfig,
  popupDelete,
  popupDeleteYesButton
} from '../scripts/utils/constants.js';

import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImages.js';
import { Popup } from '../scripts/components/Popup.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Card } from '../scripts/components/Card.js';
import { Section } from "../scripts/components/Section.js";







class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  renderInitialCards() {
    this.getInitialCards()
      .then((result) => {
        result.forEach((card) => { cardRenderer.renderer(card) });
      });
  }

  postNewCardData(card) {
    fetch('https://around.nomoreparties.co/v1/group-12/cards ', {
      method: 'POST',
      headers: {
        authorization: '2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
  }

  patchProfileData(editFields) {
    fetch('https://around.nomoreparties.co/v1/group-12/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: editFields.profileName,
        about: editFields.profileAbout
      })
    });
  }

  setNewProfileData() {
    fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      method: 'GET',
      headers: {
        authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
      }
    })
      .then(res => res.json())
      .then((result) => {
        profileName.textContent = result.name;
        profileInfo.textContent = result.about;
      });
  }

  getAmountOfLikes() {

    this.getInitialCards()
      .then((result) => {
        result.forEach((bla) => {
          console.log(bla.likes)
        })
      });
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b",
    "Content-Type": "application/json"
  }
});







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

const popupCardRenderer = new PopupWithImage(popupCard);
popupCardRenderer.setEventListeners();

const popupDeleteRenderer = new Popup(popupDelete);
popupDeleteRenderer.setEventListeners();


function createCard(item) {
  const card = new Card({
    cardData: item,
    cardTemplate: '#card-template',
    handleCardClick: (evt) => {
      popupCardRenderer.open(evt);
    },
    handleBinClick: () => {
      popupDeleteRenderer.open();
      popupDeleteYesButton.addEventListener('click', () => {
        card._handleDeleteButton();
        popupDeleteRenderer.close();
      });
    },
    blabla: (evt) => {
      card._handleLikeButton(evt);
    }
  });
  // card.blabla();
  const cardElement = card.createCard();
  return cardElement
}







fetch("https://around.nomoreparties.co/v1/group-12/cards", {
  method: 'GET',
  headers: {
    authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
  }
})
  .then(res => res.json())
  .then((bla) => {
    fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      method: 'GET',
      headers: {
        authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
      }
    })
      .then(res => res.json())
      .then((result) => {
        bla.forEach((bl) => {
          if (bl.owner._id === result._id) {
            console.log(bl);
          }
        })
      })
  })






///////////////////////////////////////////////////////////////////////////////

const cardRenderer = new Section({
  // items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardRenderer.addItem(cardElement);
  }
}, cardsList);

api.renderInitialCards();

/////////////////////////////////////////////////////////////////////////////////////




const userInfoRenderer = new UserInfo(profileName, profileInfo);

const editPopupBehavior = new PopupWithForm({
  somePopup: popupEdit,
  callBack: () => {
    const editFields = editPopupBehavior.getInputValues();

    userInfoRenderer.setUserInfo(editFields);
    api.patchProfileData(editFields);
    editPopupBehavior.close();
  }
});
editPopupBehavior.setEventListeners();



////////////////////////////////////////////////////////////////////////////////////////



const addPopupBehavior = new PopupWithForm({
  somePopup: popupAdd,
  callBack: () => {
    const addFields = addPopupBehavior.getInputValues();
    const card = {};
    card.name = addFields.placeTitle;
    card.link = addFields.placeLink;
    console.log(card);

    api.postNewCardData(card);

    cardRenderer.renderer(card);
    addPopupBehavior.close();
  }
});
addPopupBehavior.setEventListeners();


///////////////////////////////////////////////////////////////////////////////////

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

api.setNewProfileData();







// fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
//   method: 'GET',
//   headers: {
//     authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });








// const blu = api.getInitialCards()
//   .then((result) => {

//     result.forEach((res) => {
//       console.log(res._id);
//     })
//   })
//   .catch((err) => {
//     console.log(err); // log the error to the console
//   });
// blu();
// console.log(blu);