export const initialCards = [
  {
    name: "Москва",
    link: "./images/astemir-almov--kgrPSetNW8-unsplash.webp",
  },
  {
    name: "Санкт-Петербург",
    link: "./images/daniil-smetanin-pjQyR8lYZw4-unsplash.webp",
  },
  {
    name: "Самара",
    link: "./images/alexandra-nosova-uWVi5YHbtco-unsplash.webp",
  },
  {
    name: "Казань",
    link: "./images/alexey-ruban-JnlpvSKALl4-unsplash.webp",
  },
  {
    name: "Краснодар",
    link: "./images/kirill-sirazheev-x14FSxm1YVA-unsplash.webp",
  },
  {
    name: "Сочи",
    link: "./images/dima-fedorov-ZZkw00YCY1E-unsplash.webp",
  },
];

/* @todo: Функция удаления карточки */

export default function deleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}
