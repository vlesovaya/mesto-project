class Api {
  constructor(config) {
    this.config = config;
  }

  getUserInfo() {
    return sendRequest('/users/me', 'GET');
  }

  getCards() {
    return sendRequest('/cards', 'GET');
  }

  editProfile(name, info) {
    return sendRequest("/users/me", 'PATCH', JSON.stringify({
      name: name,
      about: info
    }));
  }

  editProfilePhoto(link) {
    return sendRequest("/users/me/avatar", 'PATCH', JSON.stringify({
      avatar: link
    }));
  }

  addNewCard(name, link) {
    return sendRequest("/cards", 'POST', JSON.stringify({
      name: name,
      link: link
    }));
  }

  deleteCard(id) {
    return sendRequest(`/cards/${id}`, 'DELETE');
  }

  toggleLikeOnCard(isLiked, id) {
    return sendRequest(`/cards/likes/${id}`, isLiked ? 'PUT' : 'DELETE');
  }

  _sendRequest(urlSuffix, method, body = null) {
    return fetch(`${this.config.baseUrl}${urlSuffix}`, {
      method: method,
      headers: this.config.headers,
      body: body
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
