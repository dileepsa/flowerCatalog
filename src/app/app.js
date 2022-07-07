const { serveFileContent } = require('./serveFileContent.js');
const { guestBookRouter } = require('./guestBookHandler.js');
const { loadGuestBook } = require('./loadGuestBookHandler.js');
const { notFoundHandler } = require('./notFoundHandler.js');
const { parseSearchParams } = require('./parseSearchParamsHandler.js');
const { createAsyncRouter } = require('../server/createAsyncRouter.js');
const { parseBodyParams } = require('./parseBodyParams.js');
const { logRequest } = require('./logRequest.js');
const { createLoginHandler } = require('./loginHandler.js');
const { injectCookies } = require('./injectCookies');
const { injectSession } = require('./injectSession.js');
const { authenticationHandler } = require('./authenticationHandler.js');
const { logoutHandler } = require('./logoutHandler.js');

const app = ({ commentsPath, templatePath, filesPath }) => {
  const injectGuestBook = loadGuestBook(commentsPath, templatePath);
  const sessions = {};

  const handlers = [
    logRequest,
    parseSearchParams,
    parseBodyParams,
    injectCookies,
    injectSession(sessions),
    createLoginHandler(sessions),
    authenticationHandler,
    logoutHandler,
    injectGuestBook,
    guestBookRouter,
    serveFileContent(filesPath),
    notFoundHandler
  ];
  return createAsyncRouter(handlers);
}

module.exports = { app };
