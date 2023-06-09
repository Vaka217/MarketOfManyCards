const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const User = require("./User");
const Card = require("./Card");

// Sale model
const Sale = sequelize.define("Sale", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
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
  seller_id: {
    type: DataTypes.INTEGER,
    references: {
      onDelete: 'CASCADE',
      model: User,
      key: "id",
    },
  },
  card_id: {
    type: DataTypes.STRING,
    references: {
      model: Card,
      key: "card_id",
      onDelete: 'CASCADE',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Sale, { foreignKey: "seller_id" });
Sale.belongsTo(User, { foreignKey: "seller_id" });
Sale.belongsTo(Card, { foreignKey: "card_id", onDelete: 'CASCADE' });

module.exports = Sale;
