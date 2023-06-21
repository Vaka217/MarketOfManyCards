// database/connection.js
const { Sequelize } = require('sequelize');

// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_ROOT_PASSWORD, {
  host: 'db',
  dialect: 'mysql',
});

module.exports = sequelize;