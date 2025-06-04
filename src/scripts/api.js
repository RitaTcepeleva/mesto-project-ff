const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: '2b669b6a-0125-4fe1-9b48-a5c358b098c7',
    'Content-Type': 'application/json'
  }
}

export const getInitialProfileContent = () => {
    return fetch(config.baseUrl + '/users/me', {headers: config.headers})
        .then(res => getResponseData(res));
}

export const getInitialCards = () => {
    return fetch(config.baseUrl + '/cards', {headers: config.headers})
        .then(res => getResponseData(res));
}

export const editProfileContent = (name, about) => {
    return fetch(config.baseUrl + '/users/me', {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            name,
            about
        })
    }).then(res => getResponseData(res));
}

export const addCard = (name, link) => {
    return fetch(config.baseUrl + '/cards', {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
            name,
            link
        })
    }).then(res => getResponseData(res));
}

export const removeCard = (cardId) => {
    return fetch(config.baseUrl + '/cards/' + cardId, {
        headers: config.headers,
        method: 'DELETE'
    }).then(res => getResponseData(res));
}

export const likeCard = (cardId) => {
    return fetch(config.baseUrl + '/cards/likes/' + cardId, {
        headers: config.headers,
        method: 'PUT'
    }).then(res => getResponseData(res));
}

export const unlikeCard = (cardId) => {    
    return fetch(config.baseUrl + '/cards/likes/' + cardId, {
        headers: config.headers,
        method: 'DELETE'
    }).then(res => getResponseData(res));
}

export const editAvatar = (avatar) => {
    return fetch(config.baseUrl + '/users/me/avatar', {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            avatar
        })
    }).then(res => getResponseData(res));
}

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}
