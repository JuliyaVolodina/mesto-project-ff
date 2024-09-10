import {deleteCardsOnServer, 
    addToLikesArray, 
    deleteToLikesArray} from './api.js';

//создание карточки
export function createCard(element, deleteCard, addLike, deleteLike, openPopupCards, currentUserId) {
 const cardTemplate = document.querySelector('#card-template').content;
 const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
 const cardImage = cardElement.querySelector('.card__image');
 cardImage.src = element.link;
 cardImage.alt = element.name;
 const titleCard = cardElement.querySelector('.card__title');
 titleCard.textContent = element.name;
 const cardId = element._id;
 cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
     deleteCard(cardElement, cardId);
 });
 const buttonLike = cardElement.querySelector('.card__like-button');
 const likeCounter = cardElement.querySelector('.like-counter');
 likeCounter.textContent = element.likes.length;
 updateLikeButtonState(element.likes, currentUserId, buttonLike);
 buttonLike.addEventListener('click', function() {
    if (buttonLike.classList.contains('card__like-button_is-active')) {
        deleteLike(buttonLike, cardId, currentUserId, likeCounter);
    } else {
        addLike(buttonLike, cardId, currentUserId, likeCounter);
    }
 });
 cardImage.addEventListener('click', function() {
    openPopupCards(cardImage);
 })   
 return cardElement;
};

//добавляем лайк
export function addLike(button, cardId, currentUser, number) {
 addToLikesArray(cardId)
    .then((data) => {
        changeLikeState(button, number, data.likes, currentUser);
    })
    .catch((error) => {
        console.error('Ошибка при добавлении лайка:', error);
    });
};

//удаляем лайк
export function deleteLike(button, cardId, currentUser, number) {
 deleteToLikesArray(cardId)
    .then((data) => {
        changeLikeState(button, number, data.likes, currentUser);
    })
    .catch((error) => {
        console.error('Ошибка при удалении лайка:', error);
    });
};

//меняем состояние лайка
function changeLikeState(button, number, likes, currentUser) {
    if (likes.some(user => user._id === currentUser)) {
        button.classList.add('card__like-button_is-active');
    } else {
        button.classList.remove('card__like-button_is-active');
    }
    number.textContent = likes.length;
};

// проверка наличия лайка текущего пользователя
function updateLikeButtonState(likes, currentUser, button) {
    if (likes.some(user => user._id === currentUser)) {
        button.classList.add('card__like-button_is-active');
    } else {
        button.classList.remove('card__like-button_is-active');
    }
};

//функция удаления карточки
export function deleteCard(cardElement, cardId) {
    deleteCardsOnServer(cardId)
    .then(() => {
        cardElement.remove();
    })
    .catch((error) => {
        console.error('Ошибка при удалении карточки:', error);
    });
};