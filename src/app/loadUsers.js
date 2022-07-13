const fs = require('fs');

const storeUsers = (path, users) => {
  fs.writeFileSync(path, JSON.stringify(users), 'utf-8');
};

const loadUsers = (path) => {
  return (req, res, next) => {
    const { pathname } = req.url;
    if (pathname === '/login' || pathname === '/signup') {
      const users = fs.readFileSync(path, 'utf-8');
      req.users = JSON.parse(users);
      req.storeUsers = (users) => storeUsers(path, users);
    }
    next();
  }
};

module.exports = { loadUsers };
