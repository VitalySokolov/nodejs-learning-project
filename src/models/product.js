module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Products', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Product.associate = function (models) {
    Product.hasMany(models.Reviews, {
      foreignKey: 'productId',
      as: 'reviews',
    });
  };
  return Product;
};
