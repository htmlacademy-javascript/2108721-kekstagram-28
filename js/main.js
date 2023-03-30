import { renderPictures } from './pictures.js';
import { sortPictures, setOnFormSubmit, showSortButtons } from './sort-pictures.js';
import { loadBigPicture } from './open-full-picture.js';
import { openPictureLoadEditor } from './load-picture-editor.js';
import { getDefaultData } from './api.js';

const data = await getDefaultData();
renderPictures(data);
loadBigPicture(data);
openPictureLoadEditor();
setOnFormSubmit();
sortPictures(data);
showSortButtons();
