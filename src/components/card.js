import {closePopup, openPopup, showImagePopup} from "./modal.js";
import {addNewCard, deleteCard, toggleLikeOnCard} from "./api.js";
import {user} from "./data.js";
import {disableSubmitButtonInForm, editSubmitButtonText, enableSubmitButtonInForm} from "./utils.js";

const cardsContainer = document.querySelector('.gallery__items');
export const createCardForm = document.forms['add-form'];
export const deleteCardPopup = document.querySelector('.popup_type_delete-card');
export const createCardPopup = document.querySelector('.popup_type_add');
export const createCardButton = document.querySelector('.profile__add-button');
const removeConfirmButton = document.querySelector('.remove-button');
const titleInput = createCardForm.elements['image-title'];
const linkInput = createCardForm.elements['image-link'];

let activeRemoveCardHandler;

// Coздание карточки

export function handleCreateFormSubmit(evt) {
  evt.preventDefault();

  editSubmitButtonText(createCardForm, 'Загрузка...');
  disableSubmitButtonInForm(createCardForm);

  addNewCard(titleInput.value, linkInput.value)
    .then(function (res) {
      addCard(res);
      closePopup();
      createCardForm.reset();
    })
    .catch(function (err) {
      console.log(`Ошибка. Запрос не выполнен. ${err}`);
    })
    .finally(function () {
      editSubmitButtonText(createCardForm, 'Создать');
    });
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

  cardImage.src = link;
  cardImage.alt = name;
  likeCounter.textContent = `${likesCount}`;
  cardTitle.textContent = name;

  if (isLiked) {
    likeButton.classList.add('gallery__like_active');
  }

  likeButton.addEventListener('click', function (evt) {
    const isLiked = !evt.target.classList.contains('gallery__like_active');
    toggleLikeOnCard(isLiked, cardId)
      .then(function (res) {
        evt.target.classList.toggle('gallery__like_active');
        const itemLikesCount = res.likes.length != null ? res.likes.length : 0;
        likeCounter.textContent = `${itemLikesCount}`;
      })
      .catch(function (err) {
        console.log(`Ошибка. Запрос не выполнен. ${err}`);
      });
  });

  if (showDeleteButton) {
    removeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup(deleteCardPopup);
      editSubmitButtonText(deleteCardPopup, 'Да');
      enableSubmitButtonInForm(deleteCardPopup);

      function removeConfirmButtonHandler(removeConfirmButtonEvt) {
        removeConfirmButtonEvt.preventDefault();
        removeConfirmButtonEventHandler(evt, cardId);
      }

      if (activeRemoveCardHandler != null) {
        removeConfirmButton.removeEventListener('click', activeRemoveCardHandler);
      }
      activeRemoveCardHandler = removeConfirmButtonHandler;

      removeConfirmButton.addEventListener('click', removeConfirmButtonHandler);
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

  editSubmitButtonText(deleteCardPopup, 'Удаление...');
  disableSubmitButtonInForm(deleteCardPopup);

  deleteCard(cardId)
    .then(function (res) {
      const card = removeButton.closest('.gallery__item')
      card.remove();
      closePopup();
    })
    .catch(function (err) {
      console.log(`Ошибка. Запрос не выполнен. ${err}`);
    });
}

// Добавление карточек

export function addCard(item) {
  const itemLikesCount = item.likes.length != null ? item.likes.length : 0;

  const usersWhoLiked = item.likes.map(function (like) {
    return like._id
  });

  const isLiked = usersWhoLiked.includes(user._id);

  const showDeleteButton = (item.owner._id === user._id);

  const cardElement = createCard(item.name, item.link, itemLikesCount, isLiked, showDeleteButton, item._id);

  addCardOnPage(cardsContainer, cardElement);
}

