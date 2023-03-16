export const renderComments = (pictures, startIndex, finishIndex) => {
  const commentList = document.querySelector('.social__comments');
  const commentListElement = commentList.querySelector('.social__comment');
  const commentListFragment = document.createDocumentFragment();

  for (let i = startIndex; i < finishIndex; i++) {
    if (startIndex === 0) {
      commentList.innerHTML = '';
    }
    const commentElement = commentListElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = pictures[i].comments[i].avatar;
    commentElement.querySelector('.social__picture').alt = pictures[i].comments[i].name;
    commentElement.querySelector('.social__text').textContent = pictures[i].comments[i].message;
    commentListFragment.appendChild(commentElement);
  }
  commentList.appendChild(commentListFragment);
};
