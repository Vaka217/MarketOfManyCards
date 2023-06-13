const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./User');
const Card = require('./Card');

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  description: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
  seller_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  card_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Card,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Sale, { foreignKey: 'seller_id' });
Sale.belongsTo(User, { foreignKey: 'seller_id' });
Card.hasMany(Sale, { foreignKey: 'card_id' });
Sale.belongsTo(Card, { foreignKey: 'card_id' });

module.exports = Sale;