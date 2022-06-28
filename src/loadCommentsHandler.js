const { GuestBook } = require('./guestBook.js');
const fs = require('fs');

const loadComments = (path) => {
  const content = fs.readFileSync(path, 'utf-8');
  return JSON.parse(content);
};

const readFile = (path) => {
  const content = fs.readFileSync(path, 'utf-8');
  return content;
};

const storeComments = (path,) => {
  return (content) =>
    fs.writeFileSync(path, JSON.stringify(content), 'utf-8');
};

const loadGuestBook = (commentsPath, templatePath) => {
  const comments = loadComments(commentsPath) || [];
  const template = readFile(templatePath);
  const guestBook = new GuestBook(comments, template);

  return (request, response) => {
    request.guestBook = guestBook;
    request.storeComments = storeComments(commentsPath);
    return false;
  }
};

module.exports = { loadGuestBook };
