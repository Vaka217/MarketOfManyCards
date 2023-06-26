const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Card = sequelize.define('Card', {
  card_id: {
    type: DataTypes.INTEGER,
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
  cmc: {
    type: DataTypes.FLOAT,
  },
  type: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING(500),
  },
  flavor_text: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.STRING,
  },
  power: {
    type: DataTypes.STRING,
  },
  toughness: {
    type: DataTypes.STRING,
  },
  loyalty: {
    type: DataTypes.STRING,
  },
  multiverse_ID: {
    type: DataTypes.INTEGER,
  },
  card_image: {
    type: DataTypes.STRING,
  },
});


module.exports = Card;