/* Функция открытия/закрытия попапов */

function openPopup(popupElement) {
  const popup = popupElement;

  popup.classList.add("popup_is-opened");
}

function closePopup(popupElement) {
  const popup = popupElement,
    closeButton = popup.querySelector(".popup__close");

  popup.addEventListener("click", (evt) => {
    if (evt.target === popup || evt.target === closeButton) {
      popup.classList.remove("popup_is-opened");

      popup.removeEventListener("click", closePopup);
    }
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      popup.classList.remove("popup_is-opened");

      document.removeEventListener("keydown", closePopup);
    }
  });
}

export { openPopup, closePopup };
