import { createObjects } from './data.js';
import { createPictures } from './pictures.js';
import { interactWithBigPicture } from './full-picture.js';
import { commentsLoad } from './load-more-comments.js';

const userPictures = createObjects();
createPictures(userPictures);

interactWithBigPicture();

commentsLoad();
