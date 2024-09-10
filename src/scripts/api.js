const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-22',
    headers: {
      authorization: '9724a147-d16e-487f-81da-4aa0c940b312',
      'Content-Type': 'application/json'
    }
};

const answer = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

const error = (error) => {
    console.error('Ошибка:', error);
};  

//загрузка информации о пользователе 
export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(answer)
   //.then((data) => {
     //   console.log(data)
   // })
    .catch(error);
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
    .then(answer)
    .catch(error);
};
//загрузка аватара
export function getUserAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    })
    .then(answer)
    
    .catch(error); 
}; 

//загрузка массива карточек на страницу
export function getArrayOfCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then(answer)
    //.then(data => {
    //  console.log(data)
   // })
    
    .catch(error);
};

//загрузка на сервер новой карточки 
export function addCardToServer(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link,
          
        })
    })
    .then(answer)
    .catch(error);
}; 

//удаление карточек с сервера
export function deleteCardsOnServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(answer)
    .catch(error);
}; 


//добавления лайка карточке
export function addToLikesArray(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
        })
        .then(answer)
        .catch(error);
}; 

//удаление лайка у карточки
export function deleteToLikesArray(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
        })
        .then(answer)
        .catch(error);
}; 











