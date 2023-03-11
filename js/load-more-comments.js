export const commentsLoad = () => {
  const commentList = document.querySelector('.social__comments').children;
  const loadMoreCommentsButton = document.querySelector('.comments-loader');
  for (let i = 5; i < commentList.length; i++) {
    commentList[i].style.display = "none";
  }
  // var countD = 10;
  // btn.addEventListener("click", function () {
  //   var box = document.getElementsByClassName('box');
  //   countD += 10;
  //   if (countD <= box.length) {
  //     for (let i = 0; i < countD; i++) {
  //       box[i].style.display = "block";
  //     }
  //   }

  // })
};
