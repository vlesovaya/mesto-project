import {closePopup, openPopup, showImagePopup} from "./modal.js";

const cardsContainer = document.querySelector('.gallery__items');
export const createCardForm = document.forms['add-form'];
export const createCardPopup = document.querySelector('.popup_type_add');
export const createCardButton = document.querySelector('.profile__add-button');
const removeConfirmButton = document.querySelector('.remove-button');

// Coздание карточки

export function createFormSubmitHandler(evt) {
  evt.preventDefault();

  const title = createCardForm.elements['image-title'];
  const link = createCardForm.elements['image-link'];

  const cardElement = createCard(title.value, link.value);
  addCard(cardsContainer, cardElement);

  createCardForm.reset();
  closePopup(createCardPopup);
}

// Добавление карточки

function createCard(name, link) {
  const cardTemplate = document.querySelector('#gallery-template').content;
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.gallery__photo');
  const cardTitle = cardElement.querySelector('.gallery__title');
  const likeButton = cardElement.querySelector('.gallery__like');
  const removeButton = cardElement.querySelector('.gallery__trash-button');
  const removeCardPopup = document.querySelector('.popup_type_delete-card');

  cardImage.src = link;
  cardImage.alt = name;

  cardTitle.textContent = name;

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__like_active');
  });

  removeButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup(removeCardPopup);
    removeConfirmButton.addEventListener('click', function (removeConfirmButtonEvt) {
      removeConfirmButtonEvt.preventDefault();
      removeConfirmButtonEventHandler(evt);
    });
  });

  cardImage.addEventListener('click', function (evt) {
    evt.preventDefault();
    showImagePopup(name, link);
  });

  return cardElement;
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

// Удаление карточки

function removeConfirmButtonEventHandler(evt) {
  const removeButton = evt.target;
  const card = removeButton.closest('.gallery__item')
  card.remove();

  closePopup();

  removeConfirmButton.removeEventListener('click', removeConfirmButtonEventHandler);
}

// Добавление карточек из массива

export function addInitialCards(initialCards) {
  initialCards.forEach(function (item) {
    const cardElement = createCard(item.name, item.link);
    addCard(cardsContainer, cardElement);
  });
}
