import { setOnFormSubmit } from './load-picture-editor.js';
import { renderPictures } from './pictures.js';
import { debounce } from './utils.js';

const RANDOM_PICTURES_COUNT = 10;
const RERENDERER_DELAY = 500;

const filtersBlock = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');
const similarListElemets = document.querySelector('.pictures');
const sortButtons = document.querySelectorAll('.img-filters__button');

const showSortButtons = () => {
  filtersBlock.classList.remove('img-filters--inactive');
};


const changeSortClass = (evt) => {
  const activeClass = 'img-filters__button--active';
  const clickedButton = evt.target;
  if (!clickedButton.classList.contains(activeClass)) {
    sortButtons.forEach((button) => {
      button.classList.remove(activeClass);
    });
    clickedButton.classList.add(activeClass);
  }
};

const deletePreviousPictures = () => {
  const pictureElements = similarListElemets.querySelectorAll('.picture');
  pictureElements.forEach((item) => item.remove());
};

// по умолч
const sortDefault = (debounce((data) => {
  deletePreviousPictures();
  renderPictures(data);
}, RERENDERER_DELAY));

// случайные
const sortRandomData = (debounce((data) => {
  deletePreviousPictures();
  const randomData = data
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, RANDOM_PICTURES_COUNT);
  renderPictures(randomData);
}, RERENDERER_DELAY));

// по убыванию кол-ва комментов
const sortComments = (debounce((data) => {
  deletePreviousPictures();
  const commentsData = data
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);
  renderPictures(commentsData);
}, RERENDERER_DELAY));

const sortPictures = (data) => {
  sortButtons.forEach((button) => {
    button.addEventListener('click', changeSortClass);
  });
  filterDiscussedButton.addEventListener('click', () => sortComments(data));
  filterRandomButton.addEventListener('click', () => sortRandomData(data));
  filterDefaultButton.addEventListener('click', () => sortDefault(data));
};

export { sortPictures, setOnFormSubmit, showSortButtons };
