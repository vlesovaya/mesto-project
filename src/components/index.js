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
import {userPhotoForm, editPhotoSubmitHandler, editProfileElements, editProfilePhotoElement} from "./profile.js";

import {getUserInfo, getCards, editProfile} from "./api.js";


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

addInitialCards();

// Валидация

enableValidation(validationConfig);


getUserInfo()
  .then((res) => {
    console.log(res);
    editProfileElements(res.name, res.about);
    editProfilePhotoElement(res.avatar);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен');
  });
