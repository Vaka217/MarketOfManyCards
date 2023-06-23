const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../database/connection");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  profilePic: {
    type: DataTypes.STRING, // DataTypes.TEXT si es una URL
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
});

User.prototype.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
