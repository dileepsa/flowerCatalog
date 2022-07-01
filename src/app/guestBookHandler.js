const addCommentHandler = (request, response) => {
  const { guestBook, bodyParams } = request;
  const { name, comment } = bodyParams;
  const date = new Date().toLocaleString();

  guestBook.addComment({ name, date, comment });
  const comments = guestBook.getComments();
  guestBook.store(comments);

  response.statusCode = 302;
  response.setHeader('location', '/guest-book');
  response.end('');

  return true;
};

const homePageHandler = (request, response) => {
  response.setHeader('content-type', 'text/html');
  response.end(request.guestBook.toHtml());
  return true;
};

const serveComments = (request, response) => {
  response.end(JSON.stringify(request.guestBook.getComments()));
  return true;
};

const guestBookRouter = (request, response, next) => {
  const { url, method } = request;
  const { pathname } = url;

  if (pathname === '/guest-book' && method === 'GET') {
    return homePageHandler(request, response);
  }

  if (pathname === '/guest-book/add-comment' && method === 'POST') {
    return addCommentHandler(request, response);
  }

  if (pathname === '/api/get-comments') {
    response.setHeader('content-type', 'application/json');
    return serveComments(request, response);
  }

  next();
};

module.exports = { guestBookRouter };
