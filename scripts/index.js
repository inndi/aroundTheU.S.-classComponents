const body = document.querySelector('.page');
const profile = body.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__about-me');
const editButton = profile.querySelector('.profile__edit-btn');
const popupBox = body.querySelector('.popup');
const popupForm = popupBox.querySelector('.popup__form');
const fieldName = popupBox.querySelector('.popup__input_field_name');
const fieldAboutMe = popupBox.querySelector('.popup__input_field_about-me');
const saveButton = popupBox.querySelector('.popup__save-btn');
const closeButton = popupBox.querySelector('.popup__close-btn');

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

function renderPopup() {
  popupBox.classList.add('popup_opened');
  if (profileName.textContent != 0) {
    fieldName.value = profileName.textContent;
  }
  if (profileInfo.textContent != 0) {
    fieldAboutMe.value = profileInfo.textContent;
  }
}

function hidePopup() {
  popupBox.classList.remove('popup_opened');
  if (profileName.textContent == 0) {
    fieldName.value = fieldName.ariaPlaceholder;
  }
  if (profileInfo.textContent == 0) {
    fieldAboutMe.value = fieldAboutMe.ariaPlaceholder;
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = fieldName.value;
  profileInfo.textContent = fieldAboutMe.value;

  hidePopup();
}





function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__img').src = cardData.link;

  cardsList.prepend(cardElement);
}

initialCards.forEach((card) => {
  const cardElement = createCard(card);
});



editButton.addEventListener('click', renderPopup);
closeButton.addEventListener('click', hidePopup);
popupForm.addEventListener('submit', handleProfileFormSubmit);
