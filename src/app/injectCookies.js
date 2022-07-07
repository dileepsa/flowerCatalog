const parseCookies = (cookiesStr) => {
  const cookies = {};
  if (!cookiesStr) {
    return cookies;
  }
  const cookiesList = cookiesStr.split(';');
  cookiesList.forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookies[name.trim()] = value.trim();
  })
  return cookies;
};

const injectCookies = (req, res, next) => {
  const cookies = parseCookies(req.headers.cookie);
  req.cookies = cookies;
  next();
};

module.exports = { injectCookies };
