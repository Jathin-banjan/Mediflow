const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor'
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    },
    overallRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    waitTimeRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    staffRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    facilityRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    comment: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
