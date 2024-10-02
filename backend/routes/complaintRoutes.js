const express = require('express');
const router = express.Router();
const { createComplaint, getComplaints, updateComplaint } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createComplaint).get(protect, getComplaints);
router.put('/:id', protect, updateComplaint);

module.exports = router;