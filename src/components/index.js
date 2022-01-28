import '../page/index.css';
import {validationConfig} from "./data.js";
import {enableValidation} from "./validate.js";
import {
  addClosePopupOnClick,
  editForm,
  editFormSubmitHandler,
  editPhotoButton,
  openCreateCardPopup,
  openEditPopup,
  openEditUserPhotoPopup,
  profileEditButton
} from "./modal.js";
import {createCardButton, createCardForm, createFormSubmitHandler} from "./card.js";
import {editPhotoSubmitHandler, getProfile, userPhotoForm} from "./profile.js";


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

// Валидация

enableValidation(validationConfig);

// Загрузка профиля

getProfile();
