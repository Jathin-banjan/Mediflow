const express = require('express');
const router = express.Router();
const { getQueues, getQueueById, handleQueueAction } = require('../controllers/queueController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getQueues);
router.get('/:id', getQueueById);
router.post('/:id/action', protect, authorize('DOCTOR', 'HOSPITAL_ADMIN', 'SUPER_ADMIN'), handleQueueAction);

module.exports = router;
