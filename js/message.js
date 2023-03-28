import { isEscapeKey } from './utils.js';

const closeMessageWindow = (evt) => {
  const succesWindow = evt.target.closest('.success');
  const errorWindow = evt.target.closest('.error');
  if (evt.target.classList.contains('success__button') || evt.target.classList.contains('success')) {
    succesWindow.classList.add('hidden');
    document.removeEventListener('click', closeMessageWindow);
  }
  if (evt.target.classList.contains('error__button') || evt.target.classList.contains('error')) {
    errorWindow.classList.add('hidden');
    document.removeEventListener('click', closeMessageWindow);
  }
};

const closeMessageWindowByEsc = () => {
  const pageBody = document.querySelector('body');
  const succesWindow = document.querySelector('.success');
  const errorWindow = document.querySelector('.error');
  if (succesWindow) {
    pageBody.removeChild(succesWindow);
  }
  if (errorWindow) {
    pageBody.removeChild(errorWindow);
  }
};

const showSuccessMessage = () => {
  const successMessageBlock = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successMessage = successMessageBlock.cloneNode(true);
  document.body.appendChild(successMessage);

  document.addEventListener('click', closeMessageWindow);
  document.addEventListener('keydown', onPictureLoadMessage);
};

const showErrorMessage = () => {
  const errorMessageBlock = document.querySelector('#error')
    .content
    .querySelector('.error');
  const errorMessage = errorMessageBlock.cloneNode(true);
  document.body.appendChild(errorMessage);

  document.addEventListener('click', closeMessageWindow);
  document.addEventListener('keydown', onPictureLoadMessage);
};

function onPictureLoadMessage(evt) {
  if (isEscapeKey(evt)) {
    closeMessageWindowByEsc();
    document.removeEventListener('keydown', onPictureLoadMessage);
  }
}

export { showSuccessMessage, showErrorMessage };
