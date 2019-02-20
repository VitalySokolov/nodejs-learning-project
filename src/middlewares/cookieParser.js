module.exports = (req, res, next) => {
  const cookieString = req.headers.cookie;
  const cookies = {};

  if (cookieString) {
    cookieString.split(';')
      .forEach((cookie) => {
        const parts = cookie.split('=');
        cookies[parts.shift().trim()] = parts.shift().trim();
      });
  }

  res.parsedCookies = cookies;

  next();
};
