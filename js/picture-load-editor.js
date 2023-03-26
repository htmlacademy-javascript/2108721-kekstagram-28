import { isEscapeKey } from './utils.js';
import { resetEffects } from './load-picture-slider.js';
import { callScaleRegulator } from './picture-scale.js';
import { callValidator } from './picture-validation.js';
import { pristine } from './picture-validation.js';
import { resetScale } from './picture-scale.js';

const uploadFileInput = document.querySelector('#upload-file');
const loadPictureEditor = document.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const closePictureEditorButton = document.querySelector('.img-upload__cancel');
const uploadPictureText = document.querySelector('.text__hashtags');
const uploadPictureHashTags = document.querySelector('.text__description');
const previewPicture = document.querySelector('.img-upload__preview img');
const pictureForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const blockEscOnInputs = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const openPictureLoadEditor = () => {
  uploadPictureHashTags.addEventListener('keydown', blockEscOnInputs);
  uploadPictureText.addEventListener('keydown', blockEscOnInputs);
  callScaleRegulator();
  callValidator();
};

uploadFileInput.onchange = () => {
  loadPictureEditor.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  openPictureLoadEditor();
};

const closePictureEditor = () => {
  loadPictureEditor.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  previewPicture.classList.remove(previewPicture.classList[0]);
  uploadFileInput.value = '';
  resetEffects();
  resetScale();
  pristine.reset();
};

const onPictureEditorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closePictureEditor();
    document.removeEventListener('keydown', onPictureEditorEscKeydown);
  }
};

document.addEventListener('keydown', onPictureEditorEscKeydown);
closePictureEditorButton.addEventListener('click', closePictureEditor);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setOnFormSubmit = (callback) => {
  pictureForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await callback(new FormData(pictureForm));
      unblockSubmitButton();
    }
  });
};

export { setOnFormSubmit, openPictureLoadEditor, closePictureEditor };
