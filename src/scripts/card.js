// create card method
export function createCard(card, deleteCardMethod, cardTemplate, openImagePopupCallback, cardLikeCallback, ownerId, removeCardRequest, likeCardRequest, unlikeCardRequest) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardElementImage = cardElement.querySelector('.card__image');
    
    cardElementImage.src = card.link;
    cardElementImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__like-number').textContent = card.likes.length;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    if(card.owner._id == ownerId || ownerId == '') {
        deleteButton.addEventListener('click', () => deleteCardMethod(cardElement, card._id, removeCardRequest));
    } else {
        deleteButton.style.display = 'none';
    }

    if(ownerId != '') {
        if(card.likes.some(like => like._id == ownerId)) likeButton.classList.add('card__like-button_is-active');
    }

    cardElement.addEventListener('click', (evt) => {
        if(
            !evt.target.classList.contains("card__delete-button") &&
            !evt.target.classList.contains("card__like-button")
        ) {
            openImagePopupCallback(card);
        } // don't open popup if press on delete or like card button
    });

    likeButton.addEventListener('click', (evt) => cardLikeCallback(evt, card._id, likeCardRequest, unlikeCardRequest));

    return cardElement;
}

// delete card method
export function deleteCard(card, cardId, removeCardRequest) {
    // const card = event.target.closest('.card'); // event - an input received from event listener, prev version
    removeCardRequest(cardId).then(
        () => card.remove()
    ).catch((err) => console.log(err));
}

export function handleCardLike(evt, cardId, likeRequest, unlikeRequest) {
    const cardLikeNumnber = evt.target.parentNode.querySelector('.card__like-number');

    if (evt.target.classList.contains('card__like-button_is-active')) {
        unlikeRequest(cardId).then(res => {
            evt.target.classList.remove('card__like-button_is-active');
            cardLikeNumnber.textContent = res.likes.length;
        }).catch(err => console.log(err))
    } else {
        likeRequest(cardId).then(res => {
            evt.target.classList.add('card__like-button_is-active');
            cardLikeNumnber.textContent = res.likes.length;
        }).catch(err => console.log(err))
    }
    
    // evt.target.classList.toggle('card__like-button_is-active');
}