const { serveFileContent } = require('./serveFileContent.js');
const { guestBookRouter } = require('./guestBookHandler.js');
const { loadGuestBook } = require('./loadGuestBookHandler.js');
const { notFoundHandler } = require('./notFoundHandler.js');
const { createRouter } = require("../server/createRouter.js");
const { apiRouter } = require('./apiHandler.js');
const { parseSearchParams, logRequest } = require('./parseSearchParamsHandler.js');
const { createAsyncRouter } = require('../server/createAsyncRouter.js');
const { parseBodyParams } = require('./parseBodyParams.js');

const app = ({ commentsPath, templatePath, filesPath }) => {
  const injectGuestBook = loadGuestBook(commentsPath, templatePath);

  const handlers = [
    parseBodyParams,
    parseSearchParams,
    logRequest,
    injectGuestBook,
    guestBookRouter,
    serveFileContent(filesPath),
    notFoundHandler
  ];
  return createAsyncRouter(handlers);
};

module.exports = { app };
