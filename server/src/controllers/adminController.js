const User = require('../models/User');
const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');

// @desc    Get system wide overview for Super Admin
// @route   GET /api/admin/system
// @access  Private (SUPER_ADMIN)
const getSystemOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const patients = await User.countDocuments({ role: 'PATIENT' });
    const doctors = await User.countDocuments({ role: 'DOCTOR' });
    const admins = await User.countDocuments({ role: 'HOSPITAL_ADMIN' });
    const hospitals = await Hospital.countDocuments();

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(10).select('-password');
    const hospitalList = await Hospital.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        counts: {
          totalUsers,
          patients,
          doctors,
          admins,
          hospitals
        },
        recentUsers,
        hospitalList
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle hospital verification status
// @route   PUT /api/admin/hospitals/:id/verify
// @access  Private (SUPER_ADMIN)
const toggleHospitalVerification = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    hospital.isVerified = !hospital.isVerified;
    await hospital.save();

    res.json({ success: true, message: `Hospital verification updated to ${hospital.isVerified}`, data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSystemOverview,
  toggleHospitalVerification
};
