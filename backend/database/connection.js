// database/connection.js
const { Sequelize } = require('sequelize');

// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

module.exports = sequelize;
