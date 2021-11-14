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

// Обработка закрытия модальных окон

function onCloseEditPopup() {
  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

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

editCloseButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup(editPopup);
  onCloseEditPopup();
});

createCardCloseButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup(createCardPopup);
  onCloseCreatePopup();
});

imageCloseButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup(imagePopup);
});

// Редактирование профиля и сохранение

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = infoInput.value;

  closePopup(editPopup);
}

editForm.addEventListener('submit', editFormSubmitHandler)

// Показ картинки

function showImagePopup(name, link) {
  openPopup(imagePopup);

  const popupImage = imagePopup.querySelector('.image-popup__image');
  const popupImageTitle = imagePopup.querySelector('.image-popup__image-title');

  popupImage.src = link;
  popupImageTitle.textContent = name;
}

// Coздание картинки

function createFormSubmitHandler(evt) {
  evt.preventDefault();
  createCard(titleInput.value, linkInput.value);

  createCardForm.reset();

  closePopup(createCardPopup);
}

createCardForm.addEventListener('submit', createFormSubmitHandler);

// Добавление карточки

function createCard(name, link) {
  const cardTemplate = document.querySelector('#gallery-template').content;
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.gallery__photo');

  cardImage.src = link;
  cardImage.alt = name;

  cardElement.querySelector('.gallery__title').textContent = name;

  cardElement.querySelector('.gallery__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__like_active');
  });

  const removeButton = cardElement.querySelector('.gallery__trash-button');

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
