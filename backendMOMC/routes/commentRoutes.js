const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

router.get('/comment', commentController.getComments);
router.post('/comment', commentController.createComment);
router.put('/comment/:id', commentController.editComment);
router.delete('/comment/:id', commentController.deleteComment);

module.exports = router;