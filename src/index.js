import "./pages/index.css";
import {
  initialCards,
  createCard,
  likeCard,
  deleteCard,
} from "./components/cards";
import { openPopup, closePopup } from "./components/modal";

/* @todo: DOM узлы */

const placesList = document.querySelector(".places__list");

const profile = document.querySelector(".profile"),
  profileEditButton = profile.querySelector(".profile__edit-button"),
  profileTitle = profile.querySelector(".profile__title"),
  profileDescription = profile.querySelector(".profile__description"),
  profileAddButton = profile.querySelector(".profile__add-button");

const profileForm = document.querySelector('.popup__form[name="edit-profile"]'),
  nameInput = profileForm.querySelector(".popup__input_type_name"),
  jobInput = profileForm.querySelector(".popup__input_type_description");

const cardForm = document.querySelector('.popup__form[name="new-place"]'),
  cardNameInput = cardForm.querySelector(".popup__input_type_card-name"),
  cardLinkInput = cardForm.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup"),
  popupEdit = document.querySelector(".popup_type_edit"),
  popupNewCard = document.querySelector(".popup_type_new-card"),
  popupImageContainer = document.querySelector(".popup_type_image"),
  popupImage = popupImageContainer.querySelector(".popup__image"),
  popupCaption = popupImageContainer.querySelector(".popup__caption");

/* @todo: Вывести карточки на страницу */

initialCards.forEach((cardItem) =>
  placesList.append(
    createCard(cardItem, handleImageClick, likeCard, deleteCard)
  )
);

/* @todo: Изменить профиль */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEdit);
}

/* @todo: Добавить карточку на страницу */

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = createCard(
    { name: cardNameInput.value, link: cardLinkInput.value },
    handleImageClick,
    likeCard,
    deleteCard
  );

  placesList.prepend(newCard);

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

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleNewCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEdit);
});
profileAddButton.addEventListener("click", () => openPopup(popupNewCard));

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.matches(".popup_is-opened, .popup__close"))
      closePopup(popup);
  });
});
