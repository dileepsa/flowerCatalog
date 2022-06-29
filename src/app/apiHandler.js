const serveComments = (req, res) => {
  res.end(JSON.stringify(req.guestBook.getComments()));
  return true;
};

const apiRouter = (req, res) => {
  const { url, method } = req;
  const { pathname } = url;

  if (pathname === '/api/get-comments') {
    res.setHeader('content-type', 'application/json');
    return serveComments(req, res);
  }
}

module.exports = { apiRouter };
