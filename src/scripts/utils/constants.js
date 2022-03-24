const body = document.querySelector('.page');

const profile = body.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__about-me');
const editButton = profile.querySelector('.profile__edit-btn');
const addButton = profile.querySelector('.profile__add-btn');

const popupEdit = body.querySelector('.popup_edit');
const popupAdd = body.querySelector('.popup_add');
const popupDelete = body.querySelector('.popup_delete');

const photoContainer = document.querySelector('.profile__photo');
const popupEditAvatar = document.querySelector('.popup_edit-photo');
const popupEditAvaForm = popupEditAvatar.querySelector('.popup__form');
const editAvatarBtn = document.querySelector('.profile__edit-avatar-btn');

const popupDeleteYesButton = popupDelete.querySelector('.popup__save-btn');

const popupCard = document.querySelector('.popup_card');

const popupEditForm = popupEdit.querySelector('.popup__form');
const fieldName = popupEdit.querySelector('.popup__input_field_name');
const fieldAboutMe = popupEdit.querySelector('.popup__input_field_about-me');

const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddTitle = popupAdd.querySelector('.popup__input_field_title');
const popupAddLink = popupAdd.querySelector('.popup__input_field_link');

const cardsList = body.querySelector('.cards__list');

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
  validationConfig,
  popupDelete,
  popupDeleteYesButton,
  photoContainer,
  popupEditAvatar,
  editAvatarBtn,
  popupEditAvaForm,
  popupAddTitle,
  popupAddLink
};