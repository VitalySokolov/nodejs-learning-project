const Joi = require('joi');

const validateProduct = (product) => {
  const schema = {
    id: Joi.number().integer().positive(),
    title: Joi.string().required(),
    amount: Joi.number().integer().positive().required(),
    reviews: Joi.array().items({
      user: Joi.string().required(),
      note: Joi.string().required()
    })
  };

  return Joi.validate(product, schema);
};

exports.validate = validateProduct;
