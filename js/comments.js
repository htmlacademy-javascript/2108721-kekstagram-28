export const renderComments = (comments) => {
  const commentList = document.querySelector('.social__comments');
  const commentListElement = commentList.querySelector('.social__comment');
  const commentsLoadButton = document.querySelector('.comments-loader');
  const commentListFragment = document.createDocumentFragment();
  console.log(commentList)
  commentList.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const commentElement = commentListElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comments[i].avatar;
    commentElement.querySelector('.social__picture').alt = comments[i].name;
    commentElement.querySelector('.social__text').textContent = comments[i].message;
    commentListFragment.appendChild(commentElement);
  }
  commentList.appendChild(commentListFragment);

  let commentsCount = 5;
  if (commentsCount <= commentList.length) {
    commentsLoadButton.addEventListener('click', () => {
      console.log('asdasdasd');
      commentsCount += 5;
      for (let i = 0; i < commentsCount; i++) {
        const commentElement = commentListElement.cloneNode(true);
        commentElement.querySelector('.social__picture').src = comments[i].avatar;
        commentElement.querySelector('.social__picture').alt = comments[i].name;
        commentElement.querySelector('.social__text').textContent = comments[i].message;
        commentListFragment.appendChild(commentElement);
      }
      commentList.appendChild(commentListFragment);
    });
  } else {
    commentsLoadButton.classList.add('hidden');
  }
};
