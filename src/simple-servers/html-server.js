const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');
const through2 = require('through2');

const port = process.env.PORT || 3000;

const _replaceMessage = (text, message) => text.replace('{message}', message);

const _getMessageFromQuery = (request) => {
  const { query } = url.parse(request.url);
  return querystring.parse(query).message || 'Message was not provided';
};

http.createServer((req, res) => {
  const message = _getMessageFromQuery(req);
  const htmlStream = new fs.ReadStream(path.join(__dirname, 'index.html'));

  res.setHeader('Content-Type', 'text/html');

  htmlStream
    .pipe(through2((data, enc, cb) => {
      const htmlString = data.toString();
      const resultHtml = _replaceMessage(htmlString, message);
      cb(null, Buffer.from(resultHtml));
    }))
    .pipe(res);
}).listen(port, () => {
  console.log(`Server start at port ${port}`);
});
