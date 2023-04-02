import { renderPictures } from './pictures.js';
import { sortPictures, setOnFormSubmit, showSortButtons } from './sort-pictures.js';
import { loadBigPicture } from './open-full-picture.js';
import { activatePictureLoadEditor } from './load-picture-editor.js';
import { getDefaultData, sendNewPicture } from './api.js';

const data = await getDefaultData();
renderPictures(data);
loadBigPicture(data);
activatePictureLoadEditor();
setOnFormSubmit(sendNewPicture);
sortPictures(data);
showSortButtons();
