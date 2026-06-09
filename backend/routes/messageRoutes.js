const express = require('express');
const router  = express.Router();
const { envoyerMessage, getMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', envoyerMessage);
router.get('/', protect, getMessages);

module.exports = router;
