module.exports = {
  up: (queryInterface) => {
    const date = new Date();

    return queryInterface.bulkInsert('Products', [
      {
        title: 'Brick',
        amount: 33,
        createdAt: date,
        updatedAt: date,
      },
      {
        title: 'Window',
        amount: 10,
        createdAt: date,
        updatedAt: date,
      },
      {
        title: 'Door',
        amount: 2,
        createdAt: date,
        updatedAt: date,
      },
    ], {});
  },

  down: (queryInterface) => queryInterface.bulkDelete('Products', null, {}),
};
