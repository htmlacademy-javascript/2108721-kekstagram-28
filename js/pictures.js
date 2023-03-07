import { createObjects } from './data.js';

const similarListElement = document.querySelector('.pictures'); /*найти куда отрисовывать */
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture'); /*созд переменная для шаблона */

const similarPictures = createObjects();

const similarListFragment = document.createDocumentFragment();

similarPictures.forEach(({url, comments, likes}) => {
  const pictureElement = similarPictureTemplate.cloneNode(true); /* клонирую шаблон, для того чтобы добавить в  pictures любое кол-во изображений */
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  similarListElement.appendChild(pictureElement); /* вставляю скопированные элементы в список к pictures */
  similarListFragment.appendChild(pictureElement);
});

similarListElement.appendChild(similarListFragment);

