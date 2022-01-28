import {closePopup, openPopup, showImagePopup} from "./modal.js";
import {addNewCard, deleteCard, getCards, toggleLikeOnCard} from "./api.js";
import {user} from "./data.js";

const cardsContainer = document.querySelector('.gallery__items');
export const createCardForm = document.forms['add-form'];
export const createCardPopup = document.querySelector('.popup_type_add');
export const createCardButton = document.querySelector('.profile__add-button');
const removeConfirmButton = document.querySelector('.remove-button');

// Coздание карточки

export function createFormSubmitHandler(evt) {
  evt.preventDefault();

  const titleInput = createCardForm.elements['image-title'];
  const linkInput = createCardForm.elements['image-link'];

  addNewCard(titleInput.value, linkInput.value)
    .then((res) => {
      console.log(res);
      addCard(res);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен');
    });

  createCardForm.reset();
  closePopup(createCardPopup);
}

// Добавление карточки

function createCard(name, link, likesCount, isLiked, showDeleteButton, cardId) {
  const cardTemplate = document.querySelector('#gallery-template').content;
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.gallery__photo');
  const cardTitle = cardElement.querySelector('.gallery__title');
  const likeButton = cardElement.querySelector('.gallery__like');
  const likeCounter = cardElement.querySelector('.gallery_like-counter');
  const removeButton = cardElement.querySelector('.gallery__trash-button');
  const removeCardPopup = document.querySelector('.popup_type_delete-card');

  cardImage.src = link;
  cardImage.alt = name;
  likeCounter.textContent = `${likesCount}`;
  cardTitle.textContent = name;

  if (isLiked) {
    likeButton.classList.add('gallery__like_active');
  }

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__like_active');
    const isLiked = evt.target.classList.contains('gallery__like_active');
    toggleLikeOnCard(isLiked, cardId)
      .then((res) => {
        console.log('Это лайк');
        console.log(res);
        const itemLikesCount = res.likes.length != null ? res.likes.length : 0;
        likeCounter.textContent = `${itemLikesCount}`;
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен');
      });
  });

  if (showDeleteButton) {
    removeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup(removeCardPopup);
      removeConfirmButton.addEventListener('click', function (removeConfirmButtonEvt) {
        removeConfirmButtonEvt.preventDefault();
        removeConfirmButtonEventHandler(evt, cardId);
      });
    });
  } else {
    removeButton.style.display = "none";
  }

  cardImage.addEventListener('click', function (evt) {
    evt.preventDefault();
    showImagePopup(name, link);
  });

  return cardElement;
}

function addCardOnPage(container, cardElement) {
  container.prepend(cardElement);
}

// Удаление карточки

function removeConfirmButtonEventHandler(evt, cardId) {
  const removeButton = evt.target;
  const card = removeButton.closest('.gallery__item')
  card.remove();

  deleteCard(cardId)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен');
    });

  closePopup();

  removeConfirmButton.removeEventListener('click', removeConfirmButtonEventHandler);
}

// Добавление карточек

function addCard(item) {
  const itemLikesCount = item.likes.length != null ? item.likes.length : 0;

  const usersWhoLiked = item.likes.map(function (like) {
    return like._id
  });

  const isLiked = usersWhoLiked.includes(user._id);

  const showDeleteButton = (item.owner._id === user._id);

  const cardElement = createCard(item.name, item.link, itemLikesCount, isLiked, showDeleteButton, item._id);

  addCardOnPage(cardsContainer, cardElement);
}

export function addInitialCards() {
  getCards()
    .then((res) => {
      console.log(res);
      res.reverse().forEach(function (item) {
        addCard(item);
      });
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен');
    });
}
