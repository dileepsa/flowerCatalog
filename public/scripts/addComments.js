const createTd = data => {
  const td = document.createElement('td');
  td.innerHTML = data;
  return td;
}

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

const xhrGet = (path, callBack, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status <= 299) {
      callBack(xhr);
    }
    return;
  }

  xhr.open('GET', path);
  xhr.send(body);
};

const xhrPost = (path, callBack, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status <= 299) {
      callBack(xhr);
    }
  }

  xhr.open('POST', path);
  xhr.send(body);
};

const displayComments = (url) => {
  xhrGet(url, (xhr) => {
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
    displayComments(commentsUrl);
    resetForm('#add-comments');
  }, body.toString());

  return;
};
