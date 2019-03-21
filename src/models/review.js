module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Reviews', {
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Review.associate = function (models) {
    Review.belongsTo(models.Products, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    });
  };
  return Review;
};
