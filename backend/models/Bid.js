const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./User');
const Auction = require('./Auction');

const Bid = sequelize.define('Bid', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  auction_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Auction,
      key: 'id',
    },
  },
  bidder_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
});

Auction.hasMany(Bid, { foreignKey: 'auction_id' });
Bid.belongsTo(Auction, { foreignKey: 'auction_id' });
User.hasMany(Bid, { foreignKey: 'bidder_id' });
Bid.belongsTo(User, { foreignKey: 'bidder_id' });

module.exports = Bid;