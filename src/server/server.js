const { createServer } = require('http');

const startServer = (PORT, handler) => {
  const server = createServer(handler);

  server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
};

module.exports = { startServer };
