export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('keydown', handleEscKeyUp);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('keydown', handleEscKeyUp);
}

export function addCloseEventListeners(popup) {
    const closePopupBtn = popup.querySelector('.popup__close');

    closePopupBtn.addEventListener('click', () => closePopup(popup));

    popup.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    })
}

const handleEscKeyUp = (e) => {
    if (e.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
      closePopup(popup);
    }
};
