const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Set = sequelize.define('Set', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  code: {
    type: DataTypes.STRING,
  },
  release_Date: {
    type: DataTypes.DATE,
  },
  set_Type: {
    type: DataTypes.STRING,
  },
});

module.exports = Set;