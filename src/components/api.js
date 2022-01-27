export {getUserInfo, getCards, editProfile, editProfilePhoto, addNewCard};

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '74e98393-69db-4e2a-9095-4b722370b5b8',
    'Content-Type': 'application/json'
  },
};

function getUserInfo() {
  return sendRequest('/users/me', 'GET', null);
}

function getCards() {
  return sendRequest('/cards', 'GET', null);
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

function sendRequest(urlSuffix, method, body) {
  return  fetch(`${config.baseUrl}${urlSuffix}`,{
    method: method,
    headers: config.headers,
    body: body
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

