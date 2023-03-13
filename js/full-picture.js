import { isEscapeKey } from './utils.js';
import { DESCRIPTIONS } from './data.js';
import { getRandomArrayElement } from './utils.js';
import { renderComments } from './comments.js';
import { userData } from './main.js';

export const interactWithBigPicture = () => {
  const pictureContainer = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureClose = document.querySelector('.big-picture__cancel');
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  const bigPictureLikes = document.querySelector('.likes-count');
  const bigPictureComments = document.querySelector('.comments-count');
  const bigPictureDescription = document.querySelector('.social__caption');
  const body = document.querySelector('body');

  const onBigPictureEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  };

  // open modal window and load data
  function openBigPicture(evt) {
    if (evt.target.closest('.picture')) {
      bigPicture.classList.remove('hidden');

      // URL
      bigPictureImage.src = evt.target.closest('.picture').querySelector('img').src;
      // Likes
      bigPictureLikes.textContent = evt.target.parentElement.querySelector('.picture__likes').textContent;
      // Comments
      bigPictureComments.textContent = evt.target.parentElement.querySelector('.picture__comments').textContent;
      // Description
      bigPictureDescription.textContent = getRandomArrayElement(DESCRIPTIONS);
      // Hide scroll on body
      body.classList.add('modal-open');
      // comments
      renderComments(userData);
    }

    document.addEventListener('keydown', onBigPictureEscKeydown);
  }
  pictureContainer.addEventListener('click', openBigPicture);

  // close modal window
  function closeBigPicture() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');


    document.removeEventListener('keydown', onBigPictureEscKeydown);
  }
  bigPictureClose.addEventListener('click', closeBigPicture);
};
