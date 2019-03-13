const express = require('express');
const { User } = require('../models/user');
const admin = require('../middlewares/admin');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().select('-password');
  res.send(users);
});

router.delete('/:id', admin, async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  return res.send(user);
});

module.exports = router;
