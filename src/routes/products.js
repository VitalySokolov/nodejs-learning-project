const express = require('express');
const { validate } = require('../models/product');

const router = express.Router();

let nextId = 4;
const products = [
  {
    id: 1,
    title: 'Brick',
    amount: 33,
    reviews: [
      { user: 'Admin', note: 'Some review' },
      { user: 'User', note: 'Some review' },
    ],
  },
  {
    id: 2,
    title: 'Window',
    amount: 10,
    reviews: [
      { user: 'Admin', note: 'Some review' },
      { user: 'User', note: 'Some review' },
    ],
  },
  {
    id: 3,
    title: 'Door',
    amount: 2,
    reviews: [
      { user: 'Admin', note: 'Some review' },
      { user: 'User', note: 'Some review' },
    ],
  },
];

router.get('/', (req, res) => {
  res.send(products);
});

router.post('/', (req, res) => {
  const newProduct = req.body;

  const { error } = validate(newProduct);

  if (error) {
    console.log(error.details);
    return res.status(400).send(`Product is not valid - ${error.details[0].message}`);
  }

  const product = {
    id: nextId,
    title: newProduct.title,
    amount: newProduct.amount,
    reviews: newProduct.reviews || [],
  };
  products.push(product);
  nextId += 1;

  return res.status(201).send(product);
});

router.get('/:id', (req, res) => {
  const product = products.find((item) => item.id === parseInt(req.params.id, 10));

  if (!product) {
    return res.status(404).send('The product with the given ID was not found.');
  }

  return res.status(200).send(product);
});

router.get('/:id/reviews', (req, res) => {
  const product = products.find((item) => item.id === parseInt(req.params.id, 10));

  if (!product) {
    return res.status(404).send('The product with the given ID was not found.');
  }

  return res.status(200).send(product.reviews);
});

module.exports = router;
