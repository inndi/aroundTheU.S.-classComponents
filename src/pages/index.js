import "./index.css";
// import profilePhotoSrc from "../images/profile-photo.jpg";
import headerLogoSrc from "../images/logo.svg";

// const profilePhoto = document.getElementById("profile-photo");
// profilePhoto.src = profilePhotoSrc;
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
  popupDeleteYesButton,
  photoContainer,
  popupEditAvatar,
  editAvatarBtn
} from '../scripts/utils/constants.js';

import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImages.js';
import { Popup } from '../scripts/components/Popup.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Card } from '../scripts/components/Card.js';
import { Section } from "../scripts/components/Section.js";
import { PopupWithAvaForm } from "../scripts/components/PopupWithAvaForm.js";







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

  getMyProfile() {
    return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
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
      .then((cards) => {
        this.getMyProfile()
          .then((user) => {
            cards.forEach((card) => {
              if (card.owner._id === user._id) {
                card.isMine = true;
              }
              cardRenderer.renderer(card)
            });
          })

      });
  }

  renderMatchLike() {
    this.getInitialCards()
      .then((cards) => {
        return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
          method: 'GET',
          headers: {
            authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
          }
        })
          .then(res => res.json())


      });
  }

  delete(cardId) {
    return fetch(`https://around.nomoreparties.co/v1/group-12/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
      }
    })
  }

  postNewCardData(card) {
    return fetch('https://around.nomoreparties.co/v1/group-12/cards ', {
      method: 'POST',
      headers: {
        authorization: '2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    }).then(res => res.json());
  }

  patchProfileData(editFields) {
    return fetch('https://around.nomoreparties.co/v1/group-12/users/me', {
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
    this.getMyProfile()
      .then((myProfile) => {
        profileName.textContent = myProfile.name;
        profileInfo.textContent = myProfile.about;
      });
  }

  patchAvatar(field) {
    return fetch('https://around.nomoreparties.co/v1/group-12/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: field.value,
      })
    });
  }

  setAvatar() {
    this.getMyProfile()
      .then((myProfile) => {
        photoContainer.src = myProfile.avatar;
      });
  }

  getAmountOfLikes() {
    this.getInitialCards()
      .then((cards) => {
        cards.forEach((card) => {
          console.log(card.likes)
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

api.setAvatar();
api.setNewProfileData();
api.renderInitialCards();


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



//////////////////////////////////////////////////////////////////////////////////////////////////////////////


const popupEditAvatarRenderer = new PopupWithAvaForm({
  somePopup: popupEditAvatar,
  callBack: (field, saveBtn) => {
    saveBtn.textContent = 'Saving...';
    api.patchAvatar(field)
      .then(() => {
        photoContainer.src = field.value;
      })
      .then(() => {
        popupEditAvatarRenderer.close();
        // saveBtn.textContent = 'Save';
      })
  }
});
popupEditAvatarRenderer.setEventListeners();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    handleLikeClick: (evt) => {
      evt.target.classList.toggle('card__like-btn_active');
      fetch(`https://around.nomoreparties.co/v1/group-12/cards/likes/${item._id}`, {
        method: 'PUT',
        headers: {
          authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
        }
      })
        .then(res => res.json())
        .then((res) => {
          //if isLiked true => classList remove!!!!!!!!!!!!!!!!!!!!!!!!!
          res.isLiked = true;
          evt.target.classList.add('card__like-btn_active');
          card.addLike();
          // console.log(res);
        })
    },



    // }

    // card.addedLike();

  });

  // card.addLike();

  card.addDeleteButton();
  const cardElement = card.createCard();
  return cardElement
}



// 


api.getInitialCards()
  .then((res) => {
    console.log(res);
  })

// api.renderMatchLike();  

// fetch("https://around.nomoreparties.co/v1/group-12/cards", {
//   method: 'GET',
//   headers: {
//     authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
//   }
// })
//   .then(res => res.json())
//   .then((bla) => {
//     fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
//       method: 'GET',
//       headers: {
//         authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
//       }
//     })
//       .then(res => res.json())
//       .then((result) => {
//         bla.forEach((bl) => {
//           if (bl.owner._id === result._id) {
//             bl.isMine = true;
//           }
//         });

//       })
//   })






// fetch(`https://around.nomoreparties.co/v1/group-12/cards/${item._id}`, {
//   headers: {
//     authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b",
//     "Content-Type": "application/json"
//   }
// })
//   .then(res => {
//       return res.json();
//     })

//   .then((card) => {
//     return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
//       method: 'GET',
//       headers: {
//         authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
//       }
//     })
//       .then(res => res.json())
//       .then((user) => {

//           card.likes.forEach((like) => {
//             // console.log(like._id);
//             if (like._id === user._id) {
//               // card.bla();
//               console.log(like);
//             }
//           })
//           // if (card.owner._id === user._id) {
//           //   card.isMine = true;
//           // }
//           // cardRenderer.renderer(card)

//       })
//   });


///////////////////////////////////////////////////////////////////////////////

const cardRenderer = new Section({
  // items: initialCards,
  renderer: (item) => {
    // console.log(item.myNewCard);
    if (item.myNewCard) {
      const cardElement = createCard(item);
      cardRenderer.addPrependItem(cardElement);
    } else {
      const cardElement = createCard(item);
      cardRenderer.addAppendItem(cardElement);
    }
  }
}, cardsList);

/////////////////////////////////////////////////////////////////////////////////////

fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
  method: 'GET',
  headers: {
    authorization: "2f92e6f8-d3bf-4f0b-b7c9-ecb844a65d7b"
  }
})
  .then(res => res.json())
  .then((ava) => { console.log(ava) });


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

////////////////////////////////////////////////////////////////////////////////////////



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


///////////////////////////////////////////////////////////////////////////////////

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
  formValidators[popupAddForm.getAttribute('name')].resetValidation();

  popupEditAvatarRenderer.switchBtnToSave();
  popupEditAvatarRenderer.open();
});







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
