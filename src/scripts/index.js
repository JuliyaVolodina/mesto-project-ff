import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, 
        deleteCard,
        clickLike} from './card.js';
import {openModal,
        closeModal} from './modal.js'

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

//функция-бработчик отправки формы редактирования данных
function submitEditForm(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEdit) 
    formProfile.reset();
};

//функция добавления карточек
function addNewCard(elem) {
    elem.preventDefault();
    const newCard = {name : cardName.value, link : cardLink.value};
    const cardElement = createCard(newCard, deleteCard, clickLike, openPopupCards);
    placesList.prepend(cardElement);
    closeModal(popupNewCard);
    formCard.reset();
};

//слушатель добавления модального окна 1
document.querySelector('.profile__edit-button').addEventListener('click', function() {
    openModal(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    }
);

//слушатель добавления модального окна 2
document.querySelector('.profile__add-button').addEventListener('click', function() {
   openModal(popupNewCard);
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

//добавление шести карточек
initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard, clickLike, openPopupCards);
    placesList.append(cardElement);
    }
);

