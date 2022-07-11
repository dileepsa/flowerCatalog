const drawComment = (commentInfo, commentsElement) => {
  const { username, date, comment } = commentInfo;
  const commentRow = document.createElement('tr');

  const nameElement = document.createElement('td');
  nameElement.innerText = username;

  const commentElement = document.createElement('td');
  commentElement.innerText = comment;

  const dateElement = document.createElement('td');
  dateElement.innerText = date;

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

const xhrGet = (path, callBack, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => callBack(xhr);
  xhr.open('GET', path);
  xhr.send(body);
};

const xhrPost = (path, callBack, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => callBack(xhr);
  xhr.open('POST', path);
  xhr.send(body);
};

const displayComments = (url) => {
  xhrGet(url, (xhr) => {
    if (xhr.status !== 200) {
      return;
    }
    redrawComments(JSON.parse(xhr.response));
  })
};

const resetForm = (selector) => {
  const form = document.querySelector(selector);
  form.reset()
};

const readFormData = (selector) => {
  const form = document.querySelector(selector);
  const formData = new FormData(form);
  const body = new URLSearchParams(formData);
  return body;
};

const addComment = () => {
  const commentsUrl = '/api/get-comments';
  const addCommentsUrl = '/guest-book/add-comment';
  const body = readFormData('#add-comments');

  xhrPost(addCommentsUrl, (xhr) => {
    if (xhr.status !== 201) return;
    displayComments(commentsUrl);
    resetForm('#add-comments');
  }, body.toString());

  return;
};
