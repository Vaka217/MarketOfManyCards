const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./User');
const Sale = require('./Sale');
const Auction = require('./Auction');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  comment: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });
Sale.hasMany(Comment, { foreignKey: 'sales_id' });
Comment.belongsTo(Sale, { foreignKey: 'sales_id' });
Auction.hasMany(Comment, { foreignKey: 'auction_id' });
Comment.belongsTo(Auction, { foreignKey: 'auction_id' });

module.exports = Comment;