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
const { createSignUpHandler } = require('./signupHandler.js');
const { apiRouter } = require('./apiHandler.js');
const { loadUsers } = require('./loadUsers.js');

const createApp = ({ commentsPath = '', templatePath = '', filesPath = './public', usersPath = '' }, sessions = {}) => {
  const injectGuestBook = loadGuestBook(commentsPath, templatePath);

  const handlers = [
    parseSearchParams,
    parseBodyParams,
    loadUsers(usersPath),
    createSignUpHandler,
    injectCookies,
    injectSession(sessions),
    createLoginHandler(sessions),
    authenticationHandler,
    logoutHandler(sessions),
    injectGuestBook,
    apiRouter,
    guestBookRouter,
    serveFileContent(filesPath),
    notFoundHandler
  ];
  return createAsyncRouter(handlers);
};

module.exports = { createApp };
