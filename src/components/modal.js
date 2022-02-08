import {createCardForm, createCardPopup,} from "./card.js";
import {hideInputErrors} from "./validate.js";
import {validationConfig} from "./data.js";
import {editProfileElements, userPhotoForm, userPhotoPopup} from "./profile.js";
import {editProfile} from "./api.js";
import {disableSubmitButtonInForm, editSubmitButtonText} from "./utils.js";

export const popups = document.querySelectorAll('.popup');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const editPopup = document.querySelector('.popup_type_edit');
export const editForm = document.forms['edit-form'];
export const imagePopup = document.querySelector('.popup_type_image');
export const editPhotoButton = document.querySelector('.profile__edit-image');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupImage = imagePopup.querySelector('.image-popup__image');
const popupImageTitle = imagePopup.querySelector('.image-popup__image-title');

// Открытие модальных окон

export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEscapeClick);
}

function openPopupWithForm(popup, form, evt) {
  evt.preventDefault();
  openPopup(popup);
  hideInputErrors(form, validationConfig);
  form.reset();
  disableSubmitButtonInForm(form);
}

export function openEditPopup(evt) {
  openPopupWithForm(editPopup, editForm, evt);

  const name = editForm.elements['user-name'];
  const info = editForm.elements['about-me'];

  name.value = profileTitle.textContent;
  info.value = profileSubtitle.textContent;
}

export function openCreateCardPopup(evt) {
  openPopupWithForm(createCardPopup, createCardForm, evt);
}

export function openEditUserPhotoPopup(evt) {
  editSubmitButtonText(userPhotoForm, "Сохранить")
  openPopupWithForm(userPhotoPopup, userPhotoForm, evt);
}

// Закрытие модальных окон

export function addClosePopupOnClick() {
  for (let popup of popups) {
    popup.addEventListener('mousedown', function (evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup();
      }
      if (evt.target.classList.contains('popup__close')) {
        evt.preventDefault();
        closePopup();
      }
    });
  }
}

function closeOnEscapeClick(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

export function closePopup() {
  for (let popup of popups) {
    if (popup.classList.contains('popup_opened')) {
      popup.classList.remove('popup_opened');
    }
    document.removeEventListener('keydown', closeOnEscapeClick);
  }
}

// Редактирование профиля и сохранение

export function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = editForm.elements['user-name'];
  const infoInput = editForm.elements['about-me'];

  editSubmitButtonText(editForm, 'Сохранение...');
  disableSubmitButtonInForm(editForm);

  editProfile(nameInput.value, infoInput.value)
    .then(function (res) {
      editProfileElements(nameInput.value, infoInput.value);
      closePopup();
    })
    .catch(function (err) {
      console.log(`Ошибка. Запрос не выполнен. ${err}`);
    })
    .finally(function () {
      editSubmitButtonText(editForm, 'Сохранить');
    });

}

// Открытие модального окна с фото

export function showImagePopup(name, link) {
  openPopup(imagePopup);

  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
}
