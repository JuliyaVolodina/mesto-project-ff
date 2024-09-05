import {deleteCardsOnServer, addToLikesArray, deleteToLikesArray} from './api.js';

//создание карточки
export function createCard(element, deleteCard, addLike, deleteLike, openPopupCards) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    const titleCard = cardElement.querySelector('.card__title');
    titleCard.textContent = element.name;
    const cardId = element._id;
    console.log(cardId)
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    const currentUserId = 'e1a08d19b82bad1d681f9f24';
    if (element.owner._id !== currentUserId) {
        buttonDelete.remove();
    } else {
        buttonDelete.addEventListener('click', function() {
            deleteCard(cardElement, cardId);
        });
    }
    const buttonLike = cardElement.querySelector('.card__description .button');
    buttonLike.addEventListener('click', function() {
        if (buttonLike.classList.contains('card__like-button')) {
            addLike(buttonLike, cardId);
        } else {
            deleteLike(buttonLike, cardId);
        }
    }); 
    cardImage.addEventListener('click', function() {
        openPopupCards(cardImage);
    })   
    return cardElement;
};

//добавляем лайк
export function addLike(elem, cardId) {
    addToLikesArray(cardId)
      .then(() => {
        elem.classList.toggle('card__like-button_is-active');
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    });
};

//удаляем лайк
export function deleteLike(elem, cardId) {
    deleteToLikesArray(cardId)
    .then(() => {
        elem.classList.toggle('card__like-button');
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    });
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