const fs = require('fs');
const { lookup } = require('mime-types');

const serveFileContent = (PATH = './public') => {

  return (request, response, next) => {
    let { pathname } = request.url;
    let fileName = PATH + pathname;
    if (pathname === '/' && request.method === 'GET') {
      fileName = PATH + '/homePage.html';
    }

    if (!fs.existsSync(fileName)) {
      next();
      return;
    }

    fs.readFile(fileName, (err, data) => {
      response.setHeader('content-type', lookup(fileName));
      response.end(data);
    })
  }
};

module.exports = { serveFileContent };
