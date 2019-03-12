const express = require('express');
const { City, validate } = require('../models/city');

const router = express.Router();

router.get('/', async (req, res) => {
  const cities = await City.find().sort('name');
  res.send(cities);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(`City data is not valid - ${error.details[0].message}`);
  }

  let city = new City({
    name: req.body.name,
    country: req.body.country,
    capital: req.body.capital || false,
    location: req.body.location,
    lastModifiedDate: Date().now(),
  });
  city = await city.save();

  return res.status(201).send(city);
});

router.get('/:id', async (req, res) => {
  const city = await City.findById(req.params.id);

  if (!city) {
    return res.status(404).send('The city with the given ID was not found.');
  }

  return res.send(city);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(`City data is not valid - ${error.details[0].message}`);
  }

  const city = await City.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      country: req.body.country,
      capital: req.body.capital || false,
      location: req.body.location,
      lastModifiedDate: Date().now(),
    },
    { new: true });

  if (!city) return res.status(404).send('The city with the given ID was not found.');

  res.send(city);
});

router.delete('/:id', async (req, res) => {
  const city = await City.findByIdAndRemove(req.params.id);

  if (!city) return res.status(404).send('The city with the given ID was not found.');

  res.send(city);
});

module.exports = router;
