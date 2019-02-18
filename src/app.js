const bodyParser = require('body-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const auth = require('./routes/auth');
const users = require('./routes/users');
const products = require('./routes/products');
const cookieParser = require('./middlewares/cookieParser');
const queryParser = require('./middlewares/queryParser');
const authentication = require('./middlewares/auth');

const app = express();
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser);
app.use(queryParser);

app.use(bodyParser.json());
app.use('/api/auth', auth);
app.use('/api/users', authentication, users);
app.use('/api/products', authentication, products);

app.use((req, res, next) => {
  if (req.url === '/') {
    res.render('index');
  } else {
    next();
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// Error handler
// Disable eslint as all args are required.
/* eslint no-unused-vars: ["error", { "args": "none" }] */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
