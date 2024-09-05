import '../pages/index.css';
import {createCard, 
        deleteCard,
        addLike, deleteLike} from './card.js';
import {openModal,
        closeModal} from './modal.js';
import {enableValidation,
       clearValidation,
       config} from './validation.js';
import {getUserInfo, 
       getArrayOfCards, 
       changeUser, 
       addCardToServer} from './api.js';
       
//див для карточек
const placesList = document.querySelector('.places__list');
//попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupBigСard = document.querySelector('.popup_type_image');
const titlePopup = popupBigСard.querySelector('.popup__caption');
const imagePopup = popupBigСard.querySelector('.popup__image');
//форма редактирования данных
const profileImage = document.querySelector('.profile__image');
const formProfile = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
//форма добавления карточек
const formCard = document.querySelector('.popup_type_new-card .popup__form');
const cardName = formCard.querySelector('.popup__input_type_card-name');
const cardLink = formCard.querySelector('.popup__input_type_url');

//функция добавления модального окна 3
function openPopupCards(elem) {
    imagePopup.src = elem.src;
    imagePopup.alt = elem.alt;
    titlePopup.textContent = elem.alt;
    openModal(popupBigСard);
}

//добавление профиля с сервера на страницу
document.addEventListener('DOMContentLoaded', () => {
    getUserInfo()
        .then((data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
        })
        .catch((error) => {
            console.error('Ошибка при загрузке данных пользователя:', error);
        });
});

//функция-обработчик отправки формы редактирования данных
function submitEditForm(evt) {
    evt.preventDefault(); 
    const name = nameInput.value;
    const about = jobInput.value;
    changeUser(name, about)
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
    })
    .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
    });
    closeModal(popupEdit);
    formProfile.reset();
};
//добавляем значения полям окна редактирования профля при открытии
function renderResult(obj) {
    nameInput.value = obj.name;
    jobInput.value = obj.about;
};

//функция добавления карточек
function addNewCard(elem) {
    elem.preventDefault();
    const name = cardName.value;
    const link = cardLink.value;
    addCardToServer(name, link)
    .then((data) => {
        const cardElement = createCard(data, deleteCard, addLike, deleteLike, openPopupCards);
        placesList.prepend(cardElement);
    })
    .catch((error) => {
        console.error('Ошибка при добавлении карточки:', error);
    });
    closeModal(popupNewCard);
    formCard.reset();
}




//слушатель открытия окна редактирования профиля
document.querySelector('.profile__edit-button').addEventListener('click', function() {
    openModal(popupEdit);
    getUserInfo()
    .then(res => {
      renderResult(res);
    })
    .catch(error => {
      console.error('Не удалось загрузить информацию о пользователе:', error);
    });
    clearValidation(formProfile, config);
});
//слушатель добавления модального окна 2
document.querySelector('.profile__add-button').addEventListener('click', function() {
   openModal(popupNewCard);
   formCard.reset();
   clearValidation(formCard, config);
   }
);
//слушатель удаления модальных окон по крестику
document.querySelectorAll('.popup__close').forEach((button) => {
    button.addEventListener('click', function () {
    const openPopup = document.querySelector('.popup_is-opened');
       closeModal(openPopup);
       })
});
//слушатель к форме редактирования данных
formProfile.addEventListener('submit', submitEditForm);
//слушатель добавления карточек
formCard.addEventListener('submit', addNewCard);
//добавление карточек с сервера при загрузке
function processCards() {
    getArrayOfCards().then(cardsArray => {
        cardsArray.forEach((card) => {
            const cardElement = createCard(card, deleteCard, addLike, deleteLike, openPopupCards);
            if (cardElement) {
                placesList.append(cardElement);
            } else {
                console.error('Ошибка при создании карточки:', card);
            }
            
        });
        console.log(cardsArray)
    });
}

// Вызов функции для обработки карточек
processCards();

//вызов функции валидации формы
enableValidation(config);






