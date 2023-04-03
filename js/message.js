import { onPictureEditorEscKeydown } from './load-picture-editor.js';
import { isEscapeKey } from './utils.js';

const pageBody = document.querySelector('body');

const onMessageWindowClose = (evt) => {
  const succesWindow = evt.target.closest('.success');
  const errorWindow = evt.target.closest('.error');
  if (evt.target.classList.contains('success__button') || evt.target.classList.contains('success')) {
    pageBody.removeChild(succesWindow);
    succesWindow.classList.add('hidden');
    document.removeEventListener('click', onMessageWindowClose);
  }
  if (evt.target.classList.contains('error__button') || evt.target.classList.contains('error')) {
    pageBody.removeChild(errorWindow);
    errorWindow.classList.add('hidden');
    document.removeEventListener('click', onMessageWindowClose);
  }
  document.removeEventListener('keydown', onPictureMessageLoad);
  document.addEventListener('keydown', onPictureEditorEscKeydown);
};

const closeMessageWindowByEsc = () => {
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

  document.addEventListener('click', onMessageWindowClose);
  document.addEventListener('keydown', onPictureMessageLoad);
};

const showErrorMessage = () => {
  const errorMessageBlock = document.querySelector('#error')
    .content
    .querySelector('.error');
  const errorMessage = errorMessageBlock.cloneNode(true);
  document.body.appendChild(errorMessage);

  document.removeEventListener('keydown', onPictureEditorEscKeydown);
  document.addEventListener('click', onMessageWindowClose);
  document.addEventListener('keydown', onPictureMessageLoad);
};

function onPictureMessageLoad(evt) {
  if (isEscapeKey(evt)) {
    closeMessageWindowByEsc();
    document.removeEventListener('click', onMessageWindowClose);
  }
}

export { showSuccessMessage, showErrorMessage };
