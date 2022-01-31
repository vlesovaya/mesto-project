import {config} from "./data.js";

function getUserInfo() {
  return sendRequest('/users/me', 'GET');
}

function getCards() {
  return sendRequest('/cards', 'GET');
}

function editProfile(name, info) {
  return sendRequest("/users/me", 'PATCH', JSON.stringify({
    name: name,
    about: info
  }));
}

function editProfilePhoto(link) {
  return sendRequest("/users/me/avatar", 'PATCH', JSON.stringify({
    avatar: link
  }));
}

function addNewCard(name, link) {
  return sendRequest("/cards", 'POST', JSON.stringify({
    name: name,
    link: link
  }));
}

function deleteCard(id) {
  return sendRequest(`/cards/${id}`, 'DELETE');
}

function toggleLikeOnCard(isLiked, id) {
  return sendRequest(`/cards/likes/${id}`, isLiked ? 'PUT' : 'DELETE');
}

function sendRequest(urlSuffix, method, body = null) {
  return fetch(`${config.baseUrl}${urlSuffix}`, {
    method: method,
    headers: config.headers,
    body: body
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export {getUserInfo, getCards, editProfile, editProfilePhoto, addNewCard, deleteCard, toggleLikeOnCard};
