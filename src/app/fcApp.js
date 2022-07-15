const express = require('express');
const { logRequest } = require('./logRequest.js');
const { serveComments, serveCommentsByName } = require('./apiHandler.js');
const { loadGuestBook } = require('./loadGuestBookHandler.js');
const { addCommentHandler, homePageHandler } = require('./guestBookHandler.js');
const { createLoginHandler } = require('./loginHandler.js');
const { injectCookies } = require('./injectCookies.js');
const { injectSession } = require('./injectSession.js');
const { createSignUpHandler } = require('./signupHandler.js');
const { loadUsers } = require('./loadUsers.js');
const { authenticationHandler } = require('./authenticationHandler.js');
const { logoutHandler } = require('./logoutHandler.js');

const createApp = ({ usersPath, filesPath, commentsPath }, sessions = {}) => {
  const injectGuestBook = loadGuestBook(commentsPath);
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(logRequest);
  app.use(loadUsers(usersPath));
  app.get('/signup', createSignUpHandler);
  app.post('/signup', createSignUpHandler);
  app.use(injectCookies);
  app.use(injectSession(sessions));

  app.get('/login', createLoginHandler(sessions));
  app.post('/login', createLoginHandler(sessions));
  app.use(authenticationHandler);
  app.get('/logout', logoutHandler(sessions));
  app.use(injectGuestBook);

  const apiRouter = express.Router();
  app.use('/api', apiRouter);
  apiRouter.get('/get-comments', serveComments);
  apiRouter.get('/get-comments/:username', serveCommentsByName);

  const guestBookRouter = express.Router();
  app.use('/guest-book', guestBookRouter);
  guestBookRouter.get('/', homePageHandler);
  guestBookRouter.post('/add-comment', addCommentHandler);

  app.use(express.static('./public'));

  return app;
}

module.exports = { createApp };
