const querystring = require('querystring');
const url = require('url');

module.exports = (req, res, next) => {
  const { query } = url.parse(req.url);
  res.parsedQuery = query && querystring.parse(query);

  next();
};
