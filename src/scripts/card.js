export function createCard(element, deleteCard, clickLike) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    const titleCard = cardElement.querySelector('.card__title');
    titleCard.textContent = element.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
        deleteCard(cardElement);
    });
    const buttonLike = cardElement.querySelector('.card__like-button')
    buttonLike.addEventListener('click', function () {
        clickLike(buttonLike);
    });    
    return cardElement;
};

export function clickLike(evt) {
    evt.classList.toggle('card__like-button_is-active');
}

export function deleteCard(cardElement) {
    return cardElement.remove();
};

