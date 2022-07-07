const authenticationHandler = (req, res, next) => {
  if (!req.session) {
    res.statusCode = 302;
    res.setHeader('Location', '/login');
    res.end();
    return;
  }
  next();
};

module.exports = { authenticationHandler };
