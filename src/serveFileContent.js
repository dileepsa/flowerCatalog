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
    let { uri } = request;
    let fileName = '';

    if (uri === '/') {
      uri = '/html/homePage.html';
    }

    fileName = `${PATH}${uri}`;
    if (!fs.existsSync(fileName)) {
      return false;
    }

    response.setHeader('content-type', determineContentTyee(fileName));
    const content = fileContents[fileName];
    response.send(content);
    return true;
  }
};

module.exports = { serveFileContent };
