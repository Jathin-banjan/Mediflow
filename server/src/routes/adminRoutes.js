const express = require('express');
const router = express.Router();
const { getSystemOverview, toggleHospitalVerification } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect, authorize('SUPER_ADMIN'));

router.get('/system', getSystemOverview);
router.put('/hospitals/:id/verify', toggleHospitalVerification);

module.exports = router;
