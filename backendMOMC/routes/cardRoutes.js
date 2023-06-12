const express = require('express')
const router = express.router()
const cardController = require('../controllers/cardController')

router.get('/', cardController.getCards);
router.post('/', cardController.saveCards);

module.exports = router;