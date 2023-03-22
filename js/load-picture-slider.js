import '../vendor/nouislider/nouislider.js';

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const pictureEffectsFieldset = document.querySelector('.img-upload__effects');
const previewPicture = document.querySelector('.img-upload__preview');
const pictureEffectsList = pictureEffectsFieldset.querySelector('.effects__list');
const pictureEffectInputChecked = pictureEffectsList.querySelector('[checked]');

// picture effects changing
function changeLoadPictureEffect(evt) {
  const targetPoint = evt.target.closest('.effects__item');
  const requiredClass = targetPoint.querySelector('.effects__preview').classList[1];

  if (pictureEffectInputChecked) {
    previewPicture.classList.remove(previewPicture.classList[1]);
    previewPicture.classList.add(requiredClass);
  }
}

pictureEffectsList.addEventListener('change', changeLoadPictureEffect);
noUiSlider.create(sliderElement, {
  range: {
    min: 1,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

function changePictureEffectSaturation (evt) {
  valueElement.value = sliderElement.noUiSlider.get();
  console.log(valueElement.value);
  const pictureEffectClass = previewPicture.classList[1];
  const filterName = window.getComputedStyle(previewPicture).filter;
  const filterText = filterName.replace(/[^a-z]/g, '');
  if (previewPicture.classList.contains(pictureEffectClass)) {
    previewPicture.style.filter = `${filterText}(${valueElement.value})`;
  } else {
    return previewPicture
  }
}

sliderElement.noUiSlider.on('update', changePictureEffectSaturation);

pictureEffectsFieldset.addEventListener('change', (evt) => {
  if (evt.target.id === 'effect-chrome' || evt.target.id === 'effect-sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
  }
  if (evt.target.id === 'effect-marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    });
  }
  if (evt.target.id === 'effect-phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  }
  if (evt.target.id === 'effect-heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  }
});
