import "./index.css";
import headerLogoSrc from "../images/logo.svg";

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
  validationConfig,
  popupDelete,
  popupDeleteYesButton,
  photoContainer,
  popupEditAvatar,
  editAvatarBtn,
  popupEditAvaForm
} from '../scripts/utils/constants.js';

import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImages.js';
import { Popup } from '../scripts/components/Popup.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Card } from '../scripts/components/Card.js';
import { Section } from "../scripts/components/Section.js";
import { PopupWithAvaForm } from "../scripts/components/PopupWithAvaForm.js";
import { Api } from "../scripts/components/Api.js";

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

const popupEditAvatarRenderer = new PopupWithAvaForm({
  somePopup: popupEditAvatar,
  callBack: (field, saveBtn) => {
    saveBtn.textContent = 'Saving...';
    api.patchAvatar(field)
      .then(() => {
        photoContainer.src = field.value;
        popupEditAvatarRenderer.close();
      })
  }
});
popupEditAvatarRenderer.setEventListeners();

function createCard(item) {
  const card = new Card({
    cardData: item,
    cardTemplate: '#card-template',
    handleCardClick: (evt) => {
      popupCardRenderer.open(evt);
    },
    handleBinClick: () => {
      popupDeleteRenderer.open();
      popupDeleteYesButton.onclick = () => {
        api.delete(item._id)
          .then(() => {
            card._handleDeleteButton();
            popupDeleteRenderer.close();
          })
      };
    },
    handleLikeClick: () => {

      api.getMyProfile()
        .then((myProfile) => {
          const isMyLike = card.toggleLike(myProfile._id);
          if (isMyLike) {
            api.removeLike(item._id)
              .then((res) => {
                card.removeLike(res.likes);
              })
          } else {
            api.addLike(item._id)
              .then((res) => {
                card.addLike(res.likes);
              })
          }
        })
    },

  });
  api.getMyProfile()
    .then((myProfile) => {
      card.myLike(myProfile._id);
    });

  card.addDeleteButton();
  const cardElement = card.createCard();
  return cardElement
}

const cardRenderer = new Section({
  renderer: (item) => {
    if (item.myNewCard) {
      const cardElement = createCard(item);
      cardRenderer.addPrependItem(cardElement);
    } else {
      const cardElement = createCard(item);
      cardRenderer.addAppendItem(cardElement);
    }
  }
}, cardsList);

const userInfoRenderer = new UserInfo(profileName, profileInfo);

const editPopupBehavior = new PopupWithForm({
  somePopup: popupEdit,
  callBack: (saveBtn) => {
    saveBtn.textContent = 'Saving...';
    const editFields = editPopupBehavior.getInputValues();

    userInfoRenderer.setUserInfo(editFields);
    api.patchProfileData(editFields)
      .then(() => {
        editPopupBehavior.close();
      });
  }
});
editPopupBehavior.setEventListeners();

const addPopupBehavior = new PopupWithForm({
  somePopup: popupAdd,
  callBack: (saveBtn) => {
    saveBtn.textContent = 'Creating...';
    const addFields = addPopupBehavior.getInputValues();
    const newCard = {};
    newCard.name = addFields.placeTitle;
    newCard.link = addFields.placeLink;

    api.postNewCardData(newCard)
      .then((card) => {
        card.myNewCard = true;
        cardRenderer.renderer(card);
        addPopupBehavior.close();
      })
  }
});
addPopupBehavior.setEventListeners();

editButton.addEventListener('click', () => {
  const userInfo = userInfoRenderer.getUserInfo();

  fieldName.value = userInfo.name;
  fieldAboutMe.value = userInfo.about;
  formValidators[popupEditForm.getAttribute('name')].resetValidation();

  editPopupBehavior.switchBtnToSave();
  editPopupBehavior.open();
});

addButton.addEventListener('click', () => {
  formValidators[popupAddForm.getAttribute('name')].resetValidation();
  addPopupBehavior.switchBtnToCreate();
  addPopupBehavior.open();
});

editAvatarBtn.addEventListener('click', () => {
  formValidators[popupEditAvaForm.getAttribute('name')].resetValidation();

  popupEditAvatarRenderer.switchBtnToSave();
  popupEditAvatarRenderer.open();
});

const initApp = async () => {
  const user = await api.getMyProfile()

    .then((myProfile) => {

      photoContainer.src = myProfile.avatar;
      profileName.textContent = myProfile.name;
      profileInfo.textContent = myProfile.about;
      api.getInitialCards()
        .then((cards) => {
          cards.forEach((card) => {
            if (card.owner._id === myProfile._id) {
              card.isMine = true;
            }
            cardRenderer.renderer(card)
          });
        })
    })
};

initApp();