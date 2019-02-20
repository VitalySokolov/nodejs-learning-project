const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { validateAuth, getUserByEmail } = require('../models/user');

const router = express.Router();

router.post('/', (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) {
    const response = {
      code: 400,
      message: 'Request is not valid',
      data: error.details[0].message,
    };
    return res.status(400).json(response);
  }

  const user = getUserByEmail(req.body.email);
  if (!user || user.password !== req.body.password) {
    const response = {
      code: 404,
      message: 'Not found',
      data: 'Invalid email or password',
    };
    return res.status(404).json(response);
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY);
  const response = {
    code: 200,
    message: 'OK',
    data: {
      email: user.email,
      username: user.name,
    },
    token,
  };
  return res.status(200).json(JSON.stringify(response));
});

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: 'Not found',
        data: info.message,
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

      const token = jwt.sign(user, process.env.JWT_PRIVATE_KEY);
      return res.json({ user, token });
    });
  })(req, res);
});

router.get('/facebook/login', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Facebook login - success');
    res.redirect('/');
  });

router.get('/google/login', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Google login - success');
    res.redirect('/');
  });

router.get('/twitter/login', passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/',
  }));

module.exports = router;
