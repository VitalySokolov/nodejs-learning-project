const Joi = require('joi');
const bcrypt = require('bcryptjs');
const express = require('express');

// const { User } = require('../models/user');
const { User } = require('../models');

const router = express.Router();

const validate = (user) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
};

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    const response = {
      code: 400,
      message: 'Request is not valid',
      data: error.details[0].message,
    };
    return res.status(400).json(response);
  }

  const invalidUserOrPasswordResponse = {
    code: 400,
    message: 'Invalid email or password',
  };

  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(400).json(invalidUserOrPasswordResponse);

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json(invalidUserOrPasswordResponse);

  const token = user.generateAuthToken();
  const response = {
    code: 200,
    message: 'OK',
    data: {
      email: user.email,
      username: user.name,
    },
    token,
  };
  return res.json(response);
});

module.exports = router;
