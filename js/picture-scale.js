const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewPicture = document.querySelector('.img-upload__preview');
let scaleStep = parseInt(scaleControlValue.value, 10) / 100;

const resetScale = () => {
  previewPicture.style.transform = 'scale(1)';
  scaleControlValue.value = `${SCALE_DEFAULT}%`;
};

const makeScaleSmaller = () => {
  if (scaleControlValue.value !== scaleControlValue.min) {
    scaleControlBigger.removeAttribute('disabled', true);
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - SCALE_STEP}%`;
    scaleStep = parseInt(scaleControlValue.value, 10) / 100;
    previewPicture.style.transform = `scale(${scaleStep})`;
  } else {
    scaleControlSmaller.setAttribute('disabled', true);
  }
};

const makeScaleBigger = () => {
  if (scaleControlValue.value !== scaleControlValue.max) {
    scaleControlSmaller.removeAttribute('disabled', true);
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + SCALE_STEP}%`;
    scaleStep = parseInt(scaleControlValue.value, 10) / 100;
    previewPicture.style.transform = `scale(${scaleStep})`;
  } else {
    scaleControlBigger.setAttribute('disabled', true);
  }
};

previewPicture.style.transform = `scale(${scaleStep})`;

const callScaleRegulator = () => {
  scaleControlBigger.addEventListener('click', makeScaleBigger);
  scaleControlSmaller.addEventListener('click', makeScaleSmaller);
};

export { resetScale, callScaleRegulator };
