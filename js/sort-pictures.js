import { closePictureEditor, setOnFormSubmit, openPictureLoadEditor } from './load-picture-editor.js';
import { loadBigPicture } from './open-full-picture.js';
import { renderPictures } from './pictures.js';
import { getData, sendData } from './api.js';
import { showAlert } from './utils.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const RANDOM_PICTURES_LENGTH = 10;

const filtersBlock = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');
const similarListElemets = document.querySelector('.pictures');
const sortButtons = document.querySelectorAll('.img-filters__button');
const childSimilarElements = similarListElemets.children;
let data;

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
  for (let i = 0; i < childSimilarElements.length; i++) {
    if (childSimilarElements[i].classList.contains('picture')) {
      similarListElemets.removeChild(childSimilarElements[i]);
      i--;
    }
  }
};

// по умолч
function sortDefault() {
  deletePreviousPictures();
  renderPictures(data);
  loadBigPicture(data);
}

// случайные
const sortRandomData = () => {
  const randomData = data
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, RANDOM_PICTURES_LENGTH);
  deletePreviousPictures();
  renderPictures(randomData);
  loadBigPicture(randomData);
};

// по убыванию кол-ва комментов
const sortComments = () => {
  deletePreviousPictures();
  const commentsData = data
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);
  renderPictures(commentsData);
  loadBigPicture(commentsData);
};


const sortPictures = async () => {
  try {
    data = await getData();
    sortDefault();
    filtersBlock.classList.remove('img-filters--inactive');
    openPictureLoadEditor();
  } catch (err) {
    showAlert(err.message);
  }

  setOnFormSubmit(async (pictures) => {
    try {
      await sendData(pictures);
      closePictureEditor();
      showSuccessMessage();
    } catch {
      showErrorMessage();
    }
  });

  sortButtons.forEach((button) => {
    button.addEventListener('click', changeSortClass);
  });
  filterDiscussedButton.addEventListener('click', sortComments);
  filterRandomButton.addEventListener('click', sortRandomData);
  filterDefaultButton.addEventListener('click', sortDefault);
};

export { sortPictures};

// доделать: 1. комменты и description криво при сортировке. 2. устранить дребезг
