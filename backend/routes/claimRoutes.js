const express = require('express');
const router = express.Router();
const { createClaim, getClaims, updateClaim } = require('../controllers/claimController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createClaim).get(protect, getClaims);
router.put('/:id', protect, updateClaim);

module.exports = router;