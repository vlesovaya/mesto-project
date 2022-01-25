import '../page/index.css';
import {initialCards, validationConfig} from "./data.js";
import {enableValidation} from "./validate.js";
import {
  addClosePopupOnClick,
  editForm,
  editFormSubmitHandler,
  openCreateCardPopup,
  openEditPopup, openEditUserPhotoPopup,
  profileEditButton,
  editPhotoButton
} from "./modal.js";
import {addInitialCards, createCardButton, createCardForm, createFormSubmitHandler} from "./card.js";
import {userPhotoForm, editPhotoSubmitHandler} from "./profile.js";

// Открытие модальных окон

profileEditButton.addEventListener('click', openEditPopup);

createCardButton.addEventListener('click', openCreateCardPopup);

editPhotoButton.addEventListener('click', openEditUserPhotoPopup);

// Закрытие модальных окон

addClosePopupOnClick();

// Редактирование профиля и сохранение

editForm.addEventListener('submit', editFormSubmitHandler);

// Coздание карточки

createCardForm.addEventListener('submit', createFormSubmitHandler);

// Изменение фотографии пользователя

userPhotoForm.addEventListener('submit', editPhotoSubmitHandler);

// Добавление карточек из массива

addInitialCards(initialCards);

// Валидация

enableValidation(validationConfig);
