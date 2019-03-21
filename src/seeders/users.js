const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('Password', salt);
    const date = new Date();

    return queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@test.com',
        password,
        isAdmin: true,
        createdAt: date,
        updatedAt: date,
      },
      {
        name: 'Power User',
        email: 'power.user@test.com',
        password,
        isAdmin: false,
        createdAt: date,
        updatedAt: date,
      },
      {
        name: 'User',
        email: 'user@test.com',
        password,
        isAdmin: false,
        createdAt: date,
        updatedAt: date,
      },
    ], {});
  },

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
