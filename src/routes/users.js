const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().select('-password');
  res.send(users);
});

module.exports = router;
