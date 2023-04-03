const EFFECTS = [
  {
    min: 0,
    max: 100,
    step: 1,
  },
  {
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    min: 0,
    max: 100,
    step: 1
  },
  {
    min: 0,
    max: 3,
    step: 0.1
  },
  {
    min: 1,
    max: 3,
    step: 0.1
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
const CHROME_EFFECT = EFFECTS[1];
const SEPIA_EFFECT = EFFECTS[1];
const MARVIN_EFFECT = EFFECTS[2];
const PHOBOS_EFFECT = EFFECTS[3];
const HEAT_EFFECT = EFFECTS[4];

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const pictureEffectsFieldset = document.querySelector('.img-upload__effects');
const previewPicture = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const scaleInput = document.querySelector('.scale__control--value');
let filterValue = '';
let activeEffect = 'none';


const hideSlider = () => {
  sliderContainer.setAttribute('hidden', 'hidden');
};

const showSlider = () => {
  sliderContainer.removeAttribute('hidden');
};

const updateSlider = (value) => {
  if (value === 'none') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: DEFAULT_EFFECT.min,
        max: DEFAULT_EFFECT.max
      },
      start: DEFAULT_EFFECT.max,
      step: DEFAULT_EFFECT.step
    });
  }
  if (value === 'chrome') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: CHROME_EFFECT.min,
        max: CHROME_EFFECT.max,
      },
      start: CHROME_EFFECT.max,
      step: CHROME_EFFECT.step,
    });
  }
  if (value === 'sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: SEPIA_EFFECT.min,
        max: SEPIA_EFFECT.max,
      },
      start: SEPIA_EFFECT.max,
      step: SEPIA_EFFECT.step,
    });
  }
  if (value === 'marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MARVIN_EFFECT.min,
        max: MARVIN_EFFECT.max,
      },
      start: MARVIN_EFFECT.max,
      step: MARVIN_EFFECT.step,
    });
  }
  if (value === 'phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: PHOBOS_EFFECT.min,
        max: PHOBOS_EFFECT.max,
      },
      start: PHOBOS_EFFECT.max,
      step: PHOBOS_EFFECT.step,
    });
  }
  if (value === 'heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: HEAT_EFFECT.min,
        max: HEAT_EFFECT.max,
      },
      start: HEAT_EFFECT.max,
      step: HEAT_EFFECT.step,
    });
  }
};

const resetEffects = () => {
  previewPicture.classList.remove(previewPicture.classList[0]);
  updateSlider('none');
  previewPicture.removeAttribute('style', `filter: ${filterValue}`);
  hideSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  valueElement.value = sliderValue;

  if (activeEffect === 'chrome') {
    filterValue = `grayscale(${sliderValue})`;
  } else if (activeEffect === 'sepia') {
    filterValue = `sepia(${sliderValue})`;
  } else if (activeEffect === 'marvin') {
    filterValue = `invert(${sliderValue}%)`;
  } else if (activeEffect === 'phobos') {
    filterValue = `blur(${sliderValue}px)`;
  } else if (activeEffect === 'heat') {
    filterValue = `brightness(${sliderValue})`;
  }

  if (activeEffect !== 'none') {
    previewPicture.setAttribute('style', `filter: ${filterValue}; transform: scale(${scaleInput.value})`);
  }
});

const showPictureEffectSlider = (evt) => {
  const effect = evt.target.closest('input[type="radio"]').value;
  activeEffect = effect;

  if (effect === 'none') {
    hideSlider();
    previewPicture.removeAttribute('style', 'filter:');
    previewPicture.setAttribute('style', `transform: scale(${scaleInput.value})`);
  } else {
    showSlider();
  }

  previewPicture.className = `effects__preview--${effect}`;

  updateSlider(effect);
};

pictureEffectsFieldset.addEventListener('change', showPictureEffectSlider);

hideSlider();

export { resetEffects };
