//edit-popup///

let profileEditButton = document.querySelector('.profile__edit-button');
let editPopup = document.querySelector('.popup_type_edit');
let editCloseButton = editPopup.querySelector('.popup__close_edit-button');

profileEditButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  editPopup.classList.add('popup_opened');
});

editCloseButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  editPopup.classList.remove('popup_opened');
});

//add-popup//

let postAddButton = document.querySelector('.profile__add-button');
let addPopup = document.querySelector('.popup_type_add');
let addCloseButton = addPopup.querySelector('.popup__close_add-button');

postAddButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  addPopup.classList.add('popup_opened');
});

addCloseButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  addPopup.classList.remove('popup_opened');
});

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
