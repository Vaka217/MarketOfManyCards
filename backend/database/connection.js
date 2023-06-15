// database/connection.js
const { Sequelize } = require('sequelize');

// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize('cardmarket', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
});

module.exports = sequelize;
