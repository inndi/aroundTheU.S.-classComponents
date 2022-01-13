const body = document.querySelector('.page');

const profile = body.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__about-me');
const editButton = profile.querySelector('.profile__edit-btn');
const addButton = profile.querySelector('.profile__add-btn');

const popupEdit = body.querySelector('.popup_edit');
const popupAdd = body.querySelector('.popup_add');
const popupCard = body.querySelector('.popup_card');

const popupEditForm = popupEdit.querySelector('.popup__form');
const fieldName = popupEdit.querySelector('.popup__input_field_name');
const fieldAboutMe = popupEdit.querySelector('.popup__input_field_about-me');
const saveButton = popupEdit.querySelector('.popup__save-btn');
const closeEditButton = popupEdit.querySelector('.popup__close-btn');

const popupAddForm = popupAdd.querySelector('.popup__form');
const fieldTitle = popupAdd.querySelector('.popup__input_field_title');
const fieldLink = popupAdd.querySelector('.popup__input_field_link');
const createCardButton = popupAdd.querySelector('.popup__save-btn');
const closeAddButton = popupAdd.querySelector('.popup__close-btn');

const closeCardButton = popupCard.querySelector('.popup__close-btn');
const popupCardImage = popupCard.querySelector('.popup__card-img');
const popupCardTitle = popupCard.querySelector('.popup__card-title');

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

function togglePopup(somePopup) {
  somePopup.classList.toggle('popup_opened');
}


function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = fieldName.value;
  profileInfo.textContent = fieldAboutMe.value;

  togglePopup(popupEdit);
}

function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__img');
  const cardTitle = cardElement.querySelector('.card__title');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const likeButton = cardElement.querySelector('.card__like-btn');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-btn_active');
  });

  const deleteButton = cardElement.querySelector('.card__delete-btn');
  deleteButton.addEventListener('click', function () {
    cardElement.remove();
  })

  cardImage.addEventListener('click', function () {
    popupCardImage.src = cardData.link;
    popupCardImage.alt = cardData.name;
    popupCardTitle.textContent = cardData.name;

    togglePopup(popupCard);
  });

  return cardElement;
}

function prependCard(cardData) {
  const cardElement = createCard(cardData);
  cardsList.prepend(cardElement);
}

initialCards.forEach((card) => {
  const cardElement = prependCard(card);
});

function addNewCard(evt) {
  evt.preventDefault();

  const card = {};
  card.name = fieldTitle.value;
  card.link = fieldLink.value;

  prependCard(card);
  togglePopup(popupAdd);

  popupAddForm.reset();
}

editButton.addEventListener('click', () => {
  togglePopup(popupEdit);
  fieldName.value = profileName.textContent;
  fieldAboutMe.value = profileInfo.textContent;
});

// function closeThrowOverlay() {

// }

closeEditButton.addEventListener('click', () => { togglePopup(popupEdit) });
popupEditForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => { togglePopup(popupAdd) });
closeAddButton.addEventListener('click', () => { togglePopup(popupAdd) });
popupAddForm.addEventListener('submit', addNewCard);

closeCardButton.addEventListener('click', () => { togglePopup(popupCard) });