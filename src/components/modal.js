/* Функция открытия попапов */

function openPopup(querySelectorClassName) {
  const popup = querySelectorClassName;

  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeByEscape);
}

/* Функция закрытия попапов */

function closePopup(querySelectorClassName) {
  const popup = querySelectorClassName;

  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closeByEscape);
}

/* Функция закрытия попапов через Escape */

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    closePopup(openedPopup);
  }
}

export { openPopup, closePopup };
