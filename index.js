const { app, asyncApp } = require('./src/app/app.js');
const { startServer } = require('./src/server/server.js');

const startApp = (PORT) => {
  const appConfig = {
    commentsPath: process.argv[2] || './data/comments.json',
    filesPath: './public',
    templatePath: './templates/guestBookTemplate.html'
  }

  startServer(PORT, asyncApp(appConfig));
};

startApp(8585);
