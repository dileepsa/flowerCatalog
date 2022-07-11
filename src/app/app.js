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
const fs = require('fs');

const storeUsers = (path, users) => {
  fs.writeFileSync(path, JSON.stringify(users), 'utf-8');
};

const loadUsers = (path) => {
  return (req, res, next) => {
    const { pathname } = req.url;
    if (pathname === '/login' || pathname === '/signup') {
      const users = fs.readFileSync(path, 'utf-8');
      req.users = JSON.parse(users);
      req.storeUsers = (users) => storeUsers(path, users);
    }
    next();
  }
};

const app = ({ commentsPath, templatePath, filesPath, usersPath }) => {
  const injectGuestBook = loadGuestBook(commentsPath, templatePath);
  const sessions = {};
  const users = {};

  const handlers = [
    logRequest,
    parseSearchParams,
    parseBodyParams,
    loadUsers(usersPath),
    createSignUpHandler(users),
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
}

module.exports = { app };
