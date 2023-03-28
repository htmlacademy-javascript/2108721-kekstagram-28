import { closePictureEditor, setOnFormSubmit, openPictureLoadEditor } from './load-picture-editor.js';
import { loadBigPicture } from './open-full-picture.js';
import { renderPictures } from './pictures.js';
import { getData, sendData } from './api.js';
import { showAlert } from './utils.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

try {
  const pictures = await getData();
  renderPictures(pictures);
  openPictureLoadEditor();
  loadBigPicture(pictures);
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
