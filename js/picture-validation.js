const form = document.querySelector('.img-upload__form');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form);

function validateHashtag (value) {
  hashtag.test(value);
}

pristine.addValidator(form.querySelector('.hashtags'), validateHashtag, 'неправильный формат Хэштэга');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// хэш-теги разделяются пробелами;

// один и тот же хэш-тег не может быть использован дважды;

// нельзя указать больше пяти хэш-тегов;

// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
