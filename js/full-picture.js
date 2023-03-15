import { isEscapeKey } from './utils.js';
import { DESCRIPTIONS } from './data.js';
import { getRandomArrayElement } from './utils.js';
import { renderComments } from './comments.js';
import { pictureData } from './main.js';

export const interactWithBigPicture = () => {
  const pictureContainer = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureClose = document.querySelector('.big-picture__cancel');
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  const bigPictureLikes = document.querySelector('.likes-count');
  const bigPictureComments = document.querySelector('.comments-count');
  const bigPictureDescription = document.querySelector('.social__caption');
  const pageBody = document.querySelector('body');
  const pictureCommentList = document.querySelector('.social__comments');
  const commentsCounter = document.querySelector('.social__comment-count').childNodes;
  const loadMoreButton = document.querySelector('.comments-loader');
  const COMMENTS_PER_STEP = 5;
  let startIndex = 0;
  let finishIndex = COMMENTS_PER_STEP;

  const onBigPictureEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  };

  function loadMoreComments () {
    startIndex += COMMENTS_PER_STEP;
    finishIndex += COMMENTS_PER_STEP;
    if (finishIndex <= pictureData[0].comments.length) {
      renderComments(pictureData, startIndex, finishIndex);
    } else {
      finishIndex = pictureData[0].comments.length;
      renderComments(pictureData, startIndex, finishIndex);
      loadMoreButton.classList.add('hidden');
    }
    commentsCounter[0].textContent = `${finishIndex} из `;
  }

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
      pageBody.classList.add('modal-open');
      // comments
      if (finishIndex >= pictureData[0].comments.length) {
        finishIndex = pictureData[0].comments.length;
        renderComments(pictureData, startIndex, finishIndex);
        commentsCounter[0].textContent = `${finishIndex} из `;
        loadMoreButton.classList.add('hidden');
        // delete html comments
        if (finishIndex === 0) {
          while (pictureCommentList.firstChild) {
            pictureCommentList.removeChild(pictureCommentList.firstChild);
          }
        }
      } else {
        renderComments(pictureData, startIndex, finishIndex);
      }
      // Comments button click function
      loadMoreButton.addEventListener('click', loadMoreComments);
    }
    document.addEventListener('keydown', onBigPictureEscKeydown);
  }
  pictureContainer.addEventListener('click', openBigPicture);

  // close modal window
  function closeBigPicture() {
    bigPicture.classList.add('hidden');
    pageBody.classList.remove('modal-open');
    startIndex = 0;
    finishIndex = COMMENTS_PER_STEP;
    loadMoreButton.classList.remove('hidden');
    commentsCounter[0].textContent = `${finishIndex} из `;

    document.removeEventListener('keydown', onBigPictureEscKeydown);
  }
  bigPictureClose.addEventListener('click', closeBigPicture);
};
