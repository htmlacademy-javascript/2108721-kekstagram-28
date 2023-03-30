import { isEscapeKey } from './utils.js';
import { renderComments } from './comments.js';

const loadBigPicture = (pictures) => {
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

  let targetPoint;
  let targetId;
  let startIndex = 0;
  let finishIndex = COMMENTS_PER_STEP;

  const openBigPicture = (evt) => {
    targetPoint = evt.target.closest('.picture');
    if (!targetPoint) {
      return;
    } else {
      targetId = Number(targetPoint.dataset.id);
      bigPicture.classList.remove('hidden');
      bigPictureImage.src = targetPoint.querySelector('img').src;
      bigPictureLikes.textContent = targetPoint.querySelector('.picture__likes').textContent;
      bigPictureComments.textContent = targetPoint.querySelector('.picture__comments').textContent;
      bigPictureDescription.textContent = pictures[targetId].description;
      pageBody.classList.add('modal-open');

      if (finishIndex >= pictures[targetId].comments.length) {
        finishIndex = pictures[targetId].comments.length;
        renderComments(pictures[targetId], startIndex, finishIndex);
        commentsCounter[0].textContent = `${finishIndex} из `;
        loadMoreButton.classList.add('hidden');

        if (finishIndex === 0) {
          while (pictureCommentList.firstChild) {
            pictureCommentList.removeChild(pictureCommentList.firstChild);
          }
        }
      } else {
        renderComments(pictures[targetId], startIndex, finishIndex);
      }
    }
    document.addEventListener('keydown', onBigPictureEscKeydown);
  };

  const closeBigPicture = () => {
    bigPicture.classList.add('hidden');
    pageBody.classList.remove('modal-open');
    startIndex = 0;
    finishIndex = COMMENTS_PER_STEP;
    loadMoreButton.classList.remove('hidden');
    commentsCounter[0].textContent = `${finishIndex} из `;

    document.removeEventListener('keydown', onBigPictureEscKeydown);
  };

  function onBigPictureEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      closeBigPicture();
    }
  }

  const loadMoreComments = () => {
    startIndex += COMMENTS_PER_STEP;
    finishIndex += COMMENTS_PER_STEP;
    if (finishIndex <= pictures[targetId].comments.length) {
      renderComments(pictures[targetId], startIndex, finishIndex);
    } else {
      finishIndex = pictures[targetId].comments.length;
      renderComments(pictures[targetId], startIndex, finishIndex);
      loadMoreButton.classList.add('hidden');
    }
    commentsCounter[0].textContent = `${finishIndex} из `;
  };

  loadMoreButton.addEventListener('click', loadMoreComments);
  pictureContainer.addEventListener('click', openBigPicture);
  bigPictureClose.addEventListener('click', closeBigPicture);
};

export { loadBigPicture };
