import "./pages/index.css";
import createCard from "./components/cards";
import { openPopup, closePopup } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  updateAvatar,
  getProfileInfo,
  editProfileInfo,
  getInitialCards,
  addCard,
} from "./components/api";

/* @todo: DOM узлы */

const placesList = document.querySelector(".places__list");

const profile = document.querySelector(".profile"),
  profileId = profile.querySelector(".profile__id"),
  profileAvatarEditButton = profile.querySelector(".profile__image"),
  profileEditButton = profile.querySelector(".profile__edit-button"),
  profileTitle = profile.querySelector(".profile__title"),
  profileDescription = profile.querySelector(".profile__description"),
  profileAddButton = profile.querySelector(".profile__add-button");

const avatarForm = document.querySelector('.popup__form[name="avatar"]'),
  avatarLinkInput = avatarForm.querySelector(".popup__input_type_url");

const profileForm = document.querySelector('.popup__form[name="edit-profile"]'),
  nameInput = profileForm.querySelector(".popup__input_type_name"),
  jobInput = profileForm.querySelector(".popup__input_type_description");

const cardForm = document.querySelector('.popup__form[name="new-place"]'),
  cardNameInput = cardForm.querySelector(".popup__input_type_card-name"),
  cardLinkInput = cardForm.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup"),
  popupAvatar = document.querySelector(".popup_type_edit_avatar"),
  popupEditProfile = document.querySelector(".popup_type_edit"),
  popupNewCard = document.querySelector(".popup_type_new-card"),
  popupImageContainer = document.querySelector(".popup_type_image"),
  popupImage = popupImageContainer.querySelector(".popup__image"),
  popupCaption = popupImageContainer.querySelector(".popup__caption");

/* Вывести данные профиля */

getProfileInfo()
  .then((userData) => {
    profileAvatarEditButton.style.backgroundImage = `url(\\${userData.avatar})`;
    profileId.textContent = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
  })
  .catch((error) =>
    console.error("Ошибка при получении данных пользователя:", error)
  );

/* Вывести карточки на страницу */

getInitialCards()
  .then((cardsData) => {
    cardsData.forEach((cardData) => {
      placesList.append(
        createCard(cardData, profileId.textContent, handleImageClick)
      );
    });
  })
  .catch((error) =>
    console.error("Ошибка при загрузке начальных карточек:", error)
  );

/* @todo: Изменить аватар профиля */

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  updateAvatar(avatarLinkInput.value)
    .then((userData) => {
      profileAvatarEditButton.style.backgroundImage = `url(\\${userData.avatar})`;
    })
    .catch((error) =>
      console.error("Ошибка при получении данных пользователя:", error)
    );

  clearValidation(avatarForm);
  closePopup(popupAvatar);
}

/* @todo: Изменить имя и биографию профиля */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  editProfileInfo(profileTitle.textContent, profileDescription.textContent);

  clearValidation(profileForm);
  closePopup(popupEditProfile);
}

/* @todo: Добавить карточку на страницу */

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  addCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        profileId.textContent,
        handleImageClick
      );

      placesList.prepend(newCard);
    })
    .catch((error) => console.error("Ошибка при добавлении карточки:", error));

  clearValidation(cardForm);
  closePopup(popupNewCard);

  cardForm.reset();
}

/* @todo: Открыть изображение */

function handleImageClick(evt) {
  const card = evt.target.closest(".card"),
    cardImage = card.querySelector(".card__image"),
    cardTitle = card.querySelector(".card__title");

  popupImage.src = cardImage.src;
  popupImage.alt = cardTitle.alt;
  popupCaption.textContent = cardTitle.textContent;

  openPopup(popupImageContainer);
}

/* Обработчики событий (формы, попапы) */

avatarForm.addEventListener("submit", handleAvatarFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleNewCardFormSubmit);

profileAvatarEditButton.addEventListener("click", () => {
  getProfileInfo()
    .then((userData) => (avatarLinkInput.value = userData.avatar))
    .catch((error) =>
      console.error("Ошибка при получении данных пользователя:", error)
    );

  openPopup(popupAvatar);
});
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
});
profileAddButton.addEventListener("click", () => openPopup(popupNewCard));

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.matches(".popup_is-opened, .popup__close"))
      closePopup(popup);
  });
});

/* Валидация форм */
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

clearValidation(avatarForm);
clearValidation(profileForm);
clearValidation(cardForm);
