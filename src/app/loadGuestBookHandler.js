const { GuestBook } = require('./guestBook.js');
const fs = require('fs');

const loadGuestBook = (commentsPath) => {
  const guestBook = new GuestBook(commentsPath, fs.readFileSync, fs.writeFileSync);
  return (request, response, next) => {
    const pathname = request.url;
    if (pathname.startsWith('/guest-book') || pathname.startsWith('/api')) {
      guestBook.load();
      request.guestBook = guestBook;
    }
    next();
  }
};

module.exports = { loadGuestBook };
