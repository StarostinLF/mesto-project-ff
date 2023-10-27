/* @todo: Темплейт карточки */

const cardTemplate = document.querySelector("#card-template").content;

/* @todo: DOM узлы */

//const profileAddButton = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

/* @todo: Функция создания карточки */

function CardGenerator(cardImageSrc, cardTitleName) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardTitle = card.querySelector(".card__title");
  //const cardLikeButton = card.querySelector(".card__like-button");

  cardImage.src = cardImageSrc;
  cardImage.alt = cardTitleName;
  cardTitle.textContent = cardTitleName;

  /* @todo: Функция удаления карточки */

  cardDeleteButton.addEventListener("click", () => {
    card.remove();
  });

  return card;
}

/* @todo: Вывести карточки на страницу */

initialCards.forEach((cardItem) => {
  const card = CardGenerator(cardItem.link, cardItem.name);

  placesList.append(card);
});
