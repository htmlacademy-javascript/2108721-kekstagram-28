const form = document.querySelector('.img-upload__form');
const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_MAX_QUANTITY = 5;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field-error',
});

const validateHashtag = (string) => {
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
};

const callValidator = () => {

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtag,
    'неверный формат хэштэгов'
  );
};

export {callValidator, pristine};
