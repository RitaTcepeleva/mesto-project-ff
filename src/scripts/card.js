import { openPopup } from "./modal";

// create card method
export function createCard(card, deleteCardMethod, cardTemplate, openImagePopupCallback, cardLikeCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardElementImage = cardElement.querySelector('.card__image');
    
    cardElementImage.src = card.link;
    cardElementImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCardMethod(cardElement));

    cardElement.addEventListener('click', (evt) => {
        if(
            !evt.target.classList.contains("card__delete-button") &&
            !evt.target.classList.contains("card__like-button")
        ) {
            openImagePopupCallback(card);
        } // don't open popup if press on delete or like card button
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', cardLikeCallback);

    return cardElement;
}

// delete card method
export function deleteCard(card) {
    // const card = event.target.closest('.card'); // event - an input received from event listener, prev version
    card.remove();
}

export function handleCardLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}