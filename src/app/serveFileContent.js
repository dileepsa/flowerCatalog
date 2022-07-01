const fs = require('fs');
const path = require('path');

const fileTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.html': 'text/html',
  '.png': 'image/jpeg',
  '.pdf': 'application/pdf'
};

const determineContentType = fileName => {
  const extension = path.extname(fileName);
  return fileTypes[extension] || 'text/plain';
};

const serveFileContent = (PATH = './public') => {

  return (request, response, next) => {
    let { pathname } = request.url;
    let fileName = PATH + pathname;
    if (pathname === '/') {
      fileName = PATH + '/homePage.html';
    }

    if (!fs.existsSync(fileName)) {
      next();
      return;
    }

    fs.readFile(fileName, (err, data) => {
      response.setHeader('content-type', determineContentType(fileName));
      response.end(data);
    })
  }
};

module.exports = { serveFileContent };
