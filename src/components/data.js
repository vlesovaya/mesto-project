import {editProfilePhotoElement} from "./profile";

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export let user = {
  name: "Loading...",
  about: "Loading...",
  avatar: "",
  _id: ""
}
