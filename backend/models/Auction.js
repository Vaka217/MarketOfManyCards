const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./User');
const Card = require('./Card');

const Auction = sequelize.define('Auction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  actual_bid: {
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
    type: DataTypes.STRING,
    references: {
      model: Card,
      key: 'card_id',
      onDelete: 'CASCADE'
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Auction, { foreignKey: 'seller_id' });
Auction.belongsTo(User, { foreignKey: 'seller_id' });
Card.hasMany(Auction, { foreignKey: 'card_id' });
Auction.belongsTo(Card, { foreignKey: 'card_id' });

module.exports = Auction;
