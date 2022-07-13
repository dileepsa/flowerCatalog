const createSignUpHandler = (req, res, next) => {
  const pathname = req.url.pathname;
  if (pathname !== '/signup') {
    next();
    return;
  }

  const { method, bodyParams, users } = req;

  if (method === 'GET') {
    res.statusCode = 302;
    res.setHeader('location', '/signup.html');
    res.end();
    return;
  }

  if (method === 'POST') {
    const { username, password } = bodyParams;
    users[username] = { username, password };
    req.storeUsers(users);
    res.statusCode = 201;
    res.end();
    return;
  }
  next();
};

module.exports = { createSignUpHandler };
