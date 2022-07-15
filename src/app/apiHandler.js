const serveComments = (req, res) => {
  res.end(JSON.stringify(req.guestBook.getComments()));
  return true;
};

const serveCommentsByName = (req, res) => {
  const guestBook = req.guestBook.getComments();
  const name = req.url.queryParams.name;

  const comments = guestBook.filter(record => record.name === name);
  res.end(JSON.stringify(comments));
  return true;
};

const apiRouter = (req, res, next) => {
  const { url, query } = req;

  if (url === '/api/get-comments' && query.name) {
    res.setHeader('content-type', 'application/json');
    return serveCommentsByName(req, res);
  }

  if (url === '/api/get-comments') {
    res.setHeader('content-type', 'application/json');
    return serveComments(req, res);
  }
  next();
};

module.exports = { apiRouter };
