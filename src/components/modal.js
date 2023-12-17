/* Функция открытия попапов */

function openPopup(popupClass) {
  const popup = popupClass;

  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeByEvents);
}

/* Функция закрытия попапов */

function closePopup(popupClass) {
  const popup = popupClass;

  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closeByEvents);
}

/* Функция закрытия попапов через Escape */

function closeByEvents(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");

  if (
    evt.key === "Escape" ||
    evt.target.matches(".popup_is-opened, .popup__close")
  )
    closePopup(openedPopup);
}

export { openPopup, closePopup, closeByEvents };
