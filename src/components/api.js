/* Базовая ссылка на API и токен */

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-2",
  headers: {
    authorization: "ed383b99-1870-4886-8866-3d44839ba706",
    "Content-Type": "application/json",
  },
};

/* Отправка обновленого аватара */

function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

/* Получение данных профиля */

function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

/* Отправка отредактированных данных профиля */

function editProfileInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

/* Получение отредактированных данных профиля */

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

/* Отправка новой карточки */

function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

/* Удаление текущей карточки */

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

/* Лайк текущей карточки */

function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

/* Дизлайк текущей карточки */

function dislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export {
  updateAvatar,
  getProfileInfo,
  editProfileInfo,
  getInitialCards,
  addCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
