const logRequest = (req, res, next) => {
  console.log(req.method, req.url.pathname);
  next();
};

module.exports = { logRequest };
