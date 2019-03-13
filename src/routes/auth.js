const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');

const { User } = require('../models/user');

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

  const user = await User.findOne({ email: req.body.email });
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

/* eslint-disable consistent-return */
router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (!user) {
      return res.status(400).json({
        code: 400,
        message: info.message,
      });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        return res.status(400).json({
          code: 400,
          message: 'Request is not valid',
          data: err.message,
        });
      }

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
  })(req, res);
});
/* eslint-enable consistent-return */

router.get('/facebook/login', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/google/login', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/twitter/login', passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/',
  }));

module.exports = router;
