const Department = require('../models/Department');
const { getDepartmentCrowdForecast } = require('../utils/queueHelper');

// @desc    Get departments by hospital
// @route   GET /api/departments
// @access  Public
const getDepartments = async (req, res) => {
  try {
    const { hospital } = req.query;
    let query = {};
    if (hospital) {
      query.hospital = hospital;
    }

    const departments = await Department.find(query).populate('hospital', 'name');
    res.json({ success: true, count: departments.length, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get department forecast for Smart Visit Planner ("When Should I Go?")
// @route   GET /api/departments/:id/planner
// @access  Public
const getDepartmentPlanner = async (req, res) => {
  try {
    const { date } = req.query;
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }

    const targetDate = date || new Date().toISOString().split('T')[0];
    const forecast = getDepartmentCrowdForecast(department.name, targetDate);

    res.json({ success: true, data: forecast });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDepartments,
  getDepartmentPlanner
};
