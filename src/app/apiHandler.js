const serveComments = (req, res) => {
  res.end(JSON.stringify(req.guestBook.getComments()));
  return true;
};

const serveCommentsByName = (req, res) => {
  const guestBook = req.guestBook.getComments();
  const { username } = req.params;
  const comments = guestBook.filter(record => record.username === username);

  res.json(comments);
  return true;
};

module.exports = { serveComments, serveCommentsByName };
