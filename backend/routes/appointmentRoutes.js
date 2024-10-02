const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createAppointment).get(protect, getAppointments);
router.route('/:id').put(protect, updateAppointment);

module.exports = router;