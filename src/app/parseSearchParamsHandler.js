const getEntries = (searchParams) => {
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
  req.url.queryParams = getEntries(req.url.searchParams);
  next();
};

module.exports = { parseSearchParams, getEntries };
