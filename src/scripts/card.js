import { openPopup } from "./modal";

// create card method
export function createCard(card, deleteCardMethod, cardTemplate, imagePopup) {
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
            const imagePopupElement = imagePopup.querySelector('.popup__image');
            imagePopupElement.src = card.link;
            imagePopupElement.alt = card.name;

            imagePopup.querySelector('.popup__caption').textContent = card.name;

            openPopup(imagePopup);
        } // don't open popup if press on delete or like card button
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', handleCardLike);

    return cardElement;
}

// delete card method
export function deleteCard(card) {
    // const card = event.target.closest('.card'); // event - an input received from event listener, prev version
    card.remove();
}

function handleCardLike(evt) {
    if(evt.target.classList.contains('card__like-button_is-active'))
        evt.target.classList.remove('card__like-button_is-active');
    else evt.target.classList.add('card__like-button_is-active');
}