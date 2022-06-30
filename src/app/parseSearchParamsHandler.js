const logRequest = (req, res) => {
  console.log(req.method, req.url.pathname);
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

const parseSearchParams = (req, res) => {
  req.url = new URL(req.url, `http://${req.headers.host}`);
  req.url.queryParams = parseParams(req.url.searchParams);
  return false;
};

module.exports = { parseSearchParams, logRequest };
