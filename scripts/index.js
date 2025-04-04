// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, deleteCardMethod) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardMethod);

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest('.card');
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    cardsList.append(createCard(card, deleteCard));
});
