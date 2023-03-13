export const renderComments = (comments) => {
  const commentList = document.querySelector('.social__comments');
  const commentListElement = commentList.querySelector('.social__comment');
  const commentListFragment = document.createDocumentFragment();
  commentList.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const commentElement = commentListElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comments[i].avatar;
    commentElement.querySelector('.social__picture').alt = comments[i].name;
    commentElement.querySelector('.social__text').textContent = comments[i].message;
    commentListFragment.appendChild(commentElement);
  }
  commentList.appendChild(commentListFragment);
};

