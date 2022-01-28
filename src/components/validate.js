function showInputError(inputElement, inputErrorClass, errorElement, errorClass, errorMessage) {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(inputElement, inputErrorClass, errorElement, errorClass) {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

export function hideInputErrors(formElement, {inputSelector, inputErrorClass, errorClass}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.filter(function (inputElement) {
    return inputElement.classList.contains(inputErrorClass);
  }).forEach(function (inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    hideInputError(inputElement, inputErrorClass, errorElement, errorClass);
  });
}

function isValid(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputErrorClass, errorElement, errorClass, inputElement.validationMessage);
  } else {
    hideInputError(inputElement, inputErrorClass, errorElement, errorClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

export function disableSubmitButton(buttonElement) {
  buttonElement.setAttribute("disabled", "disabled");
  buttonElement.disabled = true;
}

export function enableSubmitButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

function toggleButtonState(formElement, inputList, submitButtonSelector) {
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement);
  } else {
    enableSubmitButton(buttonElement);
  }
}

function setEventListeners(formElement, {
  inputSelector,
  inputErrorClass,
  errorClass,
  submitButtonSelector,
  inactiveButtonClass
}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
    });
  });
}

export function enableValidation({formSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
}
