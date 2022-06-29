const { serveFileContent } = require('./serveFileContent.js');
const { guestBookHandler } = require('./guestBookHandler.js');
const { loadGuestBook } = require('./loadGuestBookHandler.js');
const { notFoundHandler } = require('./notFoundHandler.js');
const { createRouter } = require("../server/createRouter.js");

const logRequest = (req, res) => {
  console.log(req.method, req.url.pathname);
};

const app = ({ commentsPath, filesPath, templatePath }) => {

  const handlers = [
    logRequest,
    loadGuestBook(commentsPath, templatePath),
    guestBookHandler,
    serveFileContent(filesPath),
    notFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { app };
