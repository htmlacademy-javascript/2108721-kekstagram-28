import { isEscapeKey } from './utils.js';
import { DESCRIPTIONS } from './data.js';
import { getRandomArrayElement } from './utils.js';
import { createComments } from './comments.js';
import { commentsArray } from './data.js';

export const interactWithBigPicture = () => {
  const pictureElement = document.querySelector('.pictures');
  const bigPictureShow = document.querySelector('.big-picture');
  const bigPictureClose = document.querySelector('.big-picture__cancel');
  const bigPictureUrl = bigPictureShow.querySelector('.big-picture__img').children;
  const bigPictureLikes = document.querySelector('.likes-count');
  const bigPictureComments = document.querySelector('.comments-count');
  const bigPictureDescription = document.querySelector('.social__caption');
  const bigPictureCommentsCount = document.querySelector('.social__comment-count');
  const bigPictureCommentsLoader = document.querySelector('.comments-loader');
  const body = document.querySelector('body');

  const onBigPictureEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  };

  // open modal window and load data
  function openBigPicture(evt) {
    bigPictureShow.classList.remove('hidden');
    // URL
    bigPictureUrl[0].src = evt.target.src;
    // Likes
    bigPictureLikes.textContent = evt.target.parentElement.querySelector('.picture__likes').textContent;
    // Comments
    bigPictureComments.textContent = evt.target.parentElement.querySelector('.picture__comments').textContent;
    // Description
    bigPictureDescription.textContent = getRandomArrayElement(DESCRIPTIONS);
    // Hide 2 comments classes
    bigPictureCommentsCount.classList.add('hidden');
    bigPictureCommentsLoader.classList.add('hidden');
    // Hide scroll on body
    body.classList.add('modal-open');
    // comments
    createComments(commentsArray);

    document.addEventListener('keydown', onBigPictureEscKeydown);
  }
  pictureElement.addEventListener('click', openBigPicture);

  // close modal window
  function closeBigPicture() {
    bigPictureShow.classList.add('hidden');
    body.classList.remove('modal-open');

    document.removeEventListener('keydown', onBigPictureEscKeydown);
  }
  bigPictureClose.addEventListener('click', closeBigPicture);
};
