const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewPicture = document.querySelector('.img-upload__preview');
const SCALE_STEP = 25;
let scaleStep = parseInt(scaleControlValue.value, 10) / 100;
previewPicture.style.transform = `scale(${scaleStep})`;

function makeScaleSmaller() {
  if (scaleControlValue.value !== scaleControlValue.min) {
    scaleControlBigger.removeAttribute('disabled', true);
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - SCALE_STEP}%`;
    scaleStep = parseInt(scaleControlValue.value, 10) / 100;
    previewPicture.style.transform = `scale(${scaleStep})`;
  } else {
    scaleControlSmaller.setAttribute('disabled', true);
  }
}

function makeScaleBigger() {
  if (scaleControlValue.value !== scaleControlValue.max) {
    scaleControlSmaller.removeAttribute('disabled', true);
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + SCALE_STEP}%`;
    scaleStep = parseInt(scaleControlValue.value, 10) / 100;
    previewPicture.style.transform = `scale(${scaleStep})`;
  } else {
    scaleControlBigger.setAttribute('disabled', true);
  }
}

export function callScaleRegulator() {
  scaleControlBigger.addEventListener('click', makeScaleBigger);
  scaleControlSmaller.addEventListener('click', makeScaleSmaller);
}
