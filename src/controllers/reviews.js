const { Reviews } = require('../models');

module.exports = {
  async create(req, res) {
    const review = await Reviews.create({
      user: req.body.user,
      note: req.body.note,
      productId: req.params.id,
    });

    return res.status(201).send(review);
  },

  async list(req, res) {
    const reviews = await Reviews.findAll({
      where: {
        productId: req.params.id,
      },
    });

    console.log(`Reviews = ${JSON.stringify(reviews, undefined, 2)}`);

    return res.status(200).send(reviews);
  },
};
