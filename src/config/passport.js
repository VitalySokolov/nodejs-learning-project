const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const { getUserByEmail } = require('../models/user');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (mail, password, cb) => {
    const user = getUserByEmail(mail);

    if (!user || user.password !== password) {
      return cb(null, false, { message: 'Invalid email or password.' });
    }

    const { id, name, email } = user;
    return cb(null, { id, name, email });
  },
));

passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    done(null, accessToken);
  },
));

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
  },
  (token, tokenSecret, profile, done) => {
    done(null, profile);
  },
));

passport.use(new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/twitter/callback',
  },
  (token, tokenSecret, profile, done) => {
    console.log('Twitter');
    done(null, profile);
  },
));

passport.serializeUser(function(user, cb) {
  console.log(`Serialize. User = ${JSON.stringify(user, undefined, 2)}`);
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  console.log(`DeSerialize. User = ${JSON.stringify(obj, undefined, 2)}`);
  cb(null, obj);
});

module.exports = passport;
