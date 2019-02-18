const Joi = require('joi');

const validUser = {
  id: '12345abc',
  name: 'Test User',
  email: 'test@test.com',
  password: 'password',
};

const validateUser = (user) => {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  return Joi.validate(user, schema);
};

const validateUserAuth = (user) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  return Joi.validate(user, schema);
};

const getUserByEmail = (email) => {
  if (validUser.email === email) {
    return validUser;
  }

  return null;
};

exports.validate = validateUser;
exports.validateAuth = validateUserAuth;
exports.getUserByEmail = getUserByEmail;
