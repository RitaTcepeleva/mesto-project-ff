import { initialCards } from './cards';
import { createCard, deleteCard, handleCardLike } from './card';
import { openPopup, closePopup, addCloseEventListeners } from './modal';
import { enableValidation, clearValidation } from './validation';
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

const forms = document.forms;
const nameInput = forms['edit-profile'].name;
const descInput = forms['edit-profile'].description;
const cardNameInput = forms['new-place']['place-name'];
const cardUrlInput = forms['new-place'].link;

const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

// show all of existed cards on the page
initialCards.forEach(card => {
    cardsList.append(createCard(card, deleteCard, cardTemplate, handleCardOpen, handleCardLike));
});

// open/close popups
editButton.addEventListener('click', () => {
    openPopup(editPopup);
    clearValidation(forms[0], {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });

    nameInput.value = profileTitle.textContent;
    descInput.value = profileDesc.textContent;
});

addButton.addEventListener('click', () => {
    openPopup(addPopup);
    clearValidation(forms[1], {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });

    forms['new-place'].reset();
});

addCloseEventListeners(editPopup);
addCloseEventListeners(addPopup);
addCloseEventListeners(imagePopup);

// save form input values
forms[0].addEventListener('submit', handleEditFormSubmit);
forms[1].addEventListener('submit', handleAddFormSumbit);

// add class for popup animation
editPopup.classList.add('popup_is-animated');
addPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

// enable validation
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
})

// handlers for forms
function handleEditFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = descInput.value;

    closePopup(editPopup);
}

function handleAddFormSumbit(evt) {
    evt.preventDefault();

    const card = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    };

    cardsList.insertBefore(createCard(card, deleteCard, cardTemplate, handleCardOpen, handleCardLike), cardsList.firstChild);

    closePopup(addPopup);
}

function handleCardOpen(card) {
    const imagePopupElement = imagePopup.querySelector('.popup__image');
    imagePopupElement.src = card.link;
    imagePopupElement.alt = card.name;

    imagePopup.querySelector('.popup__caption').textContent = card.name;

    openPopup(imagePopup);
}