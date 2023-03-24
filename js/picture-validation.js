const form = document.querySelector('.img-upload__form');
const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
const MESSAGE_MAX_LENGTH = 140;
const HASHTAGS_MAX_QUANTITY = 5;

export const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field--invalid',
  successClass: 'img-upload__field--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field-error',
});

// hashtag validator
function validateHashtag(string) {
  const hashTags = string.toLowerCase().trim().replace(/\s\s+/g, ' ').split(' ');
  const unicalHashTags = new Set(hashTags);
  if (hashTags[0] === '') {
    return true;
  }
  if (unicalHashTags.size !== hashTags.length) {
    return false;
  }
  if (hashTags.length > HASHTAGS_MAX_QUANTITY) {
    return false;
  }
  if (!hashTags.every((hashtag) => regexp.test(hashtag))) {
    return false;
  }
  return true;
}

function getSimilarTagsError(string) {
  const hashTags = string.toLowerCase().trim().replace(/\s\s+/g, ' ').split(' ');
  const unicalHashTags = new Set(hashTags);
  if (unicalHashTags.size !== hashTags.length) {
    return 'обнаружены одинаковые теги';
  }
  if (hashTags.length > HASHTAGS_MAX_QUANTITY) {
    return `длина тегов превысила ${HASHTAGS_MAX_QUANTITY} шт.`;
  }
  if (!hashTags.every((hashtag) => regexp.test(hashtag))) {
    return 'неправильный формат тегов. Должен начинаться с <#>, и иметь хотя бы 1 символ и не быть длиннее 20 символов';
  }
}
// message validator
function validateMessage(message) {
  return message.length <= MESSAGE_MAX_LENGTH;
}

export function callValidator() {
  pristine.addValidator(
    form.querySelector('#hashtags'),
    validateHashtag,
    getSimilarTagsError
  );

  pristine.addValidator(
    form.querySelector('.text__description'),
    validateMessage,
  );

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      form.submit();
    }
  });
}


