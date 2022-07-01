const logRequest = (req, res, next) => {
  console.log(req.method, req.url.pathname);
  next();
};

const parseParams = (searchParams) => {
  const params = {};
  const entries = searchParams.entries();

  for (const entry of entries) {
    const [field, value] = entry;
    params[field] = value;
  }
  return params;
};

const parseSearchParams = (req, res, next) => {
  req.url = new URL(req.url, `http://${req.headers.host}`);
  req.url.queryParams = parseParams(req.url.searchParams);
  req.bodyParams = parseParams(req.bodyParams);
  next();
};

module.exports = { parseSearchParams, logRequest };
