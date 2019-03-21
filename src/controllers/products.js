const Joi = require('joi');
const { Products, Reviews } = require('../models');

const validateProduct = (product) => {
  const schema = {
    title: Joi.string().min(2).max(50).required(),
    amount: Joi.number().integer().positive().required(),
  };

  return Joi.validate(product, schema);
};


module.exports = {
  async create(req, res) {
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).send({
        message: `Product is not valid - ${error.details[0].message}`,
      });
    }

    const product = await Products.create({
      title: req.body.title,
      amount: req.body.amount,
    });

    return res.status(201).send(product);
  },

  async list(req, res) {
    const products = await Products.findAll({
      include: [{
        model: Reviews,
        as: 'reviews',
      }],
    });

    return res.status(200).send(products);
  },

  async retrieve(req, res) {
    const product = await Products.findByPk(req.params.id, {
      include: [{
        model: Reviews,
        as: 'reviews',
      }],
    });

    if (!product) {
      return res.status(400).send({
        message: 'The product with the given ID was not found.',
      });
    }

    return res.status(200).send(product);
  },

  async update(req, res) {
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).send({
        message: `Product is not valid - ${error.details[0].message}`,
      });
    }

    let product = await Products.findByPk(req.params.id, {
      include: [{
        model: Reviews,
        as: 'reviews',
      }],
    });

    if (!product) {
      return res.status(400).send({
        message: 'The product with the given ID was not found.',
      });
    }

    product = await product.update({
      title: req.body.title || product.title,
      amount: req.body.amount || product.amount,
    });

    return res.status(200).send(product);
  },

  async delete(req, res) {
    const product = await Products.findByPk(req.params.id, {
      include: [{
        model: Reviews,
        as: 'reviews',
      }],
    });

    if (!product) {
      return res.status(400).send({
        message: 'The product with the given ID was not found.',
      });
    }

    await product.destroy();
    return res.status(204).send();
  },
};
