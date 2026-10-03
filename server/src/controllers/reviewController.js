const Review = require('../models/Review');
const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// @desc    Add review for a hospital / doctor
// @route   POST /api/reviews
// @access  Private (PATIENT)
const createReview = async (req, res) => {
  try {
    const { hospitalId, doctorId, appointmentId, overallRating, waitTimeRating, staffRating, facilityRating, comment } = req.body;

    // Check if appointment exists and belongs to patient
    if (appointmentId) {
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment || appointment.patient.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'You can only review verified completed appointments' });
      }
    }

    const review = await Review.create({
      patient: req.user._id,
      hospital: hospitalId,
      doctor: doctorId || null,
      appointment: appointmentId || null,
      overallRating,
      waitTimeRating: waitTimeRating || overallRating,
      staffRating: staffRating || overallRating,
      facilityRating: facilityRating || overallRating,
      comment
    });

    // Recalculate hospital average rating
    const hospitalReviews = await Review.find({ hospital: hospitalId });
    const avgRating = (hospitalReviews.reduce((sum, r) => sum + r.overallRating, 0) / hospitalReviews.length).toFixed(1);
    await Hospital.findByIdAndUpdate(hospitalId, { rating: parseFloat(avgRating), reviewsCount: hospitalReviews.length });

    // Recalculate doctor rating if applicable
    if (doctorId) {
      const doctorReviews = await Review.find({ doctor: doctorId });
      const docAvg = (doctorReviews.reduce((sum, r) => sum + r.overallRating, 0) / doctorReviews.length).toFixed(1);
      await Doctor.findByIdAndUpdate(doctorId, { rating: parseFloat(docAvg), reviewsCount: doctorReviews.length });
    }

    const populatedReview = await Review.findById(review._id)
      .populate('patient', 'name avatar')
      .populate('doctor', 'name specialty');

    res.status(201).json({ success: true, data: populatedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get reviews for hospital or doctor
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
  try {
    const { hospital, doctor } = req.query;
    let query = {};
    if (hospital) query.hospital = hospital;
    if (doctor) query.doctor = doctor;

    const reviews = await Review.find(query)
      .populate('patient', 'name avatar')
      .populate('doctor', 'name specialty')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createReview,
  getReviews
};
