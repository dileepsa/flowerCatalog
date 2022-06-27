const fs = require('fs');

const storeComments = (path, content) => {
  fs.writeFileSync(path, JSON.stringify(content), 'utf-8');
};

const formatComments = (comments) => {
  return comments.map(record => {
    const { name, comment, date } = record;
    return [name, comment, date].join('  ');
  }).join('\n\n');
};

const commentsHandler = (request, response) => {
  const { comments, uri, queryParams } = request;
  const { name, comment } = queryParams;
  const date = new Date();

  response.setHeader('conetent-type', 'text/plain');

  comments.push({ name, date, comment });
  storeComments(request.commentsPath, comments);
  response.send(formatComments(comments));

  return true;
};

const guestBookHandler = (request, response) => {
  const { uri } = request;

  if (uri === '/guestbook') {
    return commentsHandler(request, response);
  }

  return false;
};

module.exports = { guestBookHandler };