import { initialCards } from './cards';
import { createCard, deleteCard, handleCardLike } from './card';
import { openPopup, closePopup, addCloseEventListeners } from './modal';
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

const forms = document.querySelectorAll('.popup__form');
const nameInput = forms[0].querySelector('.popup__input_type_name');
const descInput = forms[0].querySelector('.popup__input_type_description');
const cardNameInput = forms[1].querySelector('.popup__input_type_card-name');
const cardUrlInput = forms[1].querySelector('.popup__input_type_url');

const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

// show all of existed cards on the page
initialCards.forEach(card => {
    cardsList.append(createCard(card, deleteCard, cardTemplate, handleCardOpen, handleCardLike));
});

// open/close popups
editButton.addEventListener('click', () => {
    openPopup(editPopup)

    nameInput.value = profileTitle.textContent;
    descInput.value = profileDesc.textContent;
});

addButton.addEventListener('click', () => {
    openPopup(addPopup)

    cardNameInput.value = '';
    cardUrlInput.value = '';
});

addCloseEventListeners(editPopup);
addCloseEventListeners(addPopup);
addCloseEventListeners(imagePopup);

// save form input values
forms[0].addEventListener('submit', (evt) => handleEditFormSubmit(evt));
forms[1].addEventListener('submit', (evt) => handleAddFormSumbit(evt));

// add class for popup animation
editPopup.classList.add('popup_is-animated');
addPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

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