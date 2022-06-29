const { serveFileContent } = require('./serveFileContent.js');
const { guestBookHandler } = require('./guestBookHandler.js');
const { loadGuestBook } = require('./loadGuestBookHandler.js');
const { notFoundHandler } = require('./notFoundHandler.js');
const { createRouter } = require("../server/createRouter.js");

const app = (directory) => {
  const commentsPath = './data/comments.json';
  const templatePath = './src/app/guestBookTemplate.html';

  const handlers = [
    loadGuestBook(commentsPath, templatePath),
    serveFileContent(directory),
    guestBookHandler,
    notFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { app };
