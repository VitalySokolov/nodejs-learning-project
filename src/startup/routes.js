require('express-async-errors');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const cookieParser = require('../middlewares/cookieParser');
const queryParser = require('../middlewares/queryParser');
const error = require('../middlewares/error');
const passport = require('../config/passport');
const auth = require('../routes/auth');
const users = require('../routes/users');
const products = require('../routes/products');
const cities = require('../routes/cities');
const authentication = require('../middlewares/auth');

module.exports = (app) => {
  app.use(cookieParser);
  app.use(queryParser);
  app.use(passport.initialize());
  app.use(bodyParser.json());
  app.use('/api/auth', auth);
  // app.use('/api/users', authentication, users);
  // app.use('/api/products', authentication, products);
  // app.use('/api/cities', authentication, cities);
  app.use('/api/users', users);
  app.use('/api/products',  products);
  app.use('/api/cities',  cities);

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
  app.use(error);
};
