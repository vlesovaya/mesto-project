import {createCardForm, createCardPopup,} from "./card.js";
import {disableSubmitButton, hideInputErrors} from "./validate.js";
import {validationConfig} from "./data.js";
import {userPhotoPopup, userPhotoForm} from "./profile.js";

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
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  disableSubmitButton(buttonElement);
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
  openPopupWithForm(userPhotoPopup, userPhotoForm, evt);
}

// Закрытие модальных окон

export function addClosePopupOnClick() {
  for (let popup of popups) {
    popup.addEventListener('mousedown', function (evt) {
      if (evt.target.classList.contains('popup_opened')) {
        evt.preventDefault();
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
    const popup = document.querySelector('.popup_opened');
    if (popup !== null) {
      closePopup();
    }
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

export function editFormSubmitHandler(evt) {
  evt.preventDefault();

  const name = editForm.elements['user-name'];
  const info = editForm.elements['about-me'];

  profileTitle.textContent = name.value;
  profileSubtitle.textContent = info.value;

  closePopup();
}

// Открытие модального окна с фото

export function showImagePopup(name, link) {
  openPopup(imagePopup);

  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
}
