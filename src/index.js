import "./pages/index.css";
import { initialCards, deleteCard } from "./components/cards";
import openClosePopup from "./components/modal";

/* @todo: Темплейт карточки */

const cardTemplate = document.querySelector("#card-template").content;

/* @todo: DOM узлы */

const addCard = document.querySelector(".profile__add-button"),
  editProfile = document.querySelector(".profile__edit-button"),
  placesList = document.querySelector(".places__list");

/* @todo: Функция создания карточки */

function createCard(cardAtribute, deleteCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true),
    cardImage = card.querySelector(".card__image"),
    cardTitle = card.querySelector(".card__title"),
    //cardLikeButton = card.querySelector(".card__like-button"),
    deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = cardAtribute.link;
  cardImage.alt = cardAtribute.name;
  cardTitle.textContent = cardAtribute.name;

  deleteButton.addEventListener("click", deleteCard);

  return card;
}

/* @todo: Вывести карточки на страницу */

initialCards.forEach((cardItem) =>
  placesList.append(createCard(cardItem, deleteCard))
);

/* Обработчики событий (попапы, формы, зум изображений) */

addCard.addEventListener("click", () => {
  openClosePopup(".popup_type_new-card");
});

editProfile.addEventListener("click", () => {
  openClosePopup(".popup_type_edit");
});
