const Auction = require('../models/Auction');
const User = require('../models/User');
const Card = require('../models/Card');
const { validationResult } = require('express-validator');
const Bid = require('../models/Bid');
const { response } = require('express');

// const updateAuctionStatus = async (auctionId) => {
//   try {
//     const auction = await Auction.findByPk(auctionId);
//     if (!auction) {
//       console.log('Subasta no encontrada');
//       return;
//     }

//     // Verificar si la subasta ya ha finalizado
//     if (auction.status !== 'pending') {
//       console.log('La subasta ya ha finalizado');
//       return;
//     }

//     // Obtener la fecha actual y la fecha de finalización de la subasta
//     const currentDate = new Date();
//     const endDate = new Date(auction.created_at.getTime() + auction.duration * 1000);

//     // Verificar si la fecha actual supera la fecha de finalización de la subasta
//     if (currentDate > endDate) {
//       // Actualizar el estado de la subasta a "finalizado"
//       auction.status = 'finalizado';
//       await auction.save();

//       console.log('La subasta ha finalizado');
//       // Aca podemos incluir cualquier otra lógica adicional como notificar al ganador
//     }
//   } catch (error) {
//     console.error('Error al actualizar el estado de la subasta:', error);
//   }
// };

// // Llamar a la función para actualizar el estado de las subastas periódicamente
// setInterval(() => {
//   // Obtener todas las subastas pendientes
//   Auction.findAll({ where: { status: 'pending' } })
//     .then((auctions) => {
//       // Actualizar el estado de cada subasta
//       auctions.forEach((auction) => {
//         updateAuctionStatus(auction.id);
//       });
//     })
//     .catch((error) => {
//       console.error('Error al obtener las subastas pendientes:', error);
//     });
// }, 60000); // Actualiza cada minuto 

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
    
    console.log(startTime);
    console.log(endTime);

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
      attributes: ["nickname", "profilePic"],
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
      .json({ error: "Ha ocurrido un error al crear la subasta" });
  }
};

// Crear una bid
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

const auctionWinners = async (req, res) => {
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

}


module.exports = {
  createAuction,
  makeBid,
  auctionWinners,
  //updateAuctionStatus,
};