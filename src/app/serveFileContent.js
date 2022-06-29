const { readFiles } = require('./readFiles.js');
const fs = require('fs');
const path = require('path');

const fileTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.html': 'text/html',
  '.png': 'image/jpeg',
  '.pdf': 'application/pdf'
};

const determineContentTyee = fileName => {
  const extension = path.extname(fileName);
  return fileTypes[extension] || 'text/plain';
};

const serveFileContent = (PATH = './public') => {
  const fileContents = readFiles(PATH);

  return (request, response) => {
    let { pathname } = request.url;
    let fileName = PATH + pathname;

    if (pathname === '/') {
      fileName = PATH + '/html/homePage.html';
    }

    if (!fs.existsSync(fileName)) {
      return false;
    }

    response.setHeader('content-type', determineContentTyee(fileName));
    const content = fileContents[fileName];
    response.end(content);
    return true;
  }
};

module.exports = { serveFileContent };
