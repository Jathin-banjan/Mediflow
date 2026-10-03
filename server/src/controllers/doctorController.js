const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// @desc    Get doctors with marketplace filters
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    const { specialty, hospital, search, available } = req.query;
    let query = {};

    if (specialty) {
      query.specialty = { $regex: specialty, $options: 'i' };
    }

    if (hospital) {
      query.hospital = hospital;
    }

    if (available === 'true') {
      query.isAvailable = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } },
        { qualification: { $regex: search, $options: 'i' } }
      ];
    }

    const doctors = await Doctor.find(query)
      .populate('hospital', 'name address rating currentCrowdLevel estimatedWaitMinutes')
      .populate('department', 'name code')
      .sort({ rating: -1, experienceYears: -1 });

    res.json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single doctor profile
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('hospital')
      .populate('department');

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get doctor available slots for a given date
// @route   GET /api/doctors/:id/slots
// @access  Public
const getDoctorSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, message: 'Date parameter (YYYY-MM-DD) is required' });
    }

    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Find already booked slots for this doctor on this date
    const bookedAppointments = await Appointment.find({
      doctor: doctor._id,
      date,
      status: { $nin: ['CANCELLED'] }
    }).select('timeSlot');

    const bookedSlots = bookedAppointments.map(a => a.timeSlot);

    // Map timeSlots with availability status
    const availableSlots = doctor.timeSlots.map(slot => ({
      slot,
      isBooked: bookedSlots.includes(slot)
    }));

    res.json({
      success: true,
      data: {
        date,
        doctor: doctor._id,
        doctorName: doctor.name,
        slots: availableSlots
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  getDoctorSlots
};
