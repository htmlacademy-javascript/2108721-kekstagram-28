const form = document.querySelector('.img-upload__form');
const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
const MESSAGE_MAX_LENGTH = 140;
const HASHTAGS_MAX_QUANTITY = 5;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field-error',
});

// hashtag validator
const validateHashtag = (string) => {
  const hashTags = string.toLowerCase().trim().replace(/\s\s+/g, ' ').split(' ');
  const unicalHashTags = new Set(hashTags);
  if (hashTags[0] === '') {
    return true;
  }
  if (unicalHashTags.size !== hashTags.length) {
    return false && 'обнаружены одинаковые теги';
  }
  if (hashTags.length > HASHTAGS_MAX_QUANTITY) {
    return false && `длина тегов превысила ${HASHTAGS_MAX_QUANTITY} шт.`;
  }
  if (!hashTags.every((hashtag) => regexp.test(hashtag))) {
    return false && 'неправильный формат тегов. Должен начинаться с <#>, и иметь хотя бы 1 символ и не быть длиннее 20 символов';
  }
  return true;
};

const validateMessage = (message) => message.length <= MESSAGE_MAX_LENGTH;

const callValidator = () => {

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtag,
  );

  pristine.addValidator(
    form.querySelector('.text__description'),
    validateMessage,
  );
};

export {callValidator, pristine};
