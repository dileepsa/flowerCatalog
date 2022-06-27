const fs = require('fs');

const readFiles = (PATH) => {
  let files = fs.readdirSync(PATH);
  let fileContents = {};

  files.forEach((file) => {
    const fileName = PATH + '/' + file;
    if (fs.statSync(fileName).isDirectory()) {
      fileContents = { ...fileContents, ...readFiles(fileName) }
      return;
    }

    const content = fs.readFileSync(fileName);
    fileContents[fileName] = content;
  })

  return fileContents;
};

module.exports = { readFiles };
