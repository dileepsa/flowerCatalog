const { createServer } = require('net');
const { onConnection } = require('./src/server.js');
const { serveFileContent } = require('./src/serveFileContent.js');
const { guestBookHandler } = require('./src/guestBookHandler.js');
const { loadGuestBook } = require('./src/loadCommentsHandler.js');

const handle = (handlers, PATH) => {
  return (request, response) => {
    return handlers.some((handler) => handler(request, response, PATH));
  }
};

const startServer = (PORT, handlers) => {
  const server = createServer((socket) => onConnection(socket, handlers));
  server.listen(PORT, () => console.log(`Server is listening to ${PORT}`));
};

const main = () => {
  const PATH = process.argv[2];
  const commentsPath = './data/comments.json';
  const templatePath = './src/guestBookTemplate.html';
  const handlers = [
    loadGuestBook(commentsPath, templatePath),
    serveFileContent(PATH),
    guestBookHandler
  ];
  startServer(8585, handle(handlers));
}

main();
