const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./User');
const Auction = require('./Auction');

const Bid = sequelize.define('Bid', {
  auction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      onDelete: 'CASCADE',
      model: Auction,
      key: 'id',
    },
  },
  bidder_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      onDelete: 'CASCADE',
      model: User,
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    primaryKey: true,
  },
});

Auction.hasMany(Bid, { foreignKey: 'auction_id' });
Bid.belongsTo(Auction, { foreignKey: 'auction_id' });
User.hasMany(Bid, { foreignKey: 'bidder_id' });
Bid.belongsTo(User, { foreignKey: 'bidder_id' });

module.exports = Bid;