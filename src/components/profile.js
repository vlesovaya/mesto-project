import {closePopup} from "./modal.js";
import {editProfilePhoto, getCards, getUserInfo} from "./api.js";
import {user} from "./data.js";
import {addCard} from "./card.js";
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

  editSubmitButtonText(userPhotoForm, "Загрузка...")

  editProfilePhoto(linkInput.value)
    .then(function (res) {
      editProfilePhotoElement(linkInput.value);
      disableSubmitButtonInForm(userPhotoForm);
      closePopup();
    })
    .catch(function (err) {
      console.log(`Ошибка. Запрос не выполнен. ${err}`);
    })
    .finally(function () {
      editSubmitButtonText(userPhotoForm, "Сохранить")
    });
}

export function editProfilePhotoElement(link) {
  userPhoto.src = link;
}

export function editProfileElements(name, info) {
  profileTitle.textContent = name;
  profileSubtitle.textContent = info;
}

export function getAppInfo() {
  Promise.all([getUserInfo(), getCards()])
    .then(function ([userData, cards]) {
      editProfileElements(userData.name, userData.about);
      editProfilePhotoElement(userData.avatar);

      user._id = userData._id;
      user.name = userData.name;
      user.about = userData.about;
      user.avatar = userData.avatar;

      cards.reverse().forEach(function (item) {
        addCard(item);
      });
    })
    .catch(function (err) {
      console.log(`Ошибка. Запрос не выполнен. ${err}`);
    });
}
