import { createObjects } from './data.js';
import { renderPictures } from './pictures.js';
import { interactWithBigPicture } from './full-picture.js';
import { openPictureLoadEditor } from './picture-load-form.js';
import './load-picture-slider.js';
import './picture-validation.js';

export const pictureData = createObjects();
renderPictures(pictureData);

interactWithBigPicture();

openPictureLoadEditor();
