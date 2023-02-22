/* eslint-disable no-inner-declarations */
// Функция проверки длины строки.

{
  const getStringLegth = (string, length) => string.length <= length;

  getStringLegth('проверяемая строка', 20);
  getStringLegth('проверяемая строка', 18);
  getStringLegth('проверяемая строка', 10);
}

// Функция проверки палидрома.

{
  const checkPalindrome = (string) => string.split('').reverse().join('').replaceAll(' ', '').toLowerCase() === string.replaceAll(' ', '').toLowerCase();
  checkPalindrome('топот');
  checkPalindrome('ДовОд');
  checkPalindrome('Кекс');
  checkPalindrome('Лёша на полке клопа нашёл ');
}


// Функция принятия строки, с извелечением цифры
{
  const getNumber = (value) => {
    if (typeof value === 'string') {
      const number = value.replace(/\D/g, '');
      return parseInt(number, 10);
    }
    if (typeof value === 'number') {
      return Math.abs(value);
    }
  };
  getNumber('2023 год');
  getNumber('ECMAScript 2022');
  getNumber('1 кефир, 0.5 батона');
  getNumber('а я томат');
  getNumber(2023);
  getNumber(-1);
  getNumber(1.5);
}

// Функция принимающая 3 параметра
{
  const remakeString = (string, minLength, addSymbol) => {
    const addCount = minLength - string.length;
    if (addCount <= 0) {
      return string;
    }
    const tempAdd = addSymbol.slice(0, addCount % addSymbol.length);
    const tempRepeat = addSymbol.repeat(addCount / addSymbol.length);
    return tempAdd + tempRepeat + string;
  };
  remakeString('1', 2, '0');
  remakeString('1', 4, '0');
  remakeString('q', 4, 'werty');
  remakeString('q', 4, 'we');
  remakeString('qwerty', 4, '0');
}
