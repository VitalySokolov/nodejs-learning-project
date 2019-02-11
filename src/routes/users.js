const express = require('express');
const router = express.Router();

const users = [
  {id: 1, name: 'Admin', email: 'admin@test.com'},
  {id: 2, name: 'Power User', email: 'power.user@test.com'},
  {id: 3, name: 'User', email: 'user@test.com'}
];

router.get('/', async (req, res) => {
  res.send(users);
});

module.exports = router;
