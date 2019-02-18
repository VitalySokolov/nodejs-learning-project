const express = require('express');
const jwt = require('jsonwebtoken');
const { validateAuth, getUserByEmail } = require('../models/user');

const router = express.Router();

router.post('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { error } = validateAuth(req.body);
  if (error) {
    const response = {
      code: 400,
      message: 'Request is not valid',
      data: error.details[0].message,
    };
    return res.status(400).send(response);
  }

  const user = getUserByEmail(req.body.email);
  if (!user || user.password !== req.body.password) {
    const response = {
      code: 404,
      message: 'Not found',
      data: 'Invalid email or password',
    };
    return res.status(404).send(response);
  }

  const token = jwt.sign({ id: user.id }, 'jwtPrivateKey');
  const response = {
    code: 200,
    message: 'OK',
    data: {
      email: user.email,
      username: user.name,
    },
    token,
  };
  return res.status(200).send(JSON.stringify(response));
});

module.exports = router;
