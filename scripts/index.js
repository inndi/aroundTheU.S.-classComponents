const body = document.querySelector(".page");
const profile = body.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileInfo = profile.querySelector(".profile__about-me");
const editButton = profile.querySelector(".profile__edit-btn");
const popupBox = body.querySelector(".popup");
const popupForm = popupBox.querySelector(".popup__form");
const fieldName = popupBox.querySelector(".popup__input_field_name");
const fieldAboutMe = popupBox.querySelector(".popup__input_field_about-me");
const saveButton = popupBox.querySelector(".popup__save-btn");
const closeButton = popupBox.querySelector(".popup__close-btn");

function renderPopup() {
  popupBox.classList.add("popup_opened");
  if (profileName.textContent != 0) {
    fieldName.value = profileName.textContent;
  }
  if (profileInfo.textContent != 0) {
    fieldAboutMe.value = profileInfo.textContent;
  }
}

function hidePopup() {
  popupBox.classList.remove("popup_opened");
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

editButton.addEventListener("click", renderPopup);
closeButton.addEventListener("click", hidePopup);
popupForm.addEventListener('submit', handleProfileFormSubmit);