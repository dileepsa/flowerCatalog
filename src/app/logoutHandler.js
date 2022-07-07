const logoutHandler = (sessions) => {
  return (req, res, next) => {
    const pathname = req.url.pathname;
    if (pathname === '/logout') {
      const { id } = req.cookies;
      delete sessions[id];
      res.setHeader('Set-cookie', 'id=0;Max-Age=0');
      res.statusCode = 302;
      res.setHeader('Location', '/login');
      res.end();
      return;
    }
    next();
  };
}

module.exports = { logoutHandler };
