const http = require('http');
const querystring = require('querystring');
const url = require('url');

const port = process.env.PORT || 3000;

const _getMessageFromQuery = (request) => {
  const { query } = url.parse(request.url);
  return querystring.parse(query).message || '';
};

const help = `Echo server returns body for "POST" requests 
  or "message" query param value for "GET" requests.`;

http.createServer()
  .on('request', (req, res) => {
    const { method } = req;
    switch (method) {
      case 'GET':
        res.end(_getMessageFromQuery(req) || help);
        break;
      case 'POST':
        res.writeHead(200);
        req
          .pipe(res);
        break;
      default:
        res.end(help);
    }
  })
  .listen(port, () => {
    console.log(`Server start at port ${port}`);
  });
