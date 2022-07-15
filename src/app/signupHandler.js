const { createHash } = require('crypto');

const createSha1 = (text) => {
  const sha1 = createHash('sha1');
  sha1.update(text);
  return sha1.digest('hex');
};

const createSignUpHandler = (req, res, next) => {
  const pathname = req.url;
  if (pathname !== '/signup') {
    next();
    return;
  }

  const { method, body, users } = req;
  if (method === 'GET') {
    res.statusCode = 302;
    res.setHeader('location', '/signup.html');
    res.end();
    return;
  }

  if (method === 'POST') {
    let { username, password } = body;
    password = createSha1(password);
    users[username] = { username, password };
    req.storeUsers(users);
    res.statusCode = 201;
    res.end();
    return;
  }
  next();
};

module.exports = { createSignUpHandler };
