const { getEntries } = require("./parseSearchParamsHandler");

const parseBodyParams = (req, res, next) => {
  if (!req.method === 'POST') {
    next();
    return;
  }

  let data = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    data += chunk;
  })

  req.on('end', () => {
    const bodyParams = new URLSearchParams(data);
    req.bodyParams = getEntries(bodyParams);
    next();
  })
};

module.exports = { parseBodyParams };
