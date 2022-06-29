const { readFiles } = require('./readFiles.js');
const fs = require('fs');
const path = require('path');

const fileTypes = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'html': 'text/html',
  'png': 'image/jpeg',
  'pdf': 'application/pdf'
};

const determineContentTyee = fileName => {
  const extension = path.extname(fileName).slice(1);
  return fileTypes[extension] || 'text/plain';
};

const serveFileContent = (PATH = './public') => {
  const fileContents = readFiles(PATH);

  return (request, response) => {
    let { url } = request;
    let { pathname } = url;
    let fileName = '';

    if (pathname === '/') {
      pathname = '/html/homePage.html';
    }

    fileName = PATH + pathname;
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
