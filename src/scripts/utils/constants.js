const body = document.querySelector('.page');

const profile = body.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__about-me');
const editButton = profile.querySelector('.profile__edit-btn');
const addButton = profile.querySelector('.profile__add-btn');

const popupEdit = body.querySelector('.popup_edit');
const popupAdd = body.querySelector('.popup_add');
const popupDelete = body.querySelector('.popup_delete');

const popupDeleteYesButton = popupDelete.querySelector('.popup__save-btn');

const popupCard = document.querySelector('.popup_card');

const popupEditForm = popupEdit.querySelector('.popup__form');
const fieldName = popupEdit.querySelector('.popup__input_field_name');
const fieldAboutMe = popupEdit.querySelector('.popup__input_field_about-me');

const popupAddForm = popupAdd.querySelector('.popup__form');

const cardsList = body.querySelector('.cards__list');

// const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
//   },
//   {
//     name: "Lake Louise",
//     link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
//   },
//   {
//     name: "Latemar",
//     link: "https://code.s3.yandex.net/web-code/latemar.jpg"
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://code.s3.yandex.net/web-code/lago.jpg"
//   }
// ];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export {
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
};