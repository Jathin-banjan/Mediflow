const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    specialty: {
      type: String,
      required: true
    },
    qualification: {
      type: String,
      required: true
    },
    experienceYears: {
      type: Number,
      required: true,
      default: 5
    },
    consultationFee: {
      type: Number,
      required: true,
      default: 50
    },
    rating: {
      type: Number,
      default: 4.9
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    languages: [{
      type: String
    }],
    bio: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    availableDays: [{
      type: String
    }],
    timeSlots: [{
      type: String
    }],
    avgConsultationMinutes: {
      type: Number,
      default: 15
    }
  },
  { timestamps: true }
);

doctorSchema.index({ name: 'text', specialty: 'text' });

module.exports = mongoose.model('Doctor', doctorSchema);
