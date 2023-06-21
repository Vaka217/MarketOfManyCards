const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

router.get('/searchcomment', commentController.getComments);
router.post('/createcomment', commentController.createComment);
router.put('/updatecomment/:id', commentController.editComment);
router.delete('/deletecomment/:id', commentController.deleteComment);

module.exports = router;