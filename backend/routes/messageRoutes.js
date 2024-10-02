const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, markMessageAsRead } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, sendMessage).get(protect, getMessages);
router.put('/:id/read', protect, markMessageAsRead);

module.exports = router;