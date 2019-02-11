const express = require('express');

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

  const product = {
    id: nextId,
    title: newProduct.title || 'Default title',
    amount: parseInt(newProduct.amount, 10) || 0,
    reviews: [],
  };
  products.push(product);
  nextId += 1;

  res.send(product);
});

router.get('/:id', (req, res) => {
  const product = products.find((item) => item.id === parseInt(req.params.id, 10));

  if (!product) {
    return res.status(404).send('The product with the given ID was not found.');
  }

  res.send(product);
});

router.get('/:id/reviews', (req, res) => {
  const product = products.find((item) => item.id === parseInt(req.params.id, 10));

  if (!product) {
    return res.status(404).send('The product with the given ID was not found.');
  }

  res.send(product.reviews);
});

module.exports = router;
