const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');
const through2 = require('through2');

const port = process.env.PORT || 3000;

const _getMessageFromQuery = (request) => {
  const { query } = url.parse(request.url);
  return querystring.parse(query).message || 'Message was not provided';
};

http.createServer()
  .on('request', (req, res) => {
    const { url, method } = req;
    console.log(`Url = ${url}`);
    console.log(`Method = ${method}`);
    if (url === '/echo') {
      res.writeHead(200);
      req
        .pipe(res);
    }
  })
  .listen(port, () => {
    console.log(`Server start at port ${port}`);
  });
