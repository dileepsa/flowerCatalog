const { createServer } = require('net');
const { onConnection } = require('./src/server.js');
const { serveFileContent } = require('./src/serveFileContent.js');
const { guestBookHandler } = require('./src/guestBookHandler.js');
const { GuestBook } = require('./src/guestBook.js');
const fs = require('fs');

const handle = (handlers, PATH) => {
  return (request, response) => {
    return handlers.some((handler) => handler(request, response, PATH));
  }
};

const loadComments = (path) => {
  const content = fs.readFileSync(path, 'utf-8');
  return JSON.parse(content);
};

const readFile = (path) => {
  const content = fs.readFileSync(path, 'utf-8');
  return content;
};

const loadGuestBook = (commentsPath, templatePath) => {
  const comments = loadComments(commentsPath) || [];
  const template = readFile(templatePath);
  const guestBook = new GuestBook(comments, template);

  return (request, response) => {
    request.guestBook = guestBook;
    request.commentsPath = commentsPath;
    return false;
  }
};

const startServer = (PORT, handlers) => {
  const server = createServer((socket) => onConnection(socket, handlers));
  server.listen(PORT, () => console.log(`Server is listening to ${PORT}`));
};

const main = () => {
  const PATH = process.argv[2];
  const commentsPath = './data/comments.json';
  const templatePath = './public/html/guestBook.html';
  const handlers = [loadGuestBook(commentsPath, templatePath), serveFileContent(PATH), guestBookHandler];
  startServer(8585, handle(handlers));
}

main();