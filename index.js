const { app } = require('./src/app/app.js');
const { server } = require('./src/server/server.js');

const startApp = () => {
  const commentsPath = process.argv[2] || './data/comments.json';
  const readFilesFrom = './public';

  server(8585, app(commentsPath, readFilesFrom));
};

startApp();
