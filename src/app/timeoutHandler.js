const timeoutHandler = (req, res, next) => {
  if (req.url === '/timeout') {
    setTimeout(() => {
      res.end('After 5 sec timeout');
    }, 5000);
    return;
  }
  next();
};

module.exports = { timeoutHandler };
