const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      async set(val) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(val, salt);
        this.setDataValue('password', password);
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  User.prototype.generateAuthToken = function () {
    const token = jwt.sign({ id: this.id, isAdmin: this.isAdmin }, process.env.JWT_PRIVATE_KEY);
    return token;
  };
  return User;
};
