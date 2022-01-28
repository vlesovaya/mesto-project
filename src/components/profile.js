import {closePopup} from "./modal.js";
import {editProfilePhoto, getUserInfo} from "./api.js";
import {user} from "./data.js";
import {getUserFeed} from "./card.js";
import {disableSubmitButtonInForm, editSubmitButtonText} from "./utils.js";

export const userPhotoPopup = document.querySelector('.popup_type_user-photo');
export const userPhotoForm = document.forms['user-photo-form'];
const userPhoto = document.querySelector('.profile__image');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Редактирование фото профиля и добавление фото

export function editPhotoSubmitHandler(evt) {
  evt.preventDefault();

  const linkInput = userPhotoForm.elements['photo-link'];

  disableSubmitButtonInForm(userPhotoForm);
  editSubmitButtonText(userPhotoForm, "Загрузка...")

  editProfilePhoto(linkInput.value)
    .then(function (res) {
      editProfilePhotoElement(linkInput.value)
      closePopup();
    })
    .catch(function (err) {
      console.log(`Ошибка. Запрос не выполнен. ${err}`);
      closePopup();
    });
}

export function editProfilePhotoElement(link) {
  userPhoto.src = link;
}

export function editProfileElements(name, info) {
  profileTitle.textContent = name;
  profileSubtitle.textContent = info;
}

export function getProfile() {
  getUserInfo()
    .then(function (res) {
      editProfileElements(res.name, res.about);
      editProfilePhotoElement(res.avatar);

      user._id = res._id;
      user.name = res.name;
      user.about = res.about;
      user.avatar = res.avatar;

      getUserFeed();
    })
    .catch(function (err) {
      console.log(`Ошибка. Запрос не выполнен. ${err}`);
    });
}
