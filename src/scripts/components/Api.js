export class Api {
  constructor(fetchData) {
    this._baseUrl = fetchData.baseUrl;
    this._headers = fetchData.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getMyProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  delete(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  postNewCardData(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(this._checkResponse);
  }

  patchProfileData(editFields) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: editFields.profileName,
        about: editFields.profileAbout
      })
    })
      .then(this._checkResponse);
  }

  patchAvatar(field) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: field.avatarLink,
      })
    })
      .then(this._checkResponse);
  }

  removeLike(itemId) {
    return fetch(`${this._baseUrl}/cards/likes/${itemId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  addLike(itemId) {
    return fetch(`${this._baseUrl}/cards/likes/${itemId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
}