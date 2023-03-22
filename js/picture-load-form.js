import { isEscapeKey } from './utils.js';
import './picture-validation.js';

export const openPictureLoadEditor = () => {
  const uploadFileInput = document.querySelector('#upload-file');
  const loadPictureEditor = document.querySelector('.img-upload__overlay');
  const pageBody = document.querySelector('body');
  const closePictureEditorButton = document.querySelector('.img-upload__cancel');
  const uploadPictureText = document.querySelector('.text__hashtags');
  const uploadPictureHashTags = document.querySelector('.text__description');

  const onPictureEditorEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closePictureEditor();
    }
  };

  const blockEscOnInputs = (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  };

  uploadPictureHashTags.addEventListener('keydown', blockEscOnInputs);
  uploadPictureText.addEventListener('keydown', blockEscOnInputs);

  uploadFileInput.onchange = () => {
    loadPictureEditor.classList.remove('hidden');
    pageBody.classList.add('modal-open');

    document.addEventListener('keydown', onPictureEditorEscKeydown);
  };

  // Scale picture logic
  const scaleControlSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');
  const scaleControlValue = document.querySelector('.scale__control--value');
  const previewPicture = document.querySelector('.img-upload__preview');
  let scaleStep = parseInt(scaleControlValue.value, 10) / 100;
  previewPicture.style.transform = `scale(${scaleStep})`;


  function makeScaleSmaller() {
    if (scaleControlValue.value !== scaleControlValue.min) {
      scaleControlBigger.removeAttribute('disabled', true);
      scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - 25}%`;
      scaleStep = parseInt(scaleControlValue.value, 10) / 100;
      previewPicture.style.transform = `scale(${scaleStep})`;

    } else {
      scaleControlSmaller.setAttribute('disabled', true);
    }
  }

  scaleControlSmaller.addEventListener('click', makeScaleSmaller);

  function makeScaleBigger() {
    if (scaleControlValue.value !== scaleControlValue.max) {
      scaleControlSmaller.removeAttribute('disabled', true);
      scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + 25}%`;
      scaleStep = parseInt(scaleControlValue.value, 10) / 100;
      previewPicture.style.transform = `scale(${scaleStep})`;
    } else {
      scaleControlBigger.setAttribute('disabled', true);
    }
  }

  scaleControlBigger.addEventListener('click', makeScaleBigger);

  // close picture load window
  function closePictureEditor() {
    loadPictureEditor.classList.add('hidden');
    pageBody.classList.remove('modal-open');
    previewPicture.classList.remove(previewPicture.classList[1]);
    uploadFileInput.innerHTML = '';

    document.removeEventListener('keydown', onPictureEditorEscKeydown);
  }

  closePictureEditorButton.addEventListener('click', closePictureEditor);
};
