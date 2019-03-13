const express = require('express');
const { Product, validateProduct } = require('../models/product');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.post('/', async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) {
    return res.status(400).send(`Product is not valid - ${error.details[0].message}`);
  }

  let product = new Product({
    title: req.body.title,
    amount: req.body.amount,
    reviews: req.body.reviews || [],
    lastModifiedDate: Date().now(),
  });

  product = await product.save();
  return res.status(201).send(product);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).send('The product with the given ID was not found.');
  }

  return res.send(product);
});

router.get('/:id/reviews', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).send('The product with the given ID was not found.');
  }

  return res.send(product.reviews);
});

router.put('/:id', async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) {
    return res.status(400).send(`Product is not valid - ${error.details[0].message}`);
  }

  const product = await Product.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      amount: req.body.amount,
      reviews: req.body.reviews || [],
      lastModifiedDate: Date().now(),
    },
    { new: true });

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  return res.send(product);
});

router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  return res.send(product);
});

module.exports = router;
