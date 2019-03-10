const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./startup/routes')(app);
require('./startup/db')();

module.exports = app;
