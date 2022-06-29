const { serveFileContent } = require('./serveFileContent.js');
const { guestBookHandler } = require('./guestBookHandler.js');
const { loadGuestBook } = require('./loadGuestBookHandler.js');
const { notFoundHandler } = require('./notFoundHandler.js');
const { createRouter } = require("../server/createRouter.js");

const app = (commentsPath, filesPath) => {
  const templatePath = './templates/guestBookTemplate.html';

  const handlers = [
    loadGuestBook(commentsPath, templatePath),
    serveFileContent(filesPath),
    guestBookHandler,
    notFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { app };
