import { createObjects } from './data.js';
import { renderPictures } from './pictures.js';
import { interactWithBigPicture } from './full-picture.js';
import './picture-load-form.js';

export const pictureData = createObjects();
renderPictures(pictureData);

interactWithBigPicture();
