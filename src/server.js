const { parseRequest } = require("./parseRequest.js");
const { Response } = require('./response.js');

const onConnection = (socket, handler) => {
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    console.log(request.method, request.uri);
    const response = new Response(socket);
    handler(request, response);
  })
};

module.exports = { onConnection };
