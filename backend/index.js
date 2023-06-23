const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/connection");
const User = require("./models/User");
const Auction = require("./models/Auction");
const Bid = require("./models/Bid");
const Sale = require("./models/Sale");
const Comment = require("./models/Comment");
const Card = require("./models/Card");
const Set = require("./models/Set");
const Sequelize = require("sequelize");

// Importar las rutas de usuarios
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const { saveCardsFromAPI } = require("./controllers/cardController");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Definir relaciones
User.hasMany(Auction, { foreignKey: "seller_id" });
Auction.belongsTo(User, { foreignKey: "seller_id" });

User.hasMany(Bid, { foreignKey: "bidder_id" });
Bid.belongsTo(User, { foreignKey: "bidder_id" });

User.hasMany(Sale, { foreignKey: "seller_id" });
Sale.belongsTo(User, { foreignKey: "seller_id" });

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

Sale.hasMany(Comment, { foreignKey: "sales_id" });
Comment.belongsTo(Sale, { foreignKey: "sales_id" });

Auction.hasMany(Comment, { foreignKey: "auction_id" });
Comment.belongsTo(Auction, { foreignKey: "auction_id" });

Card.belongsTo(Set, { foreignKey: "set_id" });
Set.hasMany(Card, { foreignKey: "set_id" });

// Sincronizar modelos y luego iniciar la aplicación
sequelize
  .sync()
  .then(async () => {
    console.log("Base de datos sincronizada correctamente.");

    // Guarda las cartas desde la API de Magic
    // try {
    //   await saveCardsFromAPI();
    //   console.log('Cartas guardadas desde la API de Magic: The Gathering.');
    // } catch (error) {
    //   console.error('Error al guardar las cartas desde la API:', error);
    // }
    // Configurar rutas
    // app.use('/users', userRoutes);
    app.use(userRoutes);
    app.use(authRoutes);
    // Agrega aquí las demás rutas de tu aplicación

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor iniciado en el puerto ${port}.`);
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
