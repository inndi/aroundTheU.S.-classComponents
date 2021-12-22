const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileInfo = profile.querySelector(".profile__about-me");
const editButton = profile.querySelector(".profile__edit-btn");
const popupBox = profile.querySelector(".popup");
const popupForm = popupBox.querySelector(".popup__form");
const fieldName = popupBox.querySelector(".popup__name");
const fieldAboutMe = popupBox.querySelector(".popup__about-me");
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

function hiddenPopup() {
  popupBox.classList.remove("popup_opened");
  if (profileName.textContent == 0) {
    fieldName.value = fieldName.ariaPlaceholder;
  }
  if (profileInfo.textContent == 0) {
    fieldAboutMe.value = fieldAboutMe.ariaPlaceholder;
  }
}

editButton.addEventListener("click", renderPopup);
closeButton.addEventListener("click", hiddenPopup);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = fieldName.value;
  profileInfo.textContent = fieldAboutMe.value;

  hiddenPopup();
}

popupForm.addEventListener('submit', handleProfileFormSubmit);