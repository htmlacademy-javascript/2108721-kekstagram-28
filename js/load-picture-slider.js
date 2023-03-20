import '../vendor/nouislider/nouislider.js';

const sliderElement = document.querySelector('.effect-level__slider');


noUiSlider.create(sliderElement, {
  range: {
    min: 1,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

// sliderElement.noUiSlider.on('update', (...rest) => {
//   console.log(rest);
// });
