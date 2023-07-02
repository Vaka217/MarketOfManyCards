const Auction = require('../models/Auction');
const User = require('../models/User');
const Card = require('../models/Card');
const { validationResult } = require('express-validator');
const Bid = require('../models/Bid');
const { response } = require('express');

const createAuction = async (req, res) => {
  const { actual_bid, description, quantity, cardData, condition, userId } = req.body;

  // Validación de datos
  if (!actual_bid || !description || !quantity || !cardData || !condition) {
    return res
      .status(400)
      .json({ error: "Por favor, completa todos los campos obligatorios" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Validación de fechas
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 7 * 24 * 60 * 60 * 1000);

    startTime.setUTCMinutes(startTime.getUTCMinutes() - 180);
    endTime.setUTCMinutes(endTime.getUTCMinutes() - 180);

    if (startTime >= endTime) {
      return res.status(400).json({ error: 'La fecha de inicio debe ser anterior a la fecha de finalización' });
    }

    // Extrae los valores necesarios del objeto
    const { id, name, type, image, manaCost, text, set, loyalty, cmc, flavor_text, number, power, toughness, multiverse_id } = JSON.parse(cardData);

    // Busca la instancia de la carta en la base de datos
    let cardInstance = await Card.findOne({ where: { card_id: id } });

    if (!cardInstance) {
      // Si la carta no existe, crea una nueva instancia
      const createdCard = await Card.create({
        card_id: id,
        name: name,
        set: set,
        mana_cost: manaCost,
        cmc: cmc,
        type: type,
        text: text,
        flavor_text: flavor_text,
        number: number,
        power: power,
        toughness: toughness,
        loyalty: loyalty,
        multiverse_id: multiverse_id,
        card_image: image,
        
      });

      // Asigna la nueva instancia de la carta al objeto cardInstance
      cardInstance = createdCard;
    }

    // Busca dentro del usuario
    const userProfile = await User.findOne({
      where: { id: userId },
      attributes: ["nickname", "profilePic", "contact"],
    });

    // Crea una nueva venta en la base de datos
    const auction = await Auction.create({
      actual_bid: actual_bid,
      description: description,
      quantity: quantity,
      status: "pending",
      seller_id: userId,
      card_id: cardInstance.card_id,
      condition: condition,
      created_at: startTime,
      start_time: startTime,
      end_time: endTime,
    });
    
    const auctionId = auction.id;

    const bid = await Bid.create({
      auction_id: auctionId,
      bidder_id: userId,
      amount: actual_bid,
    })

    const response = {
      auction: auction,
      user: {
        nickname: userProfile.nickname,
        profilePic: userProfile.profilePic,
        contact: userProfile.contact,
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
      .json({ error: "Ha ocurrido un error al crear la subasta" });
  }
};

const makeBid = async (req, res) => {
  const { auctionId, userId, bidAmount } = req.body;

  // Validación de datos
  if (!auctionId || !userId || !bidAmount) {
    return res.status(400).json({ error: "Por favor, completa todos los campos obligatorios" });
  }

  try {
    // Verificar si la subasta existe
    const auction = await Auction.findByPk(auctionId);
    if (!auction) {
      return res.status(404).json({ error: "Subasta no encontrada" });
    }

    // Verificar si el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Obtener el actual_bid de la subasta
    let actualBid = parseFloat(auction.actual_bid);

    if (parseFloat(bidAmount) <= actualBid) {
      return res.status(400).json({ error: "Su bid debe ser superior al bid actual"})
    }

    await Bid.create({
      auction_id: auctionId,
      bidder_id: userId,
      amount: bidAmount,
    })

    // Actualizar la subasta con el nuevo actual_bid
    auction.actual_bid = bidAmount;
    await auction.save();

    return res.status(200).json({message: "Bid realizada exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ha ocurrido un error al realizar la bid" });
  }
};

const searchAuctionWinners = async (req, res) => {
const {auction_id} = req.body;

// Verificar si la subasta existe
const auction = await Auction.findByPk(auction_id);

if (!auction) {
  return res.status(404).json({ error: "Subasta no encontrada" });
}
const winners = await Bid.findAll({
  attributes: ['bidder_id', 'amount'],
  where: { auction_id: auction_id },
  limit: 3,
  order: [["amount", "DESC"]],
});
const response = {
  bids: winners.map((winner) => ({
    bidder_id: winner.bidder_id,
    amount: winner.amount,
  })),
};
    return res.status(200).json(response);

};

const searchAuctions = async (req, res) => {
  try {
    const post = await Auction.findAll({
      //limit: 10,
      order: [["createdAt", "DESC"]],
    });

    const response = await Promise.all(
      post.map(async (post) => {
        const { seller_id, card_id } = post;

        // busca dentro de user
        const userProfile = await User.findOne({
          where: { id: seller_id },
          attributes: ["nickname", "profilePic", "contact"],
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
            contact: userProfile.contact,
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

const searchAuctionById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const post = await Auction.findAll({
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
          attributes: ["nickname", "profilePic", "contact"],
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
            contact: userProfile.contact,
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
const searchAuctionBycard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByPk(id);
    if (!card) {
      return res.status(404).json({ error: "Carta no encontrada" });
    }
    const post = await Auction.findAll({
      where: {
        card_id: id,
      },
      order: [["createdAt", "DESC"]],
    });
    const response = await Promise.all(
      post.map(async (post) => {
        const { seller_id, card_id } = post;

        // busca dentro de user
        const userProfile = await User.findOne({
          where: { id: seller_id },
          attributes: ["nickname", "profilePic", "contact"],
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
            contact: userProfile.contact,
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

// este es una prueba //
const updateAuction = async (req, res) => {
  const { auctionId, actual_bid, description, quantity, cardData, condition, userId } = req.body;

  // Antes de la validación de datos existente
if (!auctionId || !actual_bid || !description || quantity === undefined || !cardData || !condition) {
  return res.status(400).json({ error: "Por favor, completa todos los campos obligatorios" });
}
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Validación de fechas
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 7 * 24 * 60 * 60 * 1000);

    startTime.setUTCMinutes(startTime.getUTCMinutes() - 180);
    endTime.setUTCMinutes(endTime.getUTCMinutes() - 180);

    if (startTime >= endTime) {
      return res.status(400).json({ error: 'La fecha de inicio debe ser anterior a la fecha de finalización' });
    }

    // Extrae los valores necesarios del objeto
    const { id, name, type, image, manaCost, text, set, loyalty, cmc, flavor_text, number, power, toughness, multiverse_id } = JSON.parse(cardData);

    // Busca la instancia de la carta en la base de datos
    let cardInstance = await Card.findOne({ where: { card_id: id } });

    if (!cardInstance) {
      // Si la carta no existe, crea una nueva instancia
      const createdCard = await Card.create({
        card_id: id,
        name: name,
        set: set,
        mana_cost: manaCost,
        cmc: cmc,
        type: type,
        text: text,
        flavor_text: flavor_text,
        number: number,
        power: power,
        toughness: toughness,
        loyalty: loyalty,
        multiverse_id: multiverse_id,
        card_image: image,
        
      });

      // Asigna la nueva instancia de la carta al objeto cardInstance
      cardInstance = createdCard;
    }

    // Busca dentro del usuario
    const userProfile = await User.findOne({
      where: { id: userId },
      attributes: ["nickname", "profilePic", "contact"],
    });

    // Actualiza la subasta en la base de datos
    const post = await Auction.findByPk(auctionId);
    if (!post) {
      return res.status(404).json({ error: "Subasta no encontrada" });
    }

    post.actual_bid = actual_bid;
    post.description = description;
    post.quantity = quantity;
    post.card_id = cardInstance.card_id;
    post.condition = condition;
    post.start_time = startTime;
    post.end_time = endTime;

    if (quantity === 0) {
      // Eliminar la subasta si la cantidad es 0
      await post.destroy();
      return res.status(200).json({ error: "Subasta eliminada" });
    } else {
      // Guardar los cambios en la subasta
      await post.save();
    }

    // Crea o actualiza la oferta en la base de datos
    let bid = await Bid.findOne({ where: { auction_id: auctionId, bidder_id: userId } });
    if (!bid) {
      bid = await Bid.create({
        auction_id: auctionId,
        bidder_id: userId,
        amount: actual_bid,
      });
    } else {
      bid.amount = actual_bid;
      await bid.save();
    }

    const response = {
      post,
      user: {
        nickname: userProfile.nickname,
        profilePic: userProfile.profilePic,
        contact: userProfile.contact
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
      .json({ error: "Ha ocurrido un error al actualizar la subasta" });
  }
};

// Sirve para aumentar/disminuir la cantidad de la subasta asi como para eliminarla
const updateAuctionQuantity = async (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params;

  if (!id || quantity === undefined) {
    return res.status(400).json({ error: "Por favor, proporciona el ID de la subasta y la cantidad" });
  }

  try {
    const auction = await Auction.findByPk(id);

    if (!auction) {
      return res.status(404).json({ error: "Subasta no encontrada" });
    }

    if (quantity === 0) {
      await auction.destroy();
      return res.json({ message: "La subasta ha sido eliminada" });
    }

    auction.quantity = quantity;
    await auction.save();

    return res.json({ message: "La subasta ha sido actualizada" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ha ocurrido un error al actualizar la subasta" });
  }
};

const deleteAuction = async (req, res) => {
  const { id } = req.params;
  try {
    const auction = await Auction.findByPk(id);

    if (!auction) {
      return res.status(404).json({ error: "Subasta no encontrada" });
    }

    await auction.destroy();
    return res.status(200).json({ message: "La subasta ha sido eliminada exitosamente." });
  } catch (error) {
    return res.status(500).json({ error: "Ha ocurrido un error al eliminar la subasta." });
  }
}

const getUserBids = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const auctionIds = await Bid.findAll({
      attributes: ["auction_id", "amount"],
      where: { bidder_id: id },
      order: [["amount", "DESC"]],
      raw: true,
    });

    const auctionIdsArray = auctionIds.map((bid) => bid.auction_id);

    const auctions = await Auction.findAll({
      where: { id: auctionIdsArray },
      include: [
        {
          model: User,
          attributes: ["nickname", "profilePic", "contact"],
        },
        {
          model: Bid,
          attributes: ["amount"],
          where: { bidder_id: id },
        },
        {
          model: Card,
          attributes: ["name", "card_image"],
        },
      ],
    });

    const response = auctions.map((auction) => {
      const { id, condition, start_time, end_time, actual_bid, description, quantity, created_at, updated_at, User, Card, Bids } = auction;
      const { nickname, profilePic, contact } = User;
      const { name, card_image } = Card;
      const amount = Bids.length > 0 ? Math.max(...Bids.map((bid) => bid.amount)) : null;

      return {
        post: {
          id,
          condition,
          start_time,
          end_time,
          actual_bid,
          description,
          quantity,
          created_at,
          updated_at,
          seller_id: auction.seller_id,
          card_id: auction.card_id,
          status: auction.status,
          createdAt: auction.createdAt,
          updatedAt: auction.updatedAt,
        },
        user: {
          nickname,
          profilePic,
          contact,
        },
        card: {
          name,
          image: card_image,
        },
        bid: {
          amount,
        },
      };
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
};

module.exports = {
  createAuction,
  makeBid,
  searchAuctionWinners,
  searchAuctions,
  searchAuctionById,
  searchAuctionBycard,
  updateAuction,
  deleteAuction,
  updateAuctionQuantity,
  getUserBids,
};