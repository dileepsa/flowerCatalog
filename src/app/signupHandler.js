const signupPage = `<html>
<head><title>Signup</title></head>
<body>
  <form action="/signup" method="post">
    <input type="text" name="username"  placeholder="Enter your name">
    <input type="password" name="password"  placeholder="Enter your password">
    <input type="submit" name="signup">
  </form>
</body>
</html>`

const createSignUpHandler = (users) => {
  return (req, res, next) => {
    const pathname = req.url.pathname;
    if (pathname !== '/signup') {
      next();
      return;
    }

    const { method, bodyParams } = req;
    if (method === 'GET') {
      res.setHeader('content-type', 'text/html');
      res.end(signupPage);
      return;
    }
    if (method === 'POST') {
      const { username, password } = bodyParams;
      users[username] = { username, password };
      res.statusCode = 302;
      res.setHeader('Location', '/login');
      res.end();
      return;
    }
    next();
  }
};

module.exports = { createSignUpHandler };
