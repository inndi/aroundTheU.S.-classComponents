const body = document.querySelector('.page');

const profile = body.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__about-me');
const editButton = profile.querySelector('.profile__edit-btn');
const addButton = profile.querySelector('.profile__add-btn');

const popups = body.querySelectorAll('.popup');

const popupEdit = body.querySelector('.popup_edit');
const popupAdd = body.querySelector('.popup_add');
const popupCard = body.querySelector('.popup_card');

const popupEditForm = popupEdit.querySelector('.popup__form');
const fieldName = popupEdit.querySelector('.popup__input_field_name');
const fieldAboutMe = popupEdit.querySelector('.popup__input_field_about-me');
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


function closePopupOnClick() {
  popups.forEach((somePopup) => {
    somePopup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(somePopup);
      };
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(somePopup);
      };
    });
  });
}

function closePopupOnEscKeydown(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_opened');
    closePopup(modal);
  };
}

function openPopup(somePopup) {
  closePopupOnClick();
  document.addEventListener('keydown', closePopupOnEscKeydown);

  somePopup.classList.add('popup_opened');
}

function closePopup(somePopup) {
  document.removeEventListener('keydown', closePopupOnEscKeydown);

  somePopup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = fieldName.value;
  profileInfo.textContent = fieldAboutMe.value;

  closePopup(popupEdit);
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

    openPopup(popupCard);
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
  closePopup(popupAdd);

  console.log(createCardButton);

  createCardButton.classList.add('popup__save-btn_disabled');
  createCardButton.setAttribute('disabled', 'disabled');
  popupAddForm.reset();
}

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  fieldName.value = profileName.textContent;
  fieldAboutMe.value = profileInfo.textContent;
});

popupEditForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => { openPopup(popupAdd) });
popupAddForm.addEventListener('submit', addNewCard);
