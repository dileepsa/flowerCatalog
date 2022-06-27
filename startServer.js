const { createServer } = require('net');
const { onConnection } = require('./src/server.js');

const handle = (handlers, PATH) => {
  return (request, response) => {
    return handlers.some((handler) => handler(request, response, PATH));
  }
};

const startServer = (PORT, handlers) => {
  const server = createServer((socket) => onConnection(socket, handlers));
  server.listen(PORT, () => console.log(`Server is listening to ${PORT}`));
};

const handlers = [
  x => x
]

startServer(8585, handle(handlers));