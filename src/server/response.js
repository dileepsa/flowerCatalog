const messages = { 200: 'OK', 404: 'Not found' };
const EOL = '\r\n';

class Response {
  #socket;
  #statusCode;
  #headers;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  write(content) {
    this.#socket.write(content);
  }

  end() {
    this.#socket.end();
  }

  setHeader(name, value) {
    this.#headers[name] = value;
  }

  #sendHeaders() {
    Object.entries(this.#headers).forEach(([name, value]) => {
      this.write(`${name}:${value}${EOL}`);
    })
  }

  #getStatusLine() {
    return `HTTP/1.1 ${this.#statusCode} ${messages[this.#statusCode]}${EOL}`;
  }

  send(content) {
    const statusLine = this.#getStatusLine();
    this.write(statusLine);
    this.#sendHeaders();
    this.write(EOL);
    this.write(content);
    this.end();
  }
};

module.exports = { Response };
