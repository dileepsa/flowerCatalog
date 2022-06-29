const { app } = require('./src/app/app.js');
const { server } = require('./src/server/server.js');

server(8585, app(process.argv[2]));
