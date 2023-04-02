import { isEscapeKey } from './utils.js';
import { resetEffects } from './load-picture-slider.js';
import { callScaleRegulator } from './picture-scale.js';
import { callValidator } from './picture-validation.js';
import { pristine } from './picture-validation.js';
import { resetScale } from './picture-scale.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...'
};

const uploadFileInput = document.querySelector('#upload-file');
const loadPictureEditor = document.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const closePictureEditorButton = document.querySelector('.img-upload__cancel');
const uploadPictureHashTags = document.querySelector('.text__hashtags');
const uploadPictureText = document.querySelector('.text__description');
const previewPicture = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const blockEscOnInputs = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const closePictureEditor = () => {
  uploadFileInput.value = '';
  resetEffects();
  resetScale();
  pristine.reset();
  uploadPictureText.value = '';
  uploadPictureHashTags.value = '';

  loadPictureEditor.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  previewPicture.classList.remove(previewPicture.classList[0]);
};

const activatePictureLoadEditor = () => {
  callScaleRegulator();
  callValidator();

  uploadPictureHashTags.addEventListener('keydown', blockEscOnInputs);
  uploadPictureText.addEventListener('keydown', blockEscOnInputs);
  closePictureEditorButton.addEventListener('click', closePictureEditor);
};

const onPictureEditorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closePictureEditor();
    document.removeEventListener('keydown', onPictureEditorEscKeydown);
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setOnFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await callback(new FormData(form));
      unblockSubmitButton();
    }
  });
};

const loadUserPicture = () => {
  const file = uploadFileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPicture.src = URL.createObjectURL(file);
    loadPictureEditor.classList.remove('hidden');
    pageBody.classList.add('modal-open');
  }
  document.addEventListener('keydown', onPictureEditorEscKeydown);
};

uploadFileInput.addEventListener('change', loadUserPicture);

export { setOnFormSubmit, activatePictureLoadEditor, closePictureEditor, onPictureEditorEscKeydown };
