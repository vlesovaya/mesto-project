//edit-popup opening and closing///

const profileEditButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const editCloseButton = editPopup.querySelector('.popup__close_edit-button');

function openEditPopup(evt) {
  evt.preventDefault();
  editPopup.classList.add('popup_opened');
}

profileEditButton.addEventListener('click', openEditPopup);

function closeEditPopup(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector('.popup__item_type_user-name');
  const infoInput = document.querySelector('.popup__item_type_about-me');

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

  nameInput.value = profileTitle.textContent;
  infoInput.value = profileSubtitle.textContent;

  editPopup.classList.remove('popup_opened');
}

editCloseButton.addEventListener('click', closeEditPopup);

//add-popup opening and closing//

const createCardButton = document.querySelector('.profile__add-button');
const createCardPopup = document.querySelector('.popup_type_add');
const createCardCloseButton = createCardPopup.querySelector('.popup__close_add-button');

function closeCreatePopup(evt) {
  evt.preventDefault();
  createCardPopup.classList.remove('popup_opened');
}

createCardButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  createCardPopup.classList.add('popup_opened');
});

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

  const cards = document.querySelector('.gallery__items');

  const listItem = document.createElement('li');
  listItem.classList.add('gallery__item');

  const imageElement = document.createElement('img');
  imageElement.classList.add('gallery__photo');
  imageElement.src = link;

  const divElement = document.createElement('div');
  divElement.classList.add('gallery__subscription');

  const textElement = document.createElement('h2');
  textElement.classList.add('gallery__title');
  textElement.textContent = name;

  const likeButtonElement = document.createElement('button');
  likeButtonElement.classList.add('gallery__like');

  const trashButtonElement = document.createElement('button');
  trashButtonElement.classList.add('gallery__trash-button');

  divElement.append(textElement, likeButtonElement);
  listItem.append(imageElement, divElement, trashButtonElement);
  cards.prepend(listItem);
}

const createFormElement = document.querySelector('.popup__form_type_create');

function createFormSubmitHandler(evt) {
  evt.preventDefault();
  const title = document.querySelector('.popup__item_type_image-title');
  const link = document.querySelector('.popup__item_type_image-link');
  addCard(title.value, link.value);

  title.value = '';
  link.value = '';

  addLikeButtonsProcessing();

  closeCreatePopup(evt);
}

createFormElement.addEventListener('submit', createFormSubmitHandler);

