/* eslint-disable no-return-assign */
// id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
// description, строка — описание фотографии. Описание придумайте самостоятельно.
// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
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
]

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]

const NAMES = [
  'Андрей',
  'Петр',
  'Василий',
  'Николай',
  'Сергей'
]

//  id

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomId = (min, max) => {
  const previousValues = []
  return function () {
    let currentValue = getRandomInteger(min, max)
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max)
    }
    previousValues.push(currentValue)
    return currentValue
  }
}
const generateId = createRandomId(1, 25)
const generateCommentId = createRandomId(0, 300)
const createIdGenerator = (start) => () => start += 1
const photoId = createIdGenerator(0)

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)]

// url

const getRandomComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
})

const commentsArray = Array.from({ length: 10 }, getRandomComment)
const randomComment = Math.floor(Math.random() * commentsArray.length)

// функция создания случайного объекта
const getRandomObject = () => ({
  id: generateId(),
  url: `photos/${photoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: commentsArray[randomComment],
})
// итоговый массив из 25 объектов
const randomObjectsArray = Array.from({ length: 25 }, getRandomObject)
console.log(randomObjectsArray)

