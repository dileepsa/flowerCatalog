const { createApp } = require('./src/app/fcApp.js');

const startApp = (PORT) => {
  const appConfig = {
    commentsPath: process.argv[2] || './data/comments.json',
    filesPath: './public',
    usersPath: './data/users.json'
  }

  const app = createApp(appConfig);
  app.listen(PORT, () => console.log(`listening to ${PORT}`));
};

startApp(8585);
