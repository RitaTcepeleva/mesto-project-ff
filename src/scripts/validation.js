export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((formElement) => { setEventListeners(formElement, validationConfig) });
}

export function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    })

    // toggleButtonState(inputList, submitButton, validationConfig.inactiveButtonClass); // not in all cases works properly (open popup, input correct data, not save and close popup, open popup again => button should be inactive, but it's active)

    disableButton(submitButton, validationConfig.inactiveButtonClass);
}

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  inputElement.setCustomValidity('');
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}; 

const isValid = (formElement, inputElement, validationConfig) => {
  if(inputElement.validity.patternMismatch) 
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  else 
    inputElement.setCustomValidity('');

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig.inputErrorClass, validationConfig.errorClass);
  } else {
    hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  }
};

function setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig);

            toggleButtonState(inputList, submitButton, validationConfig.inactiveButtonClass);
        });
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) disableButton(buttonElement, inactiveButtonClass);
  else enableButton(buttonElement, inactiveButtonClass);
}

function disableButton(submitButton, inactiveButtonClass) {
  submitButton.disabled = true;
  submitButton.classList.add(inactiveButtonClass);
}

function enableButton(submitButton, inactiveButtonClass) {
  submitButton.disabled = false;
  submitButton.classList.remove(inactiveButtonClass);
}
