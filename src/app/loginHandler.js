const loginPage = `<html>
<head>
  <title>Login</title>
</head>
<body>
  <h1>Flower catalog Login</h1>
  <form action="/login" method="post">
    <label for="username">
      <input type="text" name="username" placeholder="Enter username">
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

const createLoginHandler = (sessions) => {
  return (req, res, next) => {
    const pathname = req.url.pathname;
    if (pathname !== '/login') {
      next();
      return;
    }

    const { method, session } = req;

    if (method === 'GET' && !session) {
      res.setHeader('content-type', 'text/html');
      res.end(loginPage);
      return;
    }

    if (method === 'POST') {
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
