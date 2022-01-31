export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '74e98393-69db-4e2a-9095-4b722370b5b8',
    'Content-Type': 'application/json'
  },
};

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const user = {
  name: "Loading...",
  about: "Loading...",
  avatar: "",
  _id: ""
}
