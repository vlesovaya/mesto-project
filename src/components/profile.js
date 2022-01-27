import {closePopup} from "./modal.js";
import {editProfilePhoto} from "./api";

export const userPhotoPopup = document.querySelector('.popup_type_user-photo');
export const userPhotoForm = document.forms['user-photo-form'];
const userPhoto = document.querySelector('.profile__image');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Редактирование фото профиля и добавление фото

export function editPhotoSubmitHandler(evt) {
  evt.preventDefault();

  const linkInput = userPhotoForm.elements['photo-link'];
  editProfilePhotoElement(linkInput.value)
  // userPhoto.src = link.value;

  editProfilePhoto(linkInput.value)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен');
    });

  closePopup();
}

export function editProfilePhotoElement(link) {
  userPhoto.src = link;
}

export function editProfileElements(name, info) {
  profileTitle.textContent = name;
  profileSubtitle.textContent = info;
}
