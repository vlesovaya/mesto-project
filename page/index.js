let profileEditButton = document.querySelector('.profile__edit-button');
let renderPopup = document.querySelector('.popup');
let popupCloseButton = renderPopup.querySelector('.popup__close');

profileEditButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  renderPopup.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  renderPopup.classList.remove('popup_opened');
});

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
