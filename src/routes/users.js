const express = require('express');
const { getAllUsers } = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
  res.send(getAllUsers());
});

module.exports = router;
