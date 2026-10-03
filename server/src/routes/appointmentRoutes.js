const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getAppointments,
  getAppointmentById,
  checkInAppointment,
  cancelAppointment,
  rescheduleAppointment
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', bookAppointment);
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.post('/:id/check-in', checkInAppointment);
router.put('/:id/cancel', cancelAppointment);
router.put('/:id/reschedule', rescheduleAppointment);

module.exports = router;
