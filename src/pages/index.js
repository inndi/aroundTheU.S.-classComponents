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
  popupEditAvaForm,
  popupAddTitle,
  popupAddLink,
  popupAvatarLink
} from '../scripts/utils/constants.js';

const userDataFields = {};
userDataFields.name = profileName;
userDataFields.info = profileInfo;
userDataFields.avatar = photoContainer;
userDataFields.popupFieldName = fieldName;
userDataFields.popupFieldInfo = fieldAboutMe;

import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImages.js';
import { Popup } from '../scripts/components/Popup.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithBin } from "../scripts/components/PopupWithBin.js";
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Card } from '../scripts/components/Card.js';
import { Section } from "../scripts/components/Section.js";
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

const popupDeleteRenderer = new PopupWithBin(popupDelete);
popupDeleteRenderer.setEventListeners();


function createCard(item, userId) {
  const card = new Card({
    cardData: item,
    userId: userId,
    cardTemplate: '#card-template',
    handleCardClick: () => {
      popupCardRenderer.open(item);
    },
    handleBinClick: () => {
      popupDeleteRenderer.open();
      popupDeleteYesButton.onclick = () => {
        api.delete(item._id)
          .then(() => {
            card.handleDeleteButton();
            popupDeleteRenderer.close();
          })
          .catch((err) => {
            console.log(err);
          });
      };
    },
    handleLikeClick: () => {
      const isMyLike = card.isLiked();
      if (isMyLike) {
        api.removeLike(item._id)
          .then((res) => {
            card.removeLike(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.addLike(item._id)
          .then((res) => {
            card.addLike(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

  });

  // card.checkLikes();

  const cardElement = card.createCard();
  return cardElement
}

const cardRenderer = new Section({
  renderer: (item, userId) => {
    if (item.myNewCard) {
      const cardElement = createCard(item, userId);
      cardRenderer.addPrependItem(cardElement);
    } else {
      const cardElement = createCard(item, userId);
      cardRenderer.addAppendItem(cardElement);
    }
  }
}, cardsList);


const popupEditAvatarRenderer = new PopupWithForm({
  somePopup: popupEditAvatar,
  callBack: () => {
    popupEditAvatarRenderer.renderLoading(true, 'Saving...');
    const fieldValue = popupEditAvatarRenderer.getInputValues();

    api.patchAvatar(fieldValue)
      .then((profile) => {
        photoContainer.src = profile.avatar;
        popupEditAvatarRenderer.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function () {
        popupEditAvatarRenderer.renderLoading(false, 'Saving...');
      });
  }
});
popupEditAvatarRenderer.setEventListeners();



const editPopupBehavior = new PopupWithForm({
  somePopup: popupEdit,
  callBack: () => {
    editPopupBehavior.renderLoading(true, 'Saving...');

    const editFields = editPopupBehavior.getInputValues();

    api.patchProfileData(editFields)
      .then((user) => {
        userDataFields.name.textContent = user.name;
        userDataFields.info.textContent = user.about;
        editPopupBehavior.close();
        userDataFields.popupFieldName.value = user.name;
        userDataFields.popupFieldInfo.value = user.about;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function () {
        editPopupBehavior.renderLoading(false, 'Creating...');
      });

  }

});
editPopupBehavior.setEventListeners();

const addPopupBehavior = new PopupWithForm({
  somePopup: popupAdd,
  callBack: () => {
    addPopupBehavior.renderLoading(true, 'Saving...');

    const addFields = addPopupBehavior.getInputValues();
    const newCard = {};
    newCard.name = addFields.placeTitle;
    newCard.link = addFields.placeLink;

    api.postNewCardData(newCard)
      .then((card) => {
        card.myNewCard = true;

        cardRenderer.renderer(card, card.owner._id);
        addPopupBehavior.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function () {
        addPopupBehavior.renderLoading(false, 'Creating...');
      });
  }
});
addPopupBehavior.setEventListeners();

addButton.addEventListener('click', () => {
  formValidators[popupAddForm.getAttribute('name')].resetValidation();

  popupAddTitle.value = '';
  popupAddLink.value = '';
  addPopupBehavior.open();
});

editAvatarBtn.addEventListener('click', () => {
  formValidators[popupEditAvaForm.getAttribute('name')].resetValidation();

  popupAvatarLink.value = '';
  popupEditAvatarRenderer.open();
});

editButton.addEventListener('click', () => {
  formValidators[popupEditForm.getAttribute('name')].resetValidation();

  editPopupBehavior.open();
});

const initApp = async () => {
  const user = await api.getMyProfile();

  const userInfoRenderer = new UserInfo(user, userDataFields);
  userInfoRenderer.setUserInfo();

  const cards = await api.getInitialCards();

  cards.forEach((card) => {
    if (card.owner._id === user._id) {
      card.isMine = true;
    }
    cardRenderer.renderer(card, user._id)
  });
};

initApp();