import { isEscapeKey } from './utils.js';
import { resetEffects } from './load-picture-slider.js';
import { callScaleRegulator } from './picture-scale.js';
import { callValidator } from './picture-validation.js';
import { pristine } from './picture-validation.js';
import { resetScale } from './picture-scale.js';

export const openPictureLoadEditor = () => {
  const uploadFileInput = document.querySelector('#upload-file');
  const loadPictureEditor = document.querySelector('.img-upload__overlay');
  const pageBody = document.querySelector('body');
  const closePictureEditorButton = document.querySelector('.img-upload__cancel');
  const uploadPictureText = document.querySelector('.text__hashtags');
  const uploadPictureHashTags = document.querySelector('.text__description');
  const previewPicture = document.querySelector('.img-upload__preview img');

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

  // close picture editor
  function closePictureEditor() {
    loadPictureEditor.classList.add('hidden');
    pageBody.classList.remove('modal-open');
    previewPicture.classList.remove(previewPicture.classList[1]);
    uploadFileInput.value = '';
    resetEffects();
    resetScale();
    pristine.reset();

    document.removeEventListener('keydown', onPictureEditorEscKeydown);
  }

  closePictureEditorButton.addEventListener('click', closePictureEditor);

  callScaleRegulator();
  callValidator();
};

