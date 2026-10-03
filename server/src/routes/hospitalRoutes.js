const express = require('express');
const router = express.Router();
const { getHospitals, getHospitalById, updateHospital } = require('../controllers/hospitalController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getHospitals);
router.get('/:id', getHospitalById);
router.put('/:id', protect, authorize('HOSPITAL_ADMIN', 'SUPER_ADMIN'), updateHospital);

module.exports = router;
