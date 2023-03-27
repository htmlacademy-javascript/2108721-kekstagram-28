import { openPictureLoadEditor, closePictureEditor } from './load-picture-editor.js';
import { setOnFormSubmit } from './load-picture-editor.js';
import { interactWithBigPicture } from './load-full-picture.js';
import { renderPictures } from './pictures.js';
import { getData, sendData } from './api.js';
import { showAlert } from './utils.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

openPictureLoadEditor();

try {
  const pictures = await getData();
  renderPictures(pictures);
  interactWithBigPicture(pictures);
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
