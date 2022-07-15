const { createHash } = require('crypto');

const createSha1 = (text) => {
  const sha1 = createHash('sha1');
  sha1.update(text);
  return sha1.digest('hex');
};

const createSession = (req, res) => {
  const id = new Date().getTime().toString();
  const time = new Date().getTime();
  const { username } = req.body;
  const session = { id, username, time };
  return session;
};

const validateCredentials = (existingUser, userDetails) => {
  const { username, password } = userDetails;
  return existingUser.username === username && existingUser.password === createSha1(password);
};

const validate = (users, user) => {

  const { username } = user;
  const existingUser = users[username];
  if (!existingUser) {
    return;
  }
  return validateCredentials(existingUser, user);
};

const createLoginHandler = (sessions) => {
  return (req, res, next) => {
    const pathname = req.url;
    if (pathname !== '/login') {
      next();
      return;
    }

    const { method, session, users } = req;

    if (method === 'GET' && !session) {
      res.statusCode = 302;
      res.setHeader('Location', 'login.html');
      res.end();
      return;
    }

    if (method === 'POST') {
      if (!validate(users, req.body)) {
        res.statusCode = 401;
        res.end('User doesn\'t exists');
        return;
      }

      const session = createSession(req, res);
      sessions[session.id] = session;
      res.setHeader('Set-cookie', `id=${session.id}`);
    }

    res.statusCode = 200;
    res.end();
    return;
  };
};

module.exports = { createLoginHandler };
