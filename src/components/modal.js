/* Функция открытия/закрытия попапов */

export default function openClosePopup(className) {
  const popup = document.querySelector(className),
    closePopup = popup.querySelector(".popup__close");

  closePopup.addEventListener("click", () =>
    popup.classList.remove("popup_is-opened")
  );

  popup.classList.add("popup_is-opened");
}
