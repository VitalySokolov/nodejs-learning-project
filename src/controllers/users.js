const { User } = require('../models');

module.exports = {
  async list(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'isAdmin'],
    });

    return res.status(200).send(users);
  },

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).send({
        message: 'The user with the given ID was not found.',
      });
    }

    await user.destroy();
    return res.status(204).send();
  },

  async retrieve(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).send({
        message: 'The user with the given ID was not found.',
      });
    }

    console.log(User.email);

    return res.status(200).send(user);
  },
};
