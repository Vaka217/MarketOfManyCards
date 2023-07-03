const express = require('express')
const router = express.Router();
const cardController = require('../controllers/cardController')

router.get('/searchcards', cardController.getAllCards);
router.post('/createcards', cardController.createCard);
router.get('/searchcards/:id', cardController.getCardById);
router.put('/updatecard/:id', cardController.updateCardById);
router.delete('/deletecards/:id', cardController.deleteCardById);



module.exports = router;