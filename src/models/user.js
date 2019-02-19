const Joi = require('joi');

const users = [
  { id: 1, name: 'Admin', email: 'admin@test.com' },
  { id: 2, name: 'Power User', email: 'power.user@test.com' },
  { id: 3, name: 'User', email: 'user@test.com' },
];

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

const getUserByEmail = (userEmail) => {
  if (validUser.email === userEmail) {
    const { id, name, email } = validUser;
    return { id, name, email };
  }

  return null;
};

const getAllUsers = () => [...users];

exports.validate = validateUser;
exports.validateAuth = validateUserAuth;
exports.getUserByEmail = getUserByEmail;
exports.getAllUsers = getAllUsers;
