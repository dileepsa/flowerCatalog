const { createServer } = require('http');

const server = (PORT, handlers) => {
  const server = createServer((req, res) => {
    req.url = new URL(req.url, `http://${req.headers.host}`);
    console.log(req.method, req.url.pathname);
    handlers(req, res);
  });

  server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
};

module.exports = { server };
