/* Захаркоженные изображения */
import moscowImage from "../images/astemir-almov--kgrPSetNW8-unsplash.webp";
import spbImage from "../images/daniil-smetanin-pjQyR8lYZw4-unsplash.webp";
import samaraImage from "../images/alexandra-nosova-uWVi5YHbtco-unsplash.webp";
import kazanImage from "../images/alexey-ruban-JnlpvSKALl4-unsplash.webp";
import krasnodarImage from "../images/kirill-sirazheev-x14FSxm1YVA-unsplash.webp";
import sochiImage from "../images/dima-fedorov-ZZkw00YCY1E-unsplash.webp";

const initialCards = [
  {
    name: "Москва",
    link: moscowImage,
  },
  {
    name: "Санкт-Петербург",
    link: spbImage,
  },
  {
    name: "Самара",
    link: samaraImage,
  },
  {
    name: "Казань",
    link: kazanImage,
  },
  {
    name: "Краснодар",
    link: krasnodarImage,
  },
  {
    name: "Сочи",
    link: sochiImage,
  },
];

/* Функция создания карточки */

function createCard(cardAtribute, handleImageClick, likeCard, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content,
    card = cardTemplate.querySelector(".card").cloneNode(true),
    cardImage = card.querySelector(".card__image"),
    cardTitle = card.querySelector(".card__title"),
    cardLikeButton = card.querySelector(".card__like-button"),
    deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = cardAtribute.link;
  cardImage.alt = cardAtribute.name;
  cardTitle.textContent = cardAtribute.name;

  cardImage.addEventListener("click", handleImageClick);
  cardLikeButton.addEventListener("click", likeCard);
  deleteButton.addEventListener("click", deleteCard);

  return card;
}

/* Функция лайка карточки */

function likeCard(evt) {
  const card = evt.target.closest(".card"),
    cardLikeButton = card.querySelector(".card__like-button");

  cardLikeButton.classList.toggle("card__like-button_is-active");
}

/* Функция удаления карточки */

function deleteCard(evt) {
  const card = evt.target.closest(".card");

  card.remove();
}

export { initialCards, createCard, likeCard, deleteCard };
