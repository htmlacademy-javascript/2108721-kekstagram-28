import { openPictureLoadEditor, closePictureEditor } from './load-picture-editor.js';
import { setOnFormSubmit } from './load-picture-editor.js';
import { interactWithBigPicture } from './load-full-picture.js';
import { renderPictures } from './pictures.js';
import { getData, sendData } from './api.js';
import { showAlert } from './utils.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

openPictureLoadEditor();

try {
  const data = await getData();
  renderPictures(data);
  interactWithBigPicture(data);
} catch (err) {
  showAlert(err.message);
}

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closePictureEditor();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
