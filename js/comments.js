export const renderComments = (comment) => {
  const commentList = document.querySelector('.social__comments');
  const commentListElement = commentList.querySelector('.social__comment');
  const commentListFragment = document.createDocumentFragment();
  commentList.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const commentElement = commentListElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment[i].comments[i].avatar;
    commentElement.querySelector('.social__picture').alt = comment[i].comments[i].name;
    commentElement.querySelector('.social__text').textContent = comment[i].comments[i].message;
    commentListFragment.appendChild(commentElement);
  }
  commentList.appendChild(commentListFragment);
};

