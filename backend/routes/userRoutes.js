const express = require("express");
const fs = require('fs');
const router = express.Router();
const User = require("../models/User");
const Sale = require("../models/Sale");
const auctionController = require("../controllers/auctionController");
const Auction = require("../models/Auction");
const Card = require("../models/Card");

// Ruta para obtener todos los usuarios
router.get("/searchusers", async (req, res) => {
  try {
    const users = await User.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

// Ruta para obtener un usuario por su ID
router.get("/searchuser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

// Ruta para crear un usuario
router.post("/createuser/", async (req, res) => {
  const { nickname, email, contact } = req.body;

  // Validación de datos
  if (!nickname || !email || !contact) {
    return res
      .status(400)
      .json({ error: "Por favor, completa todos los campos obligatorios" });
  }

  // Verificar formato de correo electrónico válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Por favor, ingresa un correo electrónico válido" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    // Verificar si el nickname ya está en uso
    const existingNickname = await User.findOne({ where: { nickname } });
    if (existingNickname) {
      return res.status(409).json({ error: "El nickname ya está en uso" });
    }

    const newUser = await User.create({
      nickname,
      email,
      contact,
      created_at: new Date(),
    });
    return res.json(newUser);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error al crear el usuario" });
  }
});

// Ruta para actualizar un usuario por su ID
router.put("/updateuser", async (req, res) => {
  const { nickname, email, contact, id , imageData} = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.id = id;
      user.nickname = nickname;
      user.email = email;
      user.contact = contact;
      user.profilePic = imageData;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

// Ruta para eliminar un usuario por su ID
router.delete("/deleteuser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

// Ruta para crear una venta para un usuario
// router.post('/createsales/:id/', async (req, res) => {
//   const { id } = req.params;
//   const { price, description, quantity } = req.body;

//   // Validación de datos
//   if (!price || !description || !quantity) {
//     return res.status(400).json({ error: 'Por favor, completa todos los campos obligatorios' });
//   }

//   try {
//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ error: 'Usuario no encontrado' });
//     }

//     const sale = await Sale.create({
//       price,
//       description,
//       quantity,
//       created_at: new Date(),
//       status: 'pending',
//       seller_id: id,
//       condition,
//     });

//     return res.json(sale);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Ha ocurrido un error al crear la venta' });
//   }
// });
router.post("/createsales", async (req, res) => {
  const { price, description, quantity, cardData, condition, userId } =
    req.body;

  // Validación de datos
  if (!price || !description || !quantity || !cardData || !condition) {
    return res
      .status(400)
      .json({ error: "Por favor, completa todos los campos obligatorios" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Extrae los valores necesarios del objeto
    const { id, name, type, image, manaCost, text, set } = JSON.parse(cardData);

    // Busca la instancia de la carta en la base de datos
    let cardInstance = await Card.findOne({ where: { card_id: id } });

    if (!cardInstance) {
      // Si la carta no existe, crea una nueva instancia
      const createdCard = await Card.create({
        card_id: id,
        name: name,
        set: set,
        mana_cost: manaCost,
        type: type,
        text: text,
        card_image: image,
      });

      // Asigna la nueva instancia de la carta al objeto cardInstance
      cardInstance = createdCard;
    }

    // Busca dentro del usuario
    const userProfile = await User.findOne({
      where: { id: userId },
      attributes: ["nickname", "profilePic"],
    });

    // Crea una nueva venta en la base de datos
    const sale = await Sale.create({
      price: price,
      description: description,
      quantity: quantity,
      status: "pending",
      seller_id: userId,
      card_id: cardInstance.card_id,
      condition: condition,
    });

    const response = {
      sale: sale,
      user: {
        nickname: userProfile.nickname,
        profilePic: userProfile.profilePic,
      },
      card: {
        name: cardInstance.name,
        image: cardInstance.card_image,
      },
    };
    //console.log(cardInstance.card_id)
    //console.log(carddata)
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error al crear la venta" });
  }
});

// Ruta para obtener todas las ventas
router.get("/searchsales", async (req, res) => {
  try {
    const sales = await Sale.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
    });

    const response = await Promise.all(
      sales.map(async (sale) => {
        const { seller_id, card_id } = sale;

        // busca dentro de user
        const userProfile = await User.findOne({
          where: { id: seller_id },
          attributes: ["nickname", "profilePic"],
        });

        // busca dentro de cards
        const card = await Card.findByPk(card_id, {
          attributes: ["name", "card_image"],
        });

        return {
          sale,
          user: {
            nickname: userProfile.nickname,
            profilePic: userProfile.profilePic,
          },
          card: {
            name: card.name,
            image: card.card_image,
          },
        };
      })
    );

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
});

// Ruta para obtener todas las auction
router.get("/searchauctions", async (req, res) => {
  try {
    const auction = await Auction.findAll({
      limit: 10, // 10 ventas
      order: [["createdAt", "DESC"]], // Ordenar por fecha de creación
    });
    res.json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
});

// Ruta para obtener las ventas de un usuario
router.get("/searchsales/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const sales = await Sale.findAll({
      where: { seller_id: id },
      include: [
        { model: User, attributes: ["nickname", "profilePic"] },
        { model: Card, attributes: ["name", "card_image"] },
      ],
      limit: 10,
      order: [["createdAt", "DESC"]],
    });

    const response = sales.map((sale) => {
      const { User: userProfile, Card: card } = sale;

      return {
        sale,
        user: {
          nickname: userProfile.nickname,
          profilePic: userProfile.profilePic,
        },
        card: {
          name: card.name,
          image: card.card_image,
        },
      };
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ventas del usuario" });
  }
});

// Ruta para obtener las ventas de una carta específica
router.get("/searchsalesbycard/:cardId", async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByPk(cardId);
    if (!card) {
      return res.status(404).json({ error: "Carta no encontrada" });
    }

    const sales = await Sale.findAll({
      where: { card_id: cardId },
      include: [{ model: User, attributes: ["nickname", "profilePic"] }],
      limit: 10,
      order: [["createdAt", "DESC"]],
    });

    const response = sales.map((sale) => {
      const { User: userProfile } = sale;

      return {
        sale,
        user: {
          nickname: userProfile.nickname,
          profilePic: userProfile.profilePic,
        },
        card: {
          name: card.name,
          image: card.card_image,
        },
      };
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ventas de la carta" });
  }
});

// Ruta para obtener las Auction de un usuario
router.get("/searchauction/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: Auction,
      limit: 10, // 10 ventas
      order: [["createdAt", "DESC"]], // Ordenado por fecha de creación
    });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const sales = user.Sales;
    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ventas del usuario" });
  }
});

// modo cartas
//obtener todas las cartas
router.get("/searchcards", async (req, res) => {
  try {
    const cards = await Card.findAll();
    res.json(cards);
  } catch (error) {
    console.error("Error al obtener las cartas:", error);
    res.status(500).json({ error: "Error al obtener las cartas" });
  }
});

module.exports = router;

// Modo subasta
// Ruta para crear una subasta para un usuario
router.post("/createauction", auctionController.createAuction);
router.post("/makebid", auctionController.makeBid);
router.get("/searchwinners", auctionController.auctionWinners);


module.exports = router;
