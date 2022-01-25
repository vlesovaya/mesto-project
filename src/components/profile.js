import {closePopup} from "./modal.js";

export const userPhotoPopup = document.querySelector('.popup_type_user-photo');
export const userPhotoForm = document.forms['user-photo-form'];
const userPhoto = document.querySelector('.profile__image');

// Редактирование фото профиля и добавление фото

export function editPhotoSubmitHandler(evt) {
  evt.preventDefault();

  const link = userPhotoForm.elements['photo-link'];
  userPhoto.src = link.value;

  closePopup();
}
