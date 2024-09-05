const config = {
    baseUrl: 'https://mesto.nomoreparties.co/wff-cohort-22',
    headers: {
      authorization: '9724a147-d16e-487f-81da-4aa0c940b312',
      'Content-Type': 'application/json'
    }
};

//загрузка информации о пользователе 
export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        })
    .catch((error) => {
        console.error('Ошибка:', error);
    
    });
}; 

//загрузка новых данных о пользователе на сервер
export function changeUser(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    
    });
}; 

//загрузка массива карточек на страницу
export function getArrayOfCards() {
    
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        return [];
    });
};

//загрузка на сервер новой карточки 
export function addCardToServer(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    
    });
}; 

//удаление карточек с сервера
export function deleteCardsOnServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    
    });
}; 

//добавления лайка карточке
export function addToLikesArray(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
        })
        .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(data => {
            if (!data.likes.some(like => like._id === userId)) {
                data.likes.push({ _id: userId });
            }
        })
        .catch((error) => {
            console.error('Ошибка:', error);
    });
}; 

//удаление лайка у карточки
export function deleteToLikesArray(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
        })
        .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(data => {
            data.likes = data.likes.filter(like => like._id !== userId);
        })
        .catch((error) => {
           console.error('Ошибка:', error);
    });
}; 











