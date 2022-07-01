const { serveFileContent } = require('./serveFileContent.js');
const { guestBookRouter } = require('./guestBookHandler.js');
const { loadGuestBook } = require('./loadGuestBookHandler.js');
const { notFoundHandler } = require('./notFoundHandler.js');
const { createRouter } = require("../server/createRouter.js");
const { apiRouter } = require('./apiHandler.js');
const { parseSearchParams, logRequest } = require('./parseSearchParamsHandler.js');
const { timeoutHandler } = require('./timeoutHandler.js');
const { createAsyncRouter } = require('../server/createAsyncRouter.js');

const app = ({ commentsPath, filesPath, templatePath }) => {
  const injectGuestBook = loadGuestBook(commentsPath, templatePath);

  const handlers = [
    parseSearchParams,
    logRequest,
    injectGuestBook,
    apiRouter,
    guestBookRouter,
    serveFileContent(filesPath),
    notFoundHandler
  ];

  return createRouter(handlers);
};

const asyncApp = () => {
  const handlers = [timeoutHandler, notFoundHandler];
  return createAsyncRouter(handlers);
};

module.exports = { app, asyncApp };
