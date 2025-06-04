import { createCard, deleteCard, handleCardLike } from './card';
import { openPopup, closePopup, addCloseEventListeners } from './modal';
import { enableValidation, clearValidation } from './validation';
import { 
    getInitialProfileContent, 
    getInitialCards, 
    editProfileContent ,
    addCard,
    removeCard,
    likeCard,
    unlikeCard,
    editAvatar
} from './api';
import '../pages/index.css';

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupElement = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');

const avatarPopup = document.querySelector('.popup_type_edit-avatar');

const forms = document.forms;
const nameInput = forms['edit-profile'].name;
const descInput = forms['edit-profile'].description;
const cardNameInput = forms['new-place']['place-name'];
const cardUrlInput = forms['new-place'].link;
const avatarUrlInput = forms['edit-avatar'].link;

const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const submitButtons = Array.from(forms).map(form => form.querySelector(validationConfig.submitButtonSelector));

Promise.all([getInitialProfileContent(), getInitialCards()])
    .then(([dataProfile, initialCards]) => {
        // set initial profile content
        profileTitle.textContent = dataProfile.name;
        profileDesc.textContent = dataProfile.about;
        profileAvatar.setAttribute('style', `background-image: url(${dataProfile.avatar})`);

        // show all of existed cards on the page
        initialCards.forEach(card => {
            cardsList.append(createCard(card, deleteCard, cardTemplate, handleCardOpen, handleCardLike, dataProfile._id, removeCard, likeCard, unlikeCard));
        })
    })
    .catch(err => console.log(`Ошибка: ${err}`));

// open/close popups
editButton.addEventListener('click', () => {
    openPopup(editPopup);
    clearValidation(forms['edit-profile'], validationConfig);

    nameInput.value = profileTitle.textContent;
    descInput.value = profileDesc.textContent;
});

addButton.addEventListener('click', () => {
    openPopup(addPopup);
    forms['new-place'].reset();
    clearValidation(forms['new-place'], validationConfig);
});

profileAvatar.addEventListener('click', () => {
    openPopup(avatarPopup);
    forms['edit-avatar'].reset();
    clearValidation(forms['edit-avatar'], validationConfig);
})

addCloseEventListeners(editPopup);
addCloseEventListeners(addPopup);
addCloseEventListeners(imagePopup);
addCloseEventListeners(avatarPopup);

// save form input values
forms['edit-profile'].addEventListener('submit', handleEditFormSubmit);
forms['new-place'].addEventListener('submit', handleAddFormSumbit);
forms['edit-avatar'].addEventListener('submit', handleEditAvatarFormSubmit);

// add class for popup animation
editPopup.classList.add('popup_is-animated');
addPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
avatarPopup.classList.add('popup_is-animated');

// enable validation
enableValidation(validationConfig);

// handlers for forms
function handleEditFormSubmit(evt) {
    evt.preventDefault();

    savingStatus(submitButtons[0], true);
    editProfileContent(nameInput.value, descInput.value)
        .then(data => {
            profileTitle.textContent = data.name;
            profileDesc.textContent = data.about;

            closePopup(editPopup);
        })
        .catch((err) => {
            console.log('Ошибка ', err);
        })
        .finally(() => savingStatus(submitButtons[0], false));
}

function handleAddFormSumbit(evt) {
    evt.preventDefault();

    savingStatus(submitButtons[1], true);
    addCard(cardNameInput.value, cardUrlInput.value)
        .then(card => {
            cardsList.insertBefore(createCard(card, deleteCard, cardTemplate, handleCardOpen, handleCardLike, '', removeCard, likeCard, unlikeCard), cardsList.firstChild);

            closePopup(addPopup);
        })
        .catch(err => {
            console.log('Ошибка ', err);
        })
        .finally(() => savingStatus(submitButtons[1], false));
}

function handleEditAvatarFormSubmit(evt) {
    evt.preventDefault();

    savingStatus(submitButtons[2], true);
    editAvatar(avatarUrlInput.value)
        .then(data => {
            profileAvatar.style.backgroundImage = `url(${data.avatar})`;

            closePopup(avatarPopup);
        })
        .catch(err => {
            console.log('Ошибка ', err);
        })
        .finally(() => savingStatus(submitButtons[2], false));
}

function handleCardOpen(card) {
    imagePopupElement.src = card.link;
    imagePopupElement.alt = card.name;

    imageCaption.textContent = card.name;

    openPopup(imagePopup);
}

function savingStatus(submitButton, status) {
    if(status) {
        submitButton.textContent = 'Сохранение...'
    } else {
        submitButton.textContent = 'Сохранить'
    }
}