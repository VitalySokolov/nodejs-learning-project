const Joi = require('joi');
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  note: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  }
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  reviews: {
    type: [reviewSchema],
    default: undefined,
  },
  lastModifiedDate: {
    type: Date,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

const validateProduct = (product) => {
  const schema = {
    title: Joi.string().min(2).max(50).required(),
    amount: Joi.number().integer().positive().required(),
    reviews: Joi.array().items({
      user: Joi.string().required(),
      note: Joi.string().required(),
    }),
  };

  return Joi.validate(product, schema);
};

exports.Product = Product;
exports.validateProduct = validateProduct;
