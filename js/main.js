import { openPictureLoadEditor, closePictureEditor } from './picture-load-editor.js';
import { setOnFormSubmit } from './picture-load-editor.js';
import { interactWithBigPicture } from './full-picture.js';
import { renderPictures } from './pictures.js';
import './load-picture-slider.js';
import './fetch.js';
import { getData, sendData } from './fetch.js';
import { showAlert } from './utils.js';

openPictureLoadEditor();

try {
  const data = await getData();
  renderPictures(data);
  interactWithBigPicture(data);
} catch (err) {
  showAlert(err.message);
}

// setOnFormSubmit(async (data) => {
//   try {
//     await sendData(data);
//   }
// });
