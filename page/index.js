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
})
