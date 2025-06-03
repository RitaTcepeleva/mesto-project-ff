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

Promise.all([getInitialProfileContent(), getInitialCards()])
    .then(([res1, res2]) => {
        // set initial profile content
        profileTitle.textContent = res1.name;
        profileDesc.textContent = res1.about;
        profileAvatar.setAttribute('style', `background-image: url(${res1.avatar})`);

        // show all of existed cards on the page
        res2.forEach(card => {
            cardsList.append(createCard(card, deleteCard, cardTemplate, handleCardOpen, handleCardLike, res1._id, removeCard, likeCard, unlikeCard));
        })
    })

// open/close popups
editButton.addEventListener('click', () => {
    savingStatus('edit-profile', false);
    openPopup(editPopup);
    clearValidation(forms['edit-profile'], {
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
    savingStatus('new-place', false);
    openPopup(addPopup);
    clearValidation(forms['new-place'], {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });

    forms['new-place'].reset();
});

profileAvatar.addEventListener('click', () => {
    savingStatus('edit-avatar', false);
    openPopup(avatarPopup);
    clearValidation(forms['edit-avatar'], {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });

    forms['edit-avatar'].reset();
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

    savingStatus('edit-profile', true);
    editProfileContent(nameInput.value, descInput.value)
        .then(data => {
            profileTitle.textContent = data.name;
            profileDesc.textContent = data.about;
        }).catch((err) => {
            console.log('error ', err);
        })

    closePopup(editPopup);
}

function handleAddFormSumbit(evt) {
    evt.preventDefault();

    savingStatus('new-place', true);
    addCard(cardNameInput.value, cardUrlInput.value)
        .then(card => {
            cardsList.insertBefore(createCard(card, deleteCard, cardTemplate, handleCardOpen, handleCardLike, '', removeCard, likeCard, unlikeCard), cardsList.firstChild);
        })
        .catch(err => {
            console.log('error ', err);
        })

    closePopup(addPopup);
}

function handleEditAvatarFormSubmit(evt) {
    evt.preventDefault();

    savingStatus('edit-avatar', true);
    editAvatar(avatarUrlInput.value)
        .then(data => {
            profileAvatar.style.backgroundImage = `url(${data.avatar})`;
        })
        .catch(err => {
            console.log('error ', err);
        })

    closePopup(avatarPopup);
}

function handleCardOpen(card) {
    const imagePopupElement = imagePopup.querySelector('.popup__image');
    imagePopupElement.src = card.link;
    imagePopupElement.alt = card.name;

    imagePopup.querySelector('.popup__caption').textContent = card.name;

    openPopup(imagePopup);
}

function savingStatus(formName, status) {
    const submitButton = forms[formName].querySelector('.popup__button');

    if(status) {
        submitButton.textContent = 'Сохранение...'
    } else {
        submitButton.textContent = 'Сохранить'
    }
}