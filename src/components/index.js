import '../page/index.css';
import {validationConfig} from "./data.js";
import {enableValidation} from "./validate.js";
import {
  addClosePopupOnClick,
  editForm,
  editPhotoButton,
  handleEditFormSubmit,
  openCreateCardPopup,
  openEditPopup,
  openEditUserPhotoPopup,
  profileEditButton
} from "./modal.js";
import {createCardButton, createCardForm, handleCreateFormSubmit} from "./card.js";
import {editPhotoSubmitHandler, getAppInfo, userPhotoForm} from "./profile.js";


// Открытие модальных окон

profileEditButton.addEventListener('click', openEditPopup);

createCardButton.addEventListener('click', openCreateCardPopup);

editPhotoButton.addEventListener('click', openEditUserPhotoPopup);

// Закрытие модальных окон

addClosePopupOnClick();

// Редактирование профиля и сохранение

editForm.addEventListener('submit', handleEditFormSubmit);

// Coздание карточки

createCardForm.addEventListener('submit', handleCreateFormSubmit);

// Изменение фотографии пользователя

userPhotoForm.addEventListener('submit', editPhotoSubmitHandler);

// Валидация

enableValidation(validationConfig);

// Загрузка профиля и карточек

getAppInfo();
