import { getRandomInteger, createRandomId, getRandomArrayElement,createIdGenerator } from './utils.js';

const DESCRIPTIONS = [
  'пляж',
  'указатель к пляжу',
  'море',
  'сиськи',
  'прикольное блюдо',
  'тачка бомба',
  'клубника на тарелке',
  'морс клюквенный',
  'самолет',
  'обувница',
  'песчаный пляж',
  'ауди R',
  'салатик',
  'которолл',
  'тапкоугги',
  'атмосфера',
  'оркестр',
  'шевроле колумбо',
  'тапки с фонарями',
  'пальмы',
  'паэлья?',
  'закат на море',
  'крабс',
  'концерт',
  'сафари',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Андрей',
  'Петр',
  'Василий',
  'Николай',
  'Сергей'
];
const COMMENTS_RANGE_MIN = 0;
const COMMENTS_RANGE_MAX = 300;
const PHOTOS_COUNT = 0;
const MIN_ID = 1;
const MAX_ID = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const COMMENTS_COUNT = 10;
const ARRAY_COUNT = 25;

//  id
const generateId = createRandomId(MIN_ID, MAX_ID);
const generateCommentId = createRandomId(COMMENTS_RANGE_MIN, COMMENTS_RANGE_MAX);
const photoId = createIdGenerator(PHOTOS_COUNT);

// создает случайный комментарий
const getRandomComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const commentsArray = Array.from({ length: COMMENTS_COUNT }, getRandomComment);
const randomComment = Math.floor(Math.random() * commentsArray.length);

// функция создания случайного объекта
const getRandomPhotoObject = () => ({
  id: generateId(),
  url: `photos/${photoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: commentsArray[randomComment],
});
// итоговая функция по получению массива из 25 объектов
export const createObjects = () => Array.from({ length: ARRAY_COUNT }, getRandomPhotoObject);


