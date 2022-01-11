const popups = document.querySelectorAll('.popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editCloseButton = editPopup.querySelector('.popup__close_edit-button');
const editForm = document.querySelector('.popup__form_type_edit');

const cardsContainer = document.querySelector('.gallery__items');
const createCardButton = document.querySelector('.profile__add-button');
const createCardPopup = document.querySelector('.popup_type_add');
const createCardCloseButton = createCardPopup.querySelector('.popup__close_add-button');
const createCardForm = document.querySelector('.popup__form_type_create');

const titleInput = document.querySelector('.popup__item_type_image-title');
const linkInput = document.querySelector('.popup__item_type_image-link');
const nameInput = document.querySelector('.popup__item_type_user-name');
const infoInput = document.querySelector('.popup__item_type_about-me');

const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = document.querySelector('.popup__close_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Обработка закрытия модальных окон

function onCloseEditPopup() {
  nameInput.value = profileTitle.textContent;
  infoInput.value = profileSubtitle.textContent;
}

function onCloseCreatePopup() {
  createCardForm.reset();
}

// Открытие модальных окон

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

profileEditButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup(editPopup);
});

createCardButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup(createCardPopup);
});

// Закрытие модальных окон

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function closeEditPopup(evt) {
  evt.preventDefault();
  closePopup(editPopup);
  onCloseEditPopup();
}

function closeCreateCardPopup(evt) {
  evt.preventDefault();
  closePopup(createCardPopup);
  onCloseCreatePopup();
}

function closeImagePopup(evt) {
  evt.preventDefault();
  closePopup(imagePopup);
}

editCloseButton.addEventListener('click', closeEditPopup);
createCardCloseButton.addEventListener('click', closeCreateCardPopup);
imageCloseButton.addEventListener('click', closeImagePopup);

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup !== null) {
      closePopup(popup);
    }
  }
});

for (let popup of popups) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
}

// Редактирование профиля и сохранение

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = infoInput.value;

  closePopup(editPopup);
}

editForm.addEventListener('submit', editFormSubmitHandler)

// Открытие модального окна с фото

function showImagePopup(name, link) {
  openPopup(imagePopup);

  const popupImage = imagePopup.querySelector('.image-popup__image');
  const popupImageTitle = imagePopup.querySelector('.image-popup__image-title');

  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
}

// Coздание карточки

function createFormSubmitHandler(evt) {
  evt.preventDefault();

  const cardElement = createCard(titleInput.value, linkInput.value);
  addCard(cardsContainer, cardElement);

  createCardForm.reset();

  closePopup(createCardPopup);
}

createCardForm.addEventListener('submit', createFormSubmitHandler);

// Добавление карточки

function createCard(name, link) {
  const cardTemplate = document.querySelector('#gallery-template').content;
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.gallery__photo');
  const cardTitle = cardElement.querySelector('.gallery__title');
  const likeButton = cardElement.querySelector('.gallery__like');
  const removeButton = cardElement.querySelector('.gallery__trash-button');

  cardImage.src = link;
  cardImage.alt = name;

  cardTitle.textContent = name;

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__like_active');
  });

  removeButton.addEventListener('click', function () {
    const card = removeButton.closest('.gallery__item')
    card.remove();
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

// Добавление карточек из массива

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (item) {
  const cardElement = createCard(item.name, item.link);
  addCard(cardsContainer, cardElement);
});
