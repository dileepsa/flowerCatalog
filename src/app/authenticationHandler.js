const authenticationHandler = (req, res, next) => {
  if (req.url.pathname.startsWith('/guest-book') && !req.session) {
    res.statusCode = 302;
    res.setHeader('Location', '/login');
    res.end();
    return;
  }
  next();
};

module.exports = { authenticationHandler };
