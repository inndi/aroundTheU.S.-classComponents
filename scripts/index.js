const body = document.querySelector('.page');
const profile = body.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__about-me');
const editButton = profile.querySelector('.profile__edit-btn');
const addButton = profile.querySelector('.profile__add-btn');

const popupBox = body.querySelector('.popup');
const popupEdit = body.querySelector('.popup_edit');
const popupAdd = body.querySelector('.popup_add');

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


// const fields = popupBox.querySelectorAll('.popup__input');

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





// function renderPopup() {
//   popupBox.classList.add('popup_opened');
//   if (profileName.textContent != 0) {
//     fieldName.value = profileName.textContent;
//   }
//   if (profileInfo.textContent != 0) {
//     fieldAboutMe.value = profileInfo.textContent;
//   }
// }

// function hidePopup() {
//   popupBox.classList.remove('popup_opened');
//   if (profileName.textContent == 0) {
//     fieldName.value = fieldName.ariaPlaceholder;
//   }
//   if (profileInfo.textContent == 0) {
//     fieldAboutMe.value = fieldAboutMe.ariaPlaceholder;
//   }
// }

// function renderPopup() {
//   popupBox.classList.toggle('popup_opened');
//   if (field.textContent == 0) {
//     field.value = field.ariaPlaceholder;
//   }
// }





function renderPopup(somePopup) {
  somePopup.classList.toggle('popup_opened');

  // fields.forEach((field) => {

  //   if (field.textContent !== 0) {
  //     field.value = field.textContent;
  //   };
  //   if (field.textContent == 0) {
  //     field.value = field.ariaPlaceholder;
  //   }
  // });
}



function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // function check() {
  //   if (profileName.textContent != 0) {
  //     fieldName.value = profileName.textContent;
  //   }
  //   if (profileInfo.textContent != 0) {
  //     fieldAboutMe.value = profileInfo.textContent;
  //   }

  //   if (profileName.textContent == 0) {
  //     fieldName.value = fieldName.ariaPlaceholder;
  //   }
  //   if (profileInfo.textContent == 0) {
  //     fieldAboutMe.value = fieldAboutMe.ariaPlaceholder;
  //   }

  // }

  // return check;

  profileName.textContent = fieldName.value;
  profileInfo.textContent = fieldAboutMe.value;


  renderPopup(popupEdit);
}





function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__img').src = cardData.link;

  const likeButton = cardElement.querySelector('.card__like-btn');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-btn_active');
  });

  cardsList.prepend(cardElement);
}

initialCards.forEach((card) => {
  const cardElement = createCard(card);
});


function addNewCard(evt) {
  evt.preventDefault();

  let card = {};
  card.name = fieldTitle.value;
  card.link = fieldLink.value;

  createCard(card);
  renderPopup(popupAdd);
}



editButton.addEventListener('click', () => { renderPopup(popupEdit) });
closeEditButton.addEventListener('click', () => { renderPopup(popupEdit) });
popupEditForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => { renderPopup(popupAdd) });
closeAddButton.addEventListener('click', () => { renderPopup(popupAdd) });
popupAddForm.addEventListener('submit', addNewCard);
