const profileEditButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editCloseButton = editPopup.querySelector('.popup__close_edit-button');

const cardsContainer = document.querySelector('.gallery__items');
const createCardButton = document.querySelector('.profile__add-button');
const createCardPopup = document.querySelector('.popup_type_add');
const createCardCloseButton = createCardPopup.querySelector('.popup__close_add-button');

const cardImage = document.querySelector('.gallery__photo');
const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = document.querySelector('.popup__close_type_image');

//Открытие модальных окон
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

profileEditButton.addEventListener('click', function () {
  openPopup(editPopup);
});

createCardButton.addEventListener('click', function () {
  openPopup(createCardPopup);
});

//Закрытие модальных окон

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

editCloseButton.addEventListener('click', function (evt) {
  closePopup(editPopup);
  closeEditPopup(evt);
});

createCardCloseButton.addEventListener('click', function (evt) {
  closePopup(createCardPopup);
  closeCreatePopup(evt);
});


function closeEditPopup(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector('.popup__item_type_user-name');
  const infoInput = document.querySelector('.popup__item_type_about-me');

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

  nameInput.value = profileTitle.textContent;
  infoInput.value = profileSubtitle.textContent;
}

function closeCreatePopup(evt) {
  evt.preventDefault();

  const titleInput = document.querySelector('.popup__item_type_image-title');
  const linkInput = document.querySelector('.popup__item_type_image-link');

  titleInput.value = '';
  linkInput.value = '';
}

createCardCloseButton.addEventListener('click', closeCreatePopup);

//edit profile and save//

const editFormElement = document.querySelector('.popup__form_type_edit');

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector('.popup__item_type_user-name');
  const infoInput = document.querySelector('.popup__item_type_about-me');

  const name = nameInput.value;
  const info = infoInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = name;
  profileSubtitle.textContent = info;

  closeEditPopup(evt);
}

editFormElement.addEventListener('submit', editFormSubmitHandler)

//gallery-like//

function addLikeButtonsProcessing() {
  let likeButtons = document.querySelectorAll('.gallery__like');

  for (let i = 0; i < likeButtons.length; i += 1) {
    let likeButton = likeButtons[i];
    likeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (likeButton.classList.contains('gallery__like_active')) {
        likeButton.classList.remove('gallery__like_active');
      } else {
        likeButton.classList.add('gallery__like_active');
      }
    });
  }
}

addLikeButtonsProcessing();

//add-card//

function addCard(name, link) {
  const cardTemplate = document.querySelector('#gallery-template').content;
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);

  cardElement.querySelector('.gallery__photo').src = link;
  cardElement.querySelector('.gallery__photo').alt = name;
  cardElement.querySelector('.gallery__title').textContent = name;

  cardElement.querySelector('.gallery__like').addEventListener('click', function (evt) {
    if (evt.target.classList.contains('gallery__like_active')) {
      evt.target.classList.remove('gallery__like_active');
    } else {
      evt.target.classList.toggle('gallery__like_active');
    }
  });

  const removeButton = cardElement.querySelector('.gallery__trash-button');

  removeButton.addEventListener('click', function () {
    const card = removeButton.closest('.gallery__item')
    card.remove();
  });

  cardsContainer.prepend(cardElement);
}

const createFormElement = document.querySelector('.popup__form_type_create');

function createFormSubmitHandler(evt) {
  evt.preventDefault();
  const title = document.querySelector('.popup__item_type_image-title');
  const link = document.querySelector('.popup__item_type_image-link');
  addCard(title.value, link.value);

  title.value = '';
  link.value = '';

  closeCreatePopup(evt);
}
createFormElement.addEventListener('submit', createFormSubmitHandler);

// add cards from array

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
  addCard(item.name, item.link);
});
