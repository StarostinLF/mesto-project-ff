/* Функция открытия/закрытия попапов */

export default function openClosePopup(popupClass) {
  const popup = document.querySelector(popupClass),
    closePopup = popup.querySelector(".popup__close");

  popup.addEventListener("click", (evt) => {
    if (evt.target === popup || evt.target === closePopup)
      popup.classList.remove("popup_is-opened");
  }); 

  popup.classList.add("popup_is-opened");
}
