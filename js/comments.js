import { commentsArray } from './data.js';
import { getRandomArrayElement } from './utils.js';

export const createComments = (comments) => {
  const commentList = document.querySelector('.social__comments');
  const commentListElement = commentList.querySelector('.social__comment');

  const commentListFragment = document.createDocumentFragment();
  commentList.innerHTML = '';

  comments.forEach(() => {
    const commentElement = commentListElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = getRandomArrayElement(commentsArray).avatar;
    commentElement.querySelector('.social__picture').alt = getRandomArrayElement(commentsArray).name;
    commentElement.querySelector('.social__text').textContent = getRandomArrayElement(commentsArray).message;
    commentListFragment.appendChild(commentElement);
  });
  commentList.appendChild(commentListFragment);
};


