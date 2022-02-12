import {validationConfig} from "../components/data";

class FormValidator {
  constructor(validationConfig) {
    this.validationConfig = validationConfig;
  }

  hideInputErrors(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this.validationConfig.inputSelector));

    inputList.filter(function (inputElement) {
      return inputElement.classList.contains(this.validationConfig.inputErrorClass);
    }).forEach(function (inputElement) {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    });
  }

  enableValidation({formSelector, ...rest}) {
    const formList = Array.from(document.querySelectorAll(this.validationConfig.formSelector));
    formList.forEach(function (formElement) {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(formElement, rest);
    });
  }

  disableSubmitButton(buttonElement) {
    buttonElement.setAttribute("disabled", "disabled");
    buttonElement.disabled = true;
  }

  enableSubmitButton(buttonElement) {
    buttonElement.classList.remove(this.validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  _isValid(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(formElement, inputList) {
    const buttonElement = formElement.querySelector(this.validationConfig.submitButtonSelector);

    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton(buttonElement);
    } else {
      this.enableSubmitButton(buttonElement);
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this.validationConfig.inputSelector));
    this._toggleButtonState(formElement, inputList);

    inputList.forEach(function (inputElement) {
      inputElement.addEventListener('input', function () {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(formElement, inputList);
      });
    });
  }

  _showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this.validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.validationConfig.errorClass);
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this.validationConfig.inputErrorClass);
    errorElement.classList.remove(this.validationConfig.errorClass);
    errorElement.textContent = '';
  }
}
