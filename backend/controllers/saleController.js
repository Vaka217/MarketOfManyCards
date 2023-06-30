const Sale = require('../models/Sale');
const User = require('../models/User');
const Card = require('../models/Card');
const e = require('express');

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
    const post = await Sale.create({
      price: price,
      description: description,
      quantity: quantity,
      status: "pending",
      seller_id: userId,
      card_id: cardInstance.card_id,
      condition: condition,
    });

    const response = {
      post,
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
  try {
    const post = await Sale.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
    });

    const response = await Promise.all(
      post.map(async (post) => {
        const { seller_id, card_id } = post;

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
          post,
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
};

const searchSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const post = await Sale.findAll({
      where: { seller_id: id },
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    const response = await Promise.all(
      post.map(async (post) => {
        const { seller_id, card_id } = post;

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
          post,
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
};

const searchSaleByCard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByPk(id);
    if (!card) {
      return res.status(404).json({ error: "Carta no encontrada" });
    }
    const post = await Sale.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    const response = await Promise.all(
      post.map(async (post) => {
        const { seller_id, card_id } = post;

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
          post,
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
};
  // Sirve para aumentar/disminuir la cantidad de la venta asi como para eliminarla
const updateSaleQuantity = async (req, res) => {
  const { saleId, quantity } = req.body;

  if (!saleId || quantity === undefined) {
    return res.status(400).json({ error: "Por favor, proporciona el ID de la venta y la cantidad" });
  }

  try {
    const post = await Sale.findByPk(saleId);

    if (!post) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    if (quantity === 0) {
      await post.destroy();
      return res.json({ message: "La venta ha sido eliminada" });
    }

    sale.quantity = quantity;
    await post.save();

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