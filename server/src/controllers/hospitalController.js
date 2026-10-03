const Hospital = require('../models/Hospital');
const Department = require('../models/Department');
const Doctor = require('../models/Doctor');
const Facility = require('../models/Facility');
const Queue = require('../models/Queue');

// @desc    Get all hospitals with filtering & search
// @route   GET /api/hospitals
// @access  Public
const getHospitals = async (req, res) => {
  try {
    const { search, crowd, city, emergency } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { 'address.city': { $regex: search, $options: 'i' } },
        { tagline: { $regex: search, $options: 'i' } }
      ];
    }

    if (crowd) {
      query.currentCrowdLevel = crowd;
    }

    if (city) {
      query['address.city'] = { $regex: city, $options: 'i' };
    }

    if (emergency === 'true') {
      query.emergencyAvailable = true;
    }

    const hospitals = await Hospital.find(query).sort({ rating: -1 });

    // Enhance each hospital with department count and sample facilities
    const enhancedHospitals = await Promise.all(
      hospitals.map(async (h) => {
        const departments = await Department.find({ hospital: h._id }).select('name code currentPatients status');
        const facilities = await Facility.find({ hospital: h._id }).select('name status category');
        return {
          ...h.toObject(),
          departments,
          facilities
        };
      })
    );

    res.json({ success: true, count: enhancedHospitals.length, data: enhancedHospitals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single hospital details by ID
// @route   GET /api/hospitals/:id
// @access  Public
const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    const departments = await Department.find({ hospital: hospital._id });
    const doctors = await Doctor.find({ hospital: hospital._id }).populate('department', 'name code');
    const facilities = await Facility.find({ hospital: hospital._id });
    const queues = await Queue.find({ hospital: hospital._id }).populate('department', 'name code');

    res.json({
      success: true,
      data: {
        ...hospital.toObject(),
        departments,
        doctors,
        facilities,
        queues
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update hospital details (Hospital Admin / Super Admin)
// @route   PUT /api/hospitals/:id
// @access  Private (HOSPITAL_ADMIN, SUPER_ADMIN)
const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    res.json({ success: true, data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getHospitals,
  getHospitalById,
  updateHospital
};
