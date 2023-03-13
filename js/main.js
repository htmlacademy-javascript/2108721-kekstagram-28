import { createObjects } from './data.js';
import { renderPictures } from './pictures.js';
import { interactWithBigPicture } from './full-picture.js';


export const userData = createObjects();
renderPictures(userData);

interactWithBigPicture();
