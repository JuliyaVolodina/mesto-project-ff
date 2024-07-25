function addCard(element, deleteItem) {
    const placesList = document.querySelector('.places__list');
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click',function() {
        deleteItem(cardElement);
    });
    placesList.append(cardElement);
}
  
function deleteItem(cardElement) {
    return cardElement.remove();
}

for(let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i], deleteItem);
}
  