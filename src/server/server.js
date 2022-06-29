const { createServer } = require('http');

const startServer = (PORT, handler) => {
  const server = createServer((req, res) => {
    req.url = new URL(req.url, `http://${req.headers.host}`);
    handler(req, res);
  });

  server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
};

module.exports = { startServer };
