const Sale = require('../models/Sale');
const User = require('../models/User');
const Card = require('../models/Card');
const { validationResult } = require('express-validator');
const { response } = require('express');

const createSale = async (req, res) => {
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
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error al crear la venta" });
  }
};

const searchSale = async (req, res) => {
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
};

const searchSaleById = async (req, res) => {
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
};

const searchSaleByCard = async (req, res) => {
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
};

// Sirve para aumentar/disminuir la cantidad de la venta asi como para eliminarla
const updateSaleQuantity = async (req, res) => {
  const { saleId, quantity } = req.body;

  if (!saleId || quantity === undefined) {
    return res.status(400).json({ error: "Por favor, proporciona el ID de la venta y la cantidad" });
  }

  try {
    const sale = await Sale.findByPk(saleId);

    if (!sale) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    if (quantity === 0) {
      await sale.destroy();
      return res.json({ message: "La venta ha sido eliminada" });
    }

    sale.quantity = quantity;
    await sale.save();

    return res.json({ message: "La venta ha sido actualizada" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ha ocurrido un error al actualizar la venta" });
  }
};

module.exports = {
    createSale,
    searchSale,
    searchSaleById,
    searchSaleByCard,
    updateSaleQuantity,
  };