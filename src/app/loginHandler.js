const createSession = (req, res) => {
  const id = new Date().getTime().toString();
  const time = new Date().getTime();
  const { username } = req.bodyParams;
  const session = { id, username, time };
  return session;
};

const validateCredentials = (existingUser, userDetails) => {
  const { username, password } = userDetails;
  return existingUser.username === username && existingUser.password === password;
};

const validate = (users, user) => {
  const { username } = user;
  const existingUser = users[username];
  if (!existingUser) {
    return;
  }
  return validateCredentials(existingUser, user);
}

const createLoginHandler = (sessions) => {
  return (req, res, next) => {
    const pathname = req.url.pathname;
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
      if (!validate(users, req.bodyParams)) {
        res.statusCode = 401;
        res.end('User doesn\'t exists');
        return;
      }

      const session = createSession(req, res);
      sessions[session.id] = session;
      res.setHeader('Set-cookie', `id=${session.id}`);
    }

    res.statusCode = 302;
    res.setHeader('Location', '/guest-book');
    res.end();
    return;
  };
};

module.exports = { createLoginHandler };
