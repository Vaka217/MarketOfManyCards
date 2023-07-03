const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');


const Card = sequelize.define('Card', {
  card_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  set: {
    type: DataTypes.STRING,
  },
  mana_cost: {
    type: DataTypes.STRING,
  },

  type: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING(500),
  },
  card_image: {
    type: DataTypes.STRING,
  },
});


module.exports = Card;

