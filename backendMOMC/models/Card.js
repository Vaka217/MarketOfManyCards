const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Set = require('./Set');

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  set_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Set,
      key: 'id',
    },
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
    type: DataTypes.STRING,
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
});

Set.hasMany(Card, { foreignKey: 'set_id' });
Card.belongsTo(Set, { foreignKey: 'set_id' });

module.exports = Card;