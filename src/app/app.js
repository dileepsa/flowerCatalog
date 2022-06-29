const { serveFileContent } = require('./serveFileContent.js');
const { guestBookRouter } = require('./guestBookHandler.js');
const { loadGuestBook } = require('./loadGuestBookHandler.js');
const { notFoundHandler } = require('./notFoundHandler.js');
const { createRouter } = require("../server/createRouter.js");
const { apiRouter } = require('./apiHandler.js');

const logRequest = (req, res) => {
  console.log(req.method, req.url.pathname);
};

const app = ({ commentsPath, filesPath, templatePath }) => {
  const injectGuestBook = loadGuestBook(commentsPath, templatePath);

  const handlers = [
    logRequest,
    injectGuestBook,
    apiRouter,
    guestBookRouter,
    serveFileContent(filesPath),
    notFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { app };
