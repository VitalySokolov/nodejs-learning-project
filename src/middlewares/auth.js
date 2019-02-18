const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.setHeader('Content-Type', 'application/json');
    const response = {
      code: 401,
      message: 'Access denied.',
    };
    res.status(401).send(response);
    return;
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    next();
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    const response = {
      code: 400,
      message: 'Invalid token.',
    };
    res.status(400).send(response);
  }
};
