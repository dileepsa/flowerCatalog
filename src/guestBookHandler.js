const fs = require('fs');

const storeComments = (path, content) => {
  fs.writeFileSync(path, JSON.stringify(content), 'utf-8');
}

const commentsHandler = (request, response) => {
  const { comments, uri, queryParams } = request;
  const { name, comment } = queryParams;
  const date = new Date();

  comments.push({ name, date, comment });
  storeComments(request.commentsPath, comments);
  response.send(`${name} comment has been stored`);

  return true;
}

const guestBookHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/guestbook') {
    commentsHandler(request, response);
  }

  return false;
};

module.exports = { guestBookHandler };