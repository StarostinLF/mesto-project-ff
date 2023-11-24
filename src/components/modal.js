/* Функция открытия/закрытия попапов */

function openPopup(popupElement) {
  const popup = popupElement;

  popup.classList.add("popup_is-opened");
}

function closePopup(popupElement) {
  const popup = popupElement;

  popup.classList.remove("popup_is-opened");

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      popup.classList.remove("popup_is-opened");

      document.removeEventListener("keydown", closePopup);
    }
  });
}

export { openPopup, closePopup };
