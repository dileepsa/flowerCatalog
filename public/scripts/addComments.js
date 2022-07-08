const displayComments = (comments) => {
  const { username, date, comment } = comments;
  const commentsElement = document.querySelector('#comments');
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
  commentsElement.prepend(commentRow);
  return;
};

const addComment = () => {
  const xhr = new XMLHttpRequest();
  const form = document.querySelector('#add-comments');
  const formData = new FormData(form);
  const body = new URLSearchParams(formData);

  xhr.onload = () => {
    displayComments(JSON.parse(xhr.response));
    form.reset();
  };

  xhr.open('POST', '/guest-book/add-comment');
  xhr.send(body.toString());
  return;
}
