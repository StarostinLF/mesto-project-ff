/* @todo: Темплейт карточки */

const cardTemplate = document.querySelector("#card-template").content;

/* @todo: DOM узлы */

const addButton = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

/* @todo: Функция создания карточки */

function createCard(cardAtribute, deleteCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  //const cardLikeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = cardAtribute.link;
  cardImage.alt = cardAtribute.name;
  cardTitle.textContent = cardAtribute.name;

  deleteButton.addEventListener("click", deleteCard);

  return card;
}

/* @todo: Функция удаления карточки */

function deleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

/* @todo: Вывести карточки на страницу */

initialCards.forEach((cardItem) =>
  placesList.append(createCard(cardItem, deleteCard))
);

/* @todo: Открыть/закрыть попап добавления карточки */

/*addButton.addEventListener("click", () => {
  const popup = document.querySelector(".popup_type_new-card");
  const closePopup = popup.querySelector(".popup__close");

  closePopup.addEventListener("click", () =>
    popup.classList.remove("popup_is-opened")
  );

  popup.classList.add("popup_is-opened");
});*/
