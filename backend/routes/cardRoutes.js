const express = require('express')
const router = express.router()
const cardController = require('../controllers/cardController')

router.get('/searchcard', cardController.getCards);
router.post('/createcard', cardController.saveCards);

module.exports = router;