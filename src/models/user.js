const Joi = require('joi');

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

exports.validate = validateUser;
exports.validateAuth = validateUserAuth;
