import "./pages/index.css";
import {
  initialCards,
  createCard,
  likeCard,
  deleteCard,
} from "./components/cards";
import openClosePopup from "./components/modal";

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

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const popupEdit = document.querySelector(".popup_type_edit"),
    newName = nameInput.value,
    newJob = jobInput.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  popupEdit.classList.remove("popup_is-opened");
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const popupNewCard = document.querySelector(".popup_type_new-card"),
    newCard = createCard(
      { name: cardNameInput.value, link: cardLinkInput.value },
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

  openClosePopup(".popup_type_image");
}

/* Обработчики событий (попапы, формы, зум изображений) */

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleNewCardFormSubmit);

editProfile.addEventListener("click", () => {
  openClosePopup(".popup_type_edit");
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    popup.forEach((popup) => {
      if (popup.classList.contains("popup_is-opened"))
        popup.classList.remove("popup_is-opened");
    });
  }
});

addCard.addEventListener("click", () => {
  openClosePopup(".popup_type_new-card");
});
