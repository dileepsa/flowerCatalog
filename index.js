const { createApp } = require('./src/app/app.js');
const { startServer } = require('server');
const { xhrApp } = require('./src/app/xhrApp.js');

const startApp = (PORT) => {
  const appConfig = {
    commentsPath: process.argv[2] || './data/comments.json',
    filesPath: './public',
    templatePath: './templates/guestBookTemplate.html',
    usersPath: './data/users.json'
  }

  startServer(PORT, createApp(appConfig));
};

startApp(8585);
