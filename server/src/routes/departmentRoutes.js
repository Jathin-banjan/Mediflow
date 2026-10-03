const express = require('express');
const router = express.Router();
const { getDepartments, getDepartmentPlanner } = require('../controllers/departmentController');

router.get('/', getDepartments);
router.get('/:id/planner', getDepartmentPlanner);

module.exports = router;
