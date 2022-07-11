const signupPage = `<html>
<head><title>Signup</title></head>
<body>
  <h1>Signup</h1>
  <form action="/signup" method="post">
    <input type="text" name="username"  placeholder="Enter your name">
    <input type="password" name="password"  placeholder="Enter your password">
    <input type="submit" name="signup">
  </form>
</body>
</html>`

const createSignUpHandler = () => {
  return (req, res, next) => {
    const pathname = req.url.pathname;
    if (pathname !== '/signup') {
      next();
      return;
    }

    const { method, bodyParams, users } = req;

    if (method === 'GET') {
      res.setHeader('content-type', 'text/html');
      res.end(signupPage);
      return;
    }

    if (method === 'POST') {
      const { username, password } = bodyParams;
      users[username] = { username, password };
      req.storeUsers(users);
      res.statusCode = 302;
      res.setHeader('Location', '/login');
      res.end();
      return;
    }
    next();
  }
};

module.exports = { createSignUpHandler };
