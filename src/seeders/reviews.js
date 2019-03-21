module.exports = {
  up: (queryInterface) => {
    const date = new Date();

    return queryInterface.bulkInsert('Reviews', [
      {
        user: 'Admin',
        note: 'Some review',
        productId: 1,
        createdAt: date,
        updatedAt: date,
      },
      {
        user: 'User',
        note: 'Some review',
        productId: 1,
        createdAt: date,
        updatedAt: date,
      },
      {
        user: 'Admin',
        note: 'Some review',
        productId: 2,
        createdAt: date,
        updatedAt: date,
      },
      {
        user: 'User',
        note: 'Some review',
        productId: 2,
        createdAt: date,
        updatedAt: date,
      },
      {
        user: 'User',
        note: 'Some review',
        productId: 3,
        createdAt: date,
        updatedAt: date,
      },
    ], {});
  },

  down: (queryInterface) => queryInterface.bulkDelete('Reviews', null, {}),
};
