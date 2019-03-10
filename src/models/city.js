const Joi = require('joi');
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  capital: {
    type: Boolean,
    default: false,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
});

const City = mongoose.model('City', citySchema);

function validateCity(city) {
  const schema = {
    name: Joi.string().min(2).max(30).regex(/^[A-Z]/, 'City name should start with capital letter').required(),
    country: Joi.string().min(2).max(30).regex(/^[A-Z]/, 'Country name should start with capital letter').required(),
    capital: Joi.boolean(),
    location: Joi.object({
      lat: Joi.number().required(),
      long: Joi.number().required(),
    }).required(),
  };

  return Joi.validate(city, schema);
}

exports.City = City;
exports.validate = validateCity;
