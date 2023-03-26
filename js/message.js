const showSuccessMessage = () => {
  const successMessageBlock = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successMessage = successMessageBlock.cloneNode(true);
  document.body.appendChild(successMessage);
};

// const closeSuccessWindow = (evt) => {
//   const targetPoint = evt.target.closest('.success');

//   const successButton = targetPoint.querySelector('.success__button');
//   const successWindow = targetPoint.querySelector('.success');
//   if (targetPoint) {
//     successWindow.classList.add('hidden');
//     console.log(successWindow)
//   }
// };

// successButton.addEventListener('click', closeSuccessWindow);

const showErrorMessage = () => {
  const errorMessageBlock = document.querySelector('#error')
    .content
    .querySelector('.error');
  const errorMessage = errorMessageBlock.cloneNode(true);
  document.body.appendChild(errorMessage);
};

export { showSuccessMessage, showErrorMessage };
