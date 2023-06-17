const { Sequelize } = require('sequelize');

// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize('cardmarket', 'root', process.env.MYSQL_ROOT_PASSWORD, {
  host: 'db',
  dialect: 'mysql',
});

module.exports = sequelize;
