const Auction = require('../models/Auction');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const createAuction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { actual_bid, description, quantity, start_time, end_time } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Validación de fechas
    const currentDate = new Date();
    const startTime = new Date(start_time);
    const endTime = new Date(end_time);

    if (startTime < currentDate) {
      return res.status(400).json({ error: 'La fecha de inicio no puede ser anterior a la fecha actual' });
    }

    if (endTime < currentDate) {
      return res.status(400).json({ error: 'La fecha de finalización no puede ser anterior a la fecha actual' });
    }

    if (startTime >= endTime) {
      return res.status(400).json({ error: 'La fecha de inicio debe ser anterior a la fecha de finalización' });
    }

    const auction = await Auction.create({
      actual_bid,
      description,
      quantity,
      start_time,
      end_time,
      created_at: new Date(),
      seller_id: id,
      condition,
      status: 'pending',
    });

    return res.json(auction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ha ocurrido un error al crear la subasta' });
  }
};

const updateAuctionStatus = async (auctionId) => {
  try {
    const auction = await Auction.findByPk(auctionId);
    if (!auction) {
      console.log('Subasta no encontrada');
      return;
    }

    // Verificar si la subasta ya ha finalizado
    if (auction.status !== 'pending') {
      console.log('La subasta ya ha finalizado');
      return;
    }

    // Obtener la fecha actual y la fecha de finalización de la subasta
    const currentDate = new Date();
    const endDate = new Date(auction.created_at.getTime() + auction.duration * 1000);

    // Verificar si la fecha actual supera la fecha de finalización de la subasta
    if (currentDate > endDate) {
      // Actualizar el estado de la subasta a "finalizado"
      auction.status = 'finalizado';
      await auction.save();

      console.log('La subasta ha finalizado');
      // Aca podemos incluir cualquier otra lógica adicional como notificar al ganador
    }
  } catch (error) {
    console.error('Error al actualizar el estado de la subasta:', error);
  }
};

// Llamar a la función para actualizar el estado de las subastas periódicamente
setInterval(() => {
  // Obtener todas las subastas pendientes
  Auction.findAll({ where: { status: 'pending' } })
    .then((auctions) => {
      // Actualizar el estado de cada subasta
      auctions.forEach((auction) => {
        updateAuctionStatus(auction.id);
      });
    })
    .catch((error) => {
      console.error('Error al obtener las subastas pendientes:', error);
    });
}, 60000); // Actualiza cada minuto 

module.exports = {
  createAuction,
  updateAuctionStatus,
};
