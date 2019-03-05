const Joi = require('joi');

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

const getAllProducts = () => [...products];

const getProductById = (id) => products.find((item) => item.id === parseInt(id, 10));

const addProduct = (product) => {
  const newProduct = {
    id: nextId,
    title: product.title,
    amount: product.amount,
    reviews: product.reviews || [],
  };
  products.push(newProduct);
  nextId += 1;

  return newProduct;
};

const validateProduct = (product) => {
  const schema = {
    id: Joi.number().integer().positive(),
    title: Joi.string().required(),
    amount: Joi.number().integer().positive().required(),
    reviews: Joi.array().items({
      user: Joi.string().required(),
      note: Joi.string().required(),
    }),
  };

  return Joi.validate(product, schema);
};

exports.validate = validateProduct;
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.addProduct = addProduct;
