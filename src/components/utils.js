import {validationConfig} from "./data.js";
import {disableSubmitButton, enableSubmitButton} from "./validate.js";

export function editSubmitButtonText(form, text) {
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  buttonElement.textContent = text;
}

export function disableSubmitButtonInForm(form) {
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  disableSubmitButton(buttonElement);
}

export function enableSubmitButtonInForm(form) {
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  enableSubmitButton(buttonElement);
}
