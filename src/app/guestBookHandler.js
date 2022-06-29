const addCommentsHandler = (request, response) => {
  const { guestBook, queryParams } = request;
  const { name, comment } = queryParams;
  const date = new Date();


  guestBook.addComment({ name, date, comment });
  const comments = guestBook.getComments();
  request.storeComments(comments);

  response.statusCode = 302;
  response.setHeader('location', '/guest-book');
  response.send('');

  return true;
};

const homePageHandler = (request, response) => {
  response.setHeader('content-type', 'text/html');
  response.send(request.guestBook.toHtml());
  return true;
};

const guestBookHandler = (request, response) => {
  const { uri } = request;

  if (uri === '/guest-book') {
    return homePageHandler(request, response);
  }

  if (uri === '/add-comment') {
    return addCommentsHandler(request, response);
  }

  return false;
};

module.exports = { guestBookHandler };