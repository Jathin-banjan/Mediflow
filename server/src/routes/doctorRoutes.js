const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorById, getDoctorSlots } = require('../controllers/doctorController');

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.get('/:id/slots', getDoctorSlots);

module.exports = router;
