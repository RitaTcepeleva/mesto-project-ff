// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, deleteCardMethod) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardElementImage = cardElement.querySelector('.card__image');
    
    cardElementImage.src = card.link;
    cardElementImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCardMethod(cardElement));

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    // const card = event.target.closest('.card'); // event - an input received from event listener, prev version
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    cardsList.append(createCard(card, deleteCard));
});
