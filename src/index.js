import './page/index.css';
import {validationConfig, initialCards} from "./components/data.js";
import {enableValidation} from "./components/validate.js";
import {
  closeCreateCardPopup,
  closeEditPopup,
  closeImagePopup,
  closeOnEscapeClick,
  closeOnOverlayClick,
  editCloseButton,
  editForm,
  editFormSubmitHandler,
  imageCloseButton,
  openCreateCardPopup,
  openEditPopup,
  popups,
  profileEditButton,
} from "./components/modal.js";
import {
  addInitialCards,
  createCardButton,
  createCardCloseButton,
  createCardForm,
  createFormSubmitHandler
} from "./components/card.js";

// Открытие модальных окон

profileEditButton.addEventListener('click', openEditPopup);

createCardButton.addEventListener('click', openCreateCardPopup);

// Закрытие модальных окон

editCloseButton.addEventListener('click', closeEditPopup);
createCardCloseButton.addEventListener('click', closeCreateCardPopup);
imageCloseButton.addEventListener('click', closeImagePopup);

for (let popup of popups) {
  popup.addEventListener('click', closeOnOverlayClick);
}

// Редактирование профиля и сохранение

editForm.addEventListener('submit', editFormSubmitHandler);

// Coздание карточки

createCardForm.addEventListener('submit', createFormSubmitHandler);

// Добавление карточек из массива

addInitialCards(initialCards);

// Валидация

enableValidation(validationConfig);
