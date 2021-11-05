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
  editPopup.classList.remove('popup_opened');
}

editCloseButton.addEventListener('click', closeEditPopup);

//add-popup opening and closing//

const postAddButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add');
const addCloseButton = addPopup.querySelector('.popup__close_add-button');

postAddButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  addPopup.classList.add('popup_opened');
});

addCloseButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  addPopup.classList.remove('popup_opened');
});

//edit profile and save//

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__item_type_user-name');
const infoInput = document.querySelector('.popup__item_type_about-me');

function formSubmitHandler(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const info = infoInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileSubtitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = name;
  profileSubtitle.textContent = info;

  closeEditPopup(evt);
}

formElement.addEventListener('submit', formSubmitHandler);


//gallery-like//

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
