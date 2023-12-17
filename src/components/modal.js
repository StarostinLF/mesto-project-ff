/* Функция открытия попапов */

function openPopup(popup) {
  const newPopup = popup;

  newPopup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeByEscape);
}

/* Функция закрытия попапов */

function closePopup(popup) {
  const newPopup = popup;

  newPopup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closeByEscape);
}

/* Функция закрытия попапов через Escape */

function closeByEscape(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");

  if (evt.key === "Escape") closePopup(openedPopup);
}

function closeByOverlay(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");

  if (evt.target.matches(".popup_is-opened, .popup__close"))
    closePopup(openedPopup);
}

export { openPopup, closePopup, closeByOverlay };
