import {createCardForm, createCardPopup,} from "./card.js";
import {disableSubmitButton, hideInputErrors} from "./validate.js";
import {validationConfig} from "./data.js";

export const popups = document.querySelectorAll('.popup');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const editPopup = document.querySelector('.popup_type_edit');
export const editForm = document.forms['edit-form'];
export const editCloseButton = editPopup.querySelector('.popup__close_edit-button');
export const imagePopup = document.querySelector('.popup_type_image');
export const imageCloseButton = document.querySelector('.popup__close_type_image');

// Обработка закрытия модальных окон

function onCloseEditPopup() {
  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
  const name = editForm.elements['user-name'];
  const info = editForm.elements['about-me'];

  name.value = profileTitle.textContent;
  info.value = profileSubtitle.textContent;
  hideInputErrors(editForm, validationConfig);
}

export function onCloseCreatePopup() {
  createCardForm.reset();
  hideInputErrors(createCardForm, validationConfig);
}

// Открытие модальных окон

export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

export function openEditPopup(evt) {
  evt.preventDefault();
  openPopup(editPopup);
}

export function openCreateCardPopup(evt) {
  evt.preventDefault();
  openPopup(createCardPopup);
  disableSubmitButton(createCardForm);
}

// Закрытие модальных окон

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

export function closeEditPopup(evt) {
  evt.preventDefault();
  closePopup(editPopup);
  onCloseEditPopup();
}

export function closeCreateCardPopup(evt) {
  evt.preventDefault();
  closePopup(createCardPopup);
  onCloseCreatePopup();
}

export function closeImagePopup(evt) {
  evt.preventDefault();
  closePopup(imagePopup);
}

export function closeOnEscapeClick(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup !== null) {
      closePopup(popup);
      onCloseEditPopup();
      onCloseCreatePopup();
    }
  }
}

export function closeOnOverlayClick(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popup);
    onCloseEditPopup();
    onCloseCreatePopup();
  }
}

// Редактирование профиля и сохранение

export function editFormSubmitHandler(evt) {
  evt.preventDefault();

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');
  const name = editForm.elements['user-name'];
  const info = editForm.elements['about-me'];

  profileTitle.textContent = name.value;
  profileSubtitle.textContent = info.value;

  closePopup(editPopup);
}

// Открытие модального окна с фото

export function showImagePopup(name, link) {
  openPopup(imagePopup);

  const popupImage = imagePopup.querySelector('.image-popup__image');
  const popupImageTitle = imagePopup.querySelector('.image-popup__image-title');

  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
}
