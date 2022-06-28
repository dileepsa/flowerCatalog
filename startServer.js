const { createServer } = require('net');
const { onConnection } = require('./src/server.js');
const { serveFileContent } = require('./src/serveFileContent.js');
const { guestBookHandler } = require('./src/guestBookHandler.js');
const fs = require('fs');

const handle = (handlers, PATH) => {
  return (request, response) => {
    return handlers.some((handler) => handler(request, response, PATH));
  }
};

const getComments = (commentsPath) => {
  const content = fs.readFileSync(commentsPath, 'utf-8');
  return JSON.parse(content);
}

const setGuestBook = (commentsPath) => {
  const comments = getComments(commentsPath) || [];
  return (request, response) => {
    request.comments = comments;
    request.commentsPath = commentsPath;
    return false;
  }
};

const startServer = (PORT, handlers) => {
  const server = createServer((socket) => onConnection(socket, handlers));
  server.listen(PORT, () => console.log(`Server is listening to ${PORT}`));
};

const PATH = process.argv[2];
const handlers = [setGuestBook('./data/comments.json'), serveFileContent(PATH), guestBookHandler];

startServer(8585, handle(handlers));
