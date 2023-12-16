import { deleteCard, likeCard, dislikeCard } from "./api";

/* Функция генерации карточки */

export default function createCard(cardAtribute, profileId, handleImageClick) {
  const cardTemplate = document.querySelector("#card-template").content,
    card = cardTemplate.querySelector(".card").cloneNode(true),
    cardImage = card.querySelector(".card__image"),
    cardTitle = card.querySelector(".card__title"),
    cardLikeButton = card.querySelector(".card__like-button"),
    cardLikeCouner = card.querySelector(".card__like-counter"),
    deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = cardAtribute.link;
  cardImage.alt = cardAtribute.name;
  cardTitle.textContent = cardAtribute.name;
  cardLikeCouner.textContent = cardAtribute.likes.length;

  if (cardAtribute.likes.some((likeItem) => likeItem._id === profileId))
    cardLikeButton.classList.add("card__like-button_is-active");
  else cardLikeButton.classList.remove("card__like-button_is-active");

  cardImage.addEventListener("click", handleImageClick);
  cardLikeButton.addEventListener("click", () => {
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      dislikeCard(cardAtribute._id)
        .then(
          (cardData) => (cardLikeCouner.textContent = cardData.likes.length)
        )
        .catch((error) =>
          console.error("Ошибка при добавлении карточки:", error)
        );

      cardLikeButton.classList.remove("card__like-button_is-active");
    } else {
      likeCard(cardAtribute._id)
        .then(
          (cardData) => (cardLikeCouner.textContent = cardData.likes.length)
        )
        .catch((error) =>
          console.error("Ошибка при добавлении карточки:", error)
        );

      cardLikeButton.classList.add("card__like-button_is-active");
    }
  });

  if (cardAtribute.owner._id === profileId) {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardAtribute._id);
      card.remove();
    });
    deleteButton.style.display = "block";
  } else deleteButton.style.display = "none";

  return card;
}
