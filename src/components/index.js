import '../page/index.css';
import {initialCards, validationConfig} from "./data.js";
import {enableValidation} from "./validate.js";
import {
  addClosePopupOnClick,
  editForm,
  editFormSubmitHandler,
  openCreateCardPopup,
  openEditPopup,
  profileEditButton,
} from "./modal.js";
import {addInitialCards, createCardButton, createCardForm, createFormSubmitHandler} from "./card.js";

// Открытие модальных окон

profileEditButton.addEventListener('click', openEditPopup);

createCardButton.addEventListener('click', openCreateCardPopup);

// Закрытие модальных окон

addClosePopupOnClick();

// Редактирование профиля и сохранение

editForm.addEventListener('submit', editFormSubmitHandler);

// Coздание карточки

createCardForm.addEventListener('submit', createFormSubmitHandler);

// Добавление карточек из массива

addInitialCards(initialCards);

// Валидация

enableValidation(validationConfig);
