const loginPage = `<html>
<head>
  <title>Login</title>
</head>
<body>
  <h1>Flower catalog Login</h1>
  <form action="/login" method="post">
    <label for="username">
      <input type="text" name="username" placeholder="Enter username">
      <input type="password" name="password" placeholder="Enter Password">
    </label>
    <input type="submit" name="submit">
  </form>
  <a href="/signup">signup</a>
</body>
</html>`;

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
      res.setHeader('content-type', 'text/html');
      res.end(loginPage);
      return;
    }

    if (method === 'POST') {
      if (!validate(users, req.bodyParams)) {
        res.end('User doesn\'t exists');
        return;
      }

      const session = createSession(req, res);
      sessions[session.id] = session;
      res.setHeader('Set-cookie', `id=${session.id}`);
    }

    res.statusCode = 302;
    res.setHeader('Location', '/homePage.html');
    res.end();
    return;
  };
};

module.exports = { createLoginHandler };
