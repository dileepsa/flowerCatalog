const guestBookParams = (searchParams) => {
  const params = {};
  const entries = searchParams.entries();

  for (const entry of entries) {
    const [field, value] = entry;
    params[field] = value;
  }

  return params;
};

const addCommentsHandler = (request, response) => {
  const { guestBook, url } = request;
  const { name, comment } = guestBookParams(url.searchParams);
  const date = new Date();

  guestBook.addComment({ name, date, comment });
  const comments = guestBook.getComments();
  request.storeComments(comments);

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

const guestBookHandler = (request, response) => {
  const { url, method } = request;
  const { pathname } = url;

  if (pathname === '/guest-book' && method === 'GET') {
    return homePageHandler(request, response);
  }

  if (pathname === '/add-comment' && method === 'GET') {
    return addCommentsHandler(request, response);
  }

  return false;
};

module.exports = { guestBookHandler };
