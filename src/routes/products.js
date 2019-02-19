const express = require('express');
const products = require('../models/product');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(products.getAllProducts());
});

router.post('/', (req, res) => {
  const newProduct = req.body;

  const { error } = products.validate(newProduct);

  if (error) {
    return res.status(400).send(`Product is not valid - ${error.details[0].message}`);
  }

  const product = products.addProduct(newProduct);

  return res.status(201).send(product);
});

router.get('/:id', (req, res) => {
  const product = products.getProductById(req.params.id);

  if (!product) {
    return res.status(404).send('The product with the given ID was not found.');
  }

  return res.status(200).send(product);
});

router.get('/:id/reviews', (req, res) => {
  const product = products.getProductById(req.params.id);

  if (!product) {
    return res.status(404).send('The product with the given ID was not found.');
  }

  return res.status(200).send(product.reviews);
});

module.exports = router;
