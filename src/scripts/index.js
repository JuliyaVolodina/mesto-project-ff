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
       addCardToServer, 
       getUserAvatar} from './api.js';
       
//див для карточек
const placesList = document.querySelector('.places__list');

//ID пользователя
let currentUserId = null;

//форма редактирования данных
const popupEdit = document.querySelector('.popup_type_edit');
const formProfile = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const buttonPopupEdit = formProfile.querySelector('.button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//форма добавления карточек
const popupNewCard = document.querySelector('.popup_type_new-card');
const formCard = document.querySelector('.popup_type_new-card .popup__form');
const cardName = formCard.querySelector('.popup__input_type_card-name');
const cardLink = formCard.querySelector('.popup__input_type_url');
const buttonPopupNewCard = formCard.querySelector('.button');

//попап большой карточки
const popupBigСard = document.querySelector('.popup_type_image');
const titlePopup = popupBigСard.querySelector('.popup__caption');
const imagePopup = popupBigСard.querySelector('.popup__image');

//форма редактирования аватара
const popupAvatar = document.querySelector('.popup_editing_avatars');
const profileImage = document.querySelector('.profile__image');
const formAvatar = document.querySelector('.popup_editing_avatars .popup__form');
const inputAvatar = formAvatar.querySelector('#link-input-avatar');
const buttonPopupAvatar = formAvatar.querySelector('.button');

//функция обновления аватара на странице
function updateNewAvatar(evt) {
    evt.preventDefault(); 
    const newAvatarUrl = inputAvatar.value; 
    buttonPopupAvatar.textContent = 'Сохранение...';
    buttonPopupAvatar.disabled = true;
    getUserAvatar(newAvatarUrl)
    .then(() => {
        profileImage.style.backgroundImage = `url(${newAvatarUrl})`;
    })
    .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
    })
    .finally(() => {
        buttonPopupAvatar.textContent = 'Сохранить';
        buttonPopupAvatar.disabled = false;
    });
    closeModal(popupAvatar);
};

//функция-обработчик отправки формы редактирования данных
function submitEditForm(evt) {
    evt.preventDefault(); 
    const name = nameInput.value;
    const about = jobInput.value;
    buttonPopupEdit.textContent = 'Сохранение...';
    buttonPopupEdit.disabled = true;
    changeUser(name, about)
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
    })
    .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
    })
    .finally(() => {
        buttonPopupEdit.textContent = 'Сохранить';
        buttonPopupEdit.disabled = false;
    });
    closeModal(popupEdit);
    formProfile.reset();
};

//функция добавления карточек пользователем
function addNewCard(elem) {
    elem.preventDefault();
    const name = cardName.value;
    const link = cardLink.value;
    buttonPopupNewCard.textContent = 'Сохранение...';
    buttonPopupNewCard.disabled = true;
    addCardToServer(name, link)
    .then((data) => {
        const cardElement = createCard(data, deleteCard, addLike, deleteLike, openPopupCards, currentUserId);
        placesList.prepend(cardElement);
    })
    .catch((error) => {
        console.error('Ошибка при добавлении карточки:', error);
    })
    .finally(() => {
        buttonPopupNewCard.textContent = 'Сохранить';
        buttonPopupNewCard.disabled = false;
    });
    closeModal(popupNewCard);
    formCard.reset();
};

//функция добавления всех карточек
function processCards(cardsArray, userId) {
    cardsArray.forEach((card) => {
    const cardElement = createCard(card, deleteCard, addLike, deleteLike, openPopupCards, currentUserId);
        if (cardElement) {
            placesList.append(cardElement);
        } else {
            console.error('Ошибка при создании карточки:', card);
        }
        const buttonDelete = cardElement.querySelector('.card__delete-button');
        if (card.owner._id !== userId) {
              buttonDelete.remove();
        }
    });
};

//открываем попап добавления аватара
profileImage.addEventListener('click', function () {
    openModal(popupAvatar);
    clearValidation(formAvatar, config);
    formAvatar.reset();
});

//открываем попап редактирования профиля
document.querySelector('.profile__edit-button').addEventListener('click', function() {
    openModal(popupEdit);
    getUserInfo()
    .then(res => {
        nameInput.value = res.name;
        jobInput.value = res.about;
    })
    .catch(error => {
      console.error('Не удалось загрузить информацию о пользователе:', error);
    });
    clearValidation(formProfile, config);
});

//открываем попап добавления карточек
document.querySelector('.profile__add-button').addEventListener('click', function() {
    openModal(popupNewCard);
    formCard.reset();
    clearValidation(formCard, config);
 });

//открываем попап увеличенной карточки
function openPopupCards(elem) {
    imagePopup.src = elem.src;
    imagePopup.alt = elem.alt;
    titlePopup.textContent = elem.alt;
    openModal(popupBigСard);
};

//удаляем попапы по крестику
document.querySelectorAll('.popup__close').forEach((button) => {
    button.addEventListener('click', function () {
    const openPopup = document.querySelector('.popup_is-opened');
       closeModal(openPopup);
    });
});

//отправляем форму обновления аватара
formAvatar.addEventListener('submit', updateNewAvatar);

//отправка формы редактирования данных
formProfile.addEventListener('submit', submitEditForm);

//отправка формы добавления карточек
formCard.addEventListener('submit', addNewCard);

//добавление профиля и карточек с сервера на страницу
document.addEventListener('DOMContentLoaded', () => {
    const userInfoPromise = getUserInfo();
    const cardsPromise = getArrayOfCards();
    Promise.all([userInfoPromise, cardsPromise])
        .then(([userData, cardsData]) => {
            profileTitle.textContent = userData.name;
            profileDescription.textContent = userData.about;
            profileImage.style.backgroundImage = `url(${userData.avatar})`;
            currentUserId = userData._id;
            processCards(cardsData, currentUserId);
        })
        .catch((error) => {
            console.error('Ошибка при загрузке данных:', error);
        });
});

//вызов функции валидации формы
enableValidation(config);






