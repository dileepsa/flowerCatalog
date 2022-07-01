const { GuestBook } = require('./guestBook.js');
const fs = require('fs');

const loadGuestBook = (commentsPath, templatePath) => {
  const guestBook = new GuestBook(commentsPath, templatePath, fs.readFileSync, fs.writeFileSync);
  guestBook.load();

  return (request, response, next) => {
    const pathname = request.url.pathname;
    if (pathname.startsWith('/guest-book') || pathname.startsWith('/api')) {
      request.guestBook = guestBook;
    }
    next();
  }
};

module.exports = { loadGuestBook };
