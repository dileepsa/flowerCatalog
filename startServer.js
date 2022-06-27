const { createServer } = require('net');
const { onConnection } = require('./src/server.js');
const fs = require('fs');
const { serveFileContent } = require('./src/serveFileContent.js');


const handle = (handlers, PATH) => {
  return (request, response) => {
    return handlers.some((handler) => handler(request, response, PATH));
  }
};

const startServer = (PORT, handlers) => {
  const server = createServer((socket) => onConnection(socket, handlers));
  server.listen(PORT, () => console.log(`Server is listening to ${PORT}`));
};

const PATH = process.argv[2];
const handlers = [serveFileContent(PATH)]

startServer(8585, handle(handlers));