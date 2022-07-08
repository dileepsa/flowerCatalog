const { app } = require('./src/app/app.js');
const { startServer } = require('server');
const { xhrApp } = require('./src/app/xhrApp.js');

const startApp = (PORT) => {
  const appConfig = {
    commentsPath: process.argv[2] || './data/comments.json',
    filesPath: './public',
    templatePath: './templates/guestBookTemplate.html'
  }

  startServer(PORT, app(appConfig));
};

startApp(8585);
