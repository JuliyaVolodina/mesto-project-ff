const placesList = document.querySelector('.places__list');
function createCard(element, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image').src = element.link;
    cardImage.alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click',function() {
        deleteCard(cardElement);
    });
    return cardElement;
}
  
function deleteCard(cardElement) {
    return cardElement.remove();
}

initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard);
    placesList.append(cardElement);
});
