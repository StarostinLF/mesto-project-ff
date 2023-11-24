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
  editProfile = profile.querySelector(".profile__edit-button"),
  profileTitle = profile.querySelector(".profile__title"),
  profileDescription = profile.querySelector(".profile__description"),
  addCard = profile.querySelector(".profile__add-button");

const profileForm = document.querySelector('.popup__form[name="edit-profile"]'),
  nameInput = profileForm.querySelector(".popup__input_type_name"),
  jobInput = profileForm.querySelector(".popup__input_type_description");

const cardForm = document.querySelector('.popup__form[name="new-place"]'),
  cardNameInput = cardForm.querySelector(".popup__input_type_card-name"),
  cardLinkInput = cardForm.querySelector(".popup__input_type_url");

const popup = document.querySelectorAll(".popup"),
  popupEdit = document.querySelector(".popup_type_edit"),
  popupNewCardContainer = document.querySelector(".popup_type_new-card"),
  popupImageContainer = document.querySelector(".popup_type_image"),
  popupImage = popupImageContainer.querySelector(".popup__image"),
  popupCaption = popupImageContainer.querySelector(".popup__caption");

/* @todo: Вывести карточки на страницу */

initialCards.forEach((cardItem) =>
  placesList.append(
    createCard(cardItem, handleImageClick, likeCard, deleteCard)
  )
);

/* @todo: Отправить формы на странице */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value,
    newJob = jobInput.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  popupEdit.classList.remove("popup_is-opened");
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const popupNewCard = popupNewCardContainer,
    newCard = createCard(
      { name: cardNameInput.value, link: cardLinkInput.value },
      handleImageClick,
      likeCard,
      deleteCard
    );

  placesList.prepend(newCard);

  popupNewCard.classList.remove("popup_is-opened");

  cardForm.reset();
}

/* @todo: Открыть изображение */

function handleImageClick(evt) {
  const card = evt.target.closest(".card"),
    cardImage = card.querySelector(".card__image"),
    cardTitle = card.querySelector(".card__title");

  popupCaption.textContent = cardTitle.textContent;
  popupImage.alt = cardTitle.alt;
  popupImage.src = cardImage.src;

  openPopup(popupImageContainer);
}

/* Обработчики событий (попапы, формы) */

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleNewCardFormSubmit);

editProfile.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEdit);
});
addCard.addEventListener("click", () => {
  openPopup(popupNewCardContainer);
});

closePopup(popupEdit);
closePopup(popupImageContainer);
closePopup(popupNewCardContainer);
