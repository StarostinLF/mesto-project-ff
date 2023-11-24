/* Функция открытия/закрытия попапов */

function openPopup(querySelectorClassName) {
  const popup = querySelectorClassName;

  popup.classList.add("popup_is-opened");
}

function closePopup(querySelectorClassName) {
  const popup = querySelectorClassName;

  popup.classList.remove("popup_is-opened");

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      popup.classList.remove("popup_is-opened");

      document.removeEventListener("keydown", closePopup);
    }
  });
}

export { openPopup, closePopup };
