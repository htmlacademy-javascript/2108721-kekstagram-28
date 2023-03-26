const renderPictures = (pictures) => {
  const similarListElement = document.querySelector('.pictures');
  const similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const similarListFragment = document.createDocumentFragment();

  pictures.forEach(({ url, comments, likes, id }) => {
    const pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    similarListFragment.appendChild(pictureElement);
    pictureElement.dataset.id = id;
  });
  similarListElement.appendChild(similarListFragment);
};

export {renderPictures};
