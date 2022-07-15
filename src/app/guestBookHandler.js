const addCommentHandler = (request, response) => {
  const { guestBook, body, session } = request;
  const { username } = session;
  const { comment } = body;
  const date = new Date().toLocaleString();
  const data = { username, date, comment };
  guestBook.addComment(data);
  const comments = guestBook.getComments();
  guestBook.store(comments);

  response.statusCode = 201;
  response.end();

  return true;
};

const homePageHandler = (request, response) => {
  response.setHeader('content-type', 'text/html');
  response.end(request.guestBook.toHtml(request.session.username));
  return true;
};

const serveComments = (request, response) => {
  response.end(JSON.stringify(request.guestBook.getComments()));
  return true;
};

module.exports = { addCommentHandler, homePageHandler };
