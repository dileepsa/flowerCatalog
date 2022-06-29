const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.end('Not found');
  return true;
}

module.exports = { notFoundHandler };
