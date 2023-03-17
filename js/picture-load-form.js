import { isEscapeKey } from './utils.js';

const uploadFileInput = document.querySelector('#upload-file');
const loadPictureEditor = document.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const closePictureEditorButton = document.querySelector('.big-picture__cancel');

const onPictureEditorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closePictureEditor();
  }
};

uploadFileInput.onchange = () => {
  loadPictureEditor.classList.remove('hidden');
  pageBody.classList.add('.modal-open');
};

function closePictureEditor () {
  loadPictureEditor.classList.add('hidden');
  pageBody.classList.remove('.modal-open');

  document.addEventListener('keydown', onPictureEditorEscKeydown);
}

closePictureEditorButton.addEventListener('click', closePictureEditor);
