const createTd = data => {
  const td = document.createElement('td');
  td.innerHTML = data;
  return td;
};

const drawComment = (commentInfo, commentsElement) => {
  const { username, date, comment } = commentInfo;
  const commentRow = document.createElement('tr');

  const nameElement = createTd(username);
  const commentElement = createTd(comment);
  const dateElement = createTd(date);

  commentRow.appendChild(nameElement);
  commentRow.appendChild(commentElement);
  commentRow.appendChild(dateElement);
  commentsElement.appendChild(commentRow);
  return;
};

const redrawComments = (comments) => {
  const commentsElement = document.querySelector('#comments');
  commentsElement.innerHTML = null;
  comments.forEach((commentInfo) => drawComment(commentInfo, commentsElement));
};

const displayComments = (url) => {
  xhrGet(url, (xhr) => {
    redrawComments(JSON.parse(xhr.response));
  })
};

const addComment = () => {
  const commentsUrl = '/api/get-comments';
  const addCommentsUrl = '/guest-book/add-comment';
  const body = readFormData('#add-comments');

  xhrPost(addCommentsUrl, (xhr) => {
    displayComments(commentsUrl);
    resetForm('#add-comments');
  }, '', body.toString());

  return;
};
