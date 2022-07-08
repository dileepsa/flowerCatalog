const { serveFileContent } = require('./serveFileContent.js');
const { notFoundHandler } = require('./notFoundHandler.js');
const { createAsyncRouter } = require('server');
const { parseSearchParams } = require('./parseSearchParamsHandler.js');

const xhrApp = ({ filesPath }) => {
  const handlers = [
    parseSearchParams,
    serveFileContent(filesPath),
    notFoundHandler,
  ]
  return createAsyncRouter(handlers);
}

module.exports = { xhrApp };
