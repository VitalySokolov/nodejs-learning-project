const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { City } = require('./city');
const { Product } = require('./product');
const { User } = require('./user');

mongoose.connect('mongodb://localhost/learningProject')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const addCity = async (data) => {
  const city = new City({
    name: data.name,
    country: data.country,
    capital: data.capital,
    location: data.location,
    lastModifiedDate: new Date('2019-01-23'),
  });

  await city.save();
};

const cities = [
  { name: 'Brest', country: 'Belarus', capital: false, location: { lat: 52.097621, long: 23.734050 } },
  { name: 'Minsk', country: 'Belarus', capital: true, location: { lat: 53.093321, long: 24.734050 } },
  { name: 'Prague', country: 'Czechia', capital: true, location: { lat: 54.091621, long: 25.731050 } },
  { name: 'Pilsen', country: 'Czechia', capital: false, location: { lat: 55.092621, long: 26.732050 } },
  { name: 'Berlin', country: 'Germany', capital: true, location: { lat: 56.093621, long: 27.733050 } },
  { name: 'Hamburg', country: 'Germany', capital: false, location: { lat: 57.193621, long: 28.933050 } },
];

/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const populateCities = async () => {
  for (const city of cities) {
    await addCity(city);
  }
};

const products = [
  {
    title: 'Brick',
    amount: 33,
    reviews: [
      { user: 'Admin', note: 'Some review' },
      { user: 'User', note: 'Some review' },
    ],
  },
  {
    title: 'Window',
    amount: 10,
    reviews: [
      { user: 'Admin', note: 'Some review' },
      { user: 'User', note: 'Some review' },
    ],
  },
  {
    title: 'Door',
    amount: 2,
    reviews: [
      { user: 'Admin', note: 'Some review' },
      { user: 'User', note: 'Some review' },
    ],
  },
];

const addProduct = async (data) => {
  const product = new Product({
    title: data.title,
    amount: data.amount,
    reviews: data.reviews || [],
    lastModifiedDate: new Date('2019-01-23'),
  });

  await product.save();
};

const populateProducts = async () => {
  for (const product of products) {
    await addProduct(product);
  }
};

const users = [
  { name: 'Admin', email: 'admin@test.com', password: 'Password', isAdmin: true },
  { name: 'Power User', email: 'power.user@test.com', password: 'Password' },
  { name: 'User', email: 'user@test.com', password: 'Password' },
];

const addUser = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(data.password, salt);

  const user = new User({
    name: data.name,
    email: data.email,
    password,
    isAdmin: data.isAdmin || false,
  });

  await user.save();
};

const populateUsers = async () => {
  for (const user of users) {
    await addUser(user);
  }
};
/* eslint-enable no-await-in-loop */
/* eslint-enable no-restricted-syntax */

populateCities()
  .then(() => populateProducts())
  .then(() => populateUsers())
  .then(() => process.exit(0));
