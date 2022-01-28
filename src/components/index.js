import '../page/index.css';
import {user, validationConfig} from "./data.js";
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

import {getUserInfo} from "./api.js";


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

// Валидация

enableValidation(validationConfig);


getUserInfo()
  .then((res) => {
    console.log(res);
    editProfileElements(res.name, res.about);
    editProfilePhotoElement(res.avatar);

    user._id = res._id;
    user.name = res.name;
    user.about = res.about;
    user.avatar = res.avatar;

    addInitialCards();
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен');
  });
