import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, 
        deleteCard,
        clickLike} from './card.js';
import {openModal,
        closeModal,} from './modal.js'

const placesList = document.querySelector('.places__list');
//попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupBigСard = document.querySelector('.popup_type_image');
const titlePopup = popupBigСard.querySelector('.popup__caption');
const imagePopup = popupBigСard.querySelector('.popup__image');

//форма редактирования данных
const formProfile = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const headerTitle = document.querySelector('.profile__title');
const headerText = document.querySelector('.profile__description');

//форма добавления карточек
const formCard = document.querySelector('.popup_type_new-card .popup__form');
const cardName = formCard.querySelector('.popup__input_type_card-name');
const cardLink = formCard.querySelector('.popup__input_type_url');

//добавление шести карточек
initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard, clickLike);
    placesList.append(cardElement);
    }
);

//слушатель добавления модального окна 1
document.querySelector('.profile__edit-button').addEventListener('click', function() {
    openModal(popupEdit);
    }
);

//слушатель добавления модального окна 2
document.querySelector('.profile__add-button').addEventListener('click', function() {
   openModal(popupNewCard);
   }
);

//слушатель добавления модального окна 3
document.querySelectorAll('.card__image').forEach((card) => {
    card.addEventListener('click', function() {
        imagePopup.src = card.src; 
        imagePopup.alt = card.alt;
        titlePopup.textContent = imagePopup.alt;
        openModal(popupBigСard);
    })
});

//слушатель удаления модальных окон по крестику
document.querySelectorAll('.popup__close').forEach((button) => {
   button.addEventListener('click', function () {
       closeModal();
       })
});

// Обработчик отправки формы редактирования данных
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    headerTitle.textContent = nameInput.value;
    headerText.textContent = jobInput.value;
    closeModal();
};

// слушатель к форме редактирования данных
formProfile.addEventListener('submit', handleFormSubmit);

//функция добавления карточек
function addNewCard(evt) {
    evt.preventDefault();
    const newCard = {name : cardName.value, link : cardLink.value};
    const cardElement = createCard(newCard, deleteCard, clickLike);
    placesList.prepend(cardElement);
    closeModal();
};

//слушатель добавления карточек
formCard.addEventListener('submit', addNewCard);
fjsakalkjlafjal









        




