const parseQueryParams = (queryStr) => {
  const queryParams = {};
  if (!queryStr) {
    return queryParams;
  }
  const params = queryStr.split('&');

  params.forEach((paramStr) => {
    const [param, value] = paramStr.split('=');
    queryParams[param] = value;
  })

  return queryParams;
};

const parseUri = rawUri => {
  const [uri, queryStr] = rawUri.split('?');
  const queryParams = parseQueryParams(queryStr);
  return { uri, queryParams };
};

const parseRequestLine = (line) => {
  const [method, rawUri, httpVersion] = line.split(' ');
  const uri = parseUri(rawUri);
  return { method, ...uri, httpVersion };
};

const parseHeader = (line) => {
  const separatorIndex = line.indexOf(':');
  const name = line.slice(0, separatorIndex);
  const value = line.slice(separatorIndex + 1);
  return [name.toLowerCase(), value];
};

const parseHeaders = (lines) => {
  let index = 0;
  const headers = {};
  while (index < lines.length && lines[index].length > 0) {
    const [name, value] = parseHeader(lines[index]);
    headers[name] = value;
    index++;
  }
  return headers;
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\r\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { ...requestLine, ...headers };
};

module.exports = { parseRequest, parseHeader, parseHeaders, parseRequestLine };
