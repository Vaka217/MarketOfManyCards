const Card = require('../models/Card');
const card = require('../models/Card')

exports.getCards = async (req, res) => {
    const { cards } = req.query;
    const limit = 10;

    try {
        const offset = (cards - 1) * limit;
        const cartas = await Card.findAll({ 
            limit: limit,
            offset,
        });

        res.status(200).json(cartas);
    }  catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.saveCards = async (res, res) => {
    const { cards } = req.body;
    
    try {
        await Card.bulkCreate(cards);
        res.status(200).json({ message: 'Cartas guardadas exitosamente.' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
