const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      uppercase: true,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'Activity'
    },
    floor: {
      type: String,
      default: 'Ground Floor'
    },
    headDoctorName: {
      type: String,
      default: ''
    },
    currentPatients: {
      type: Number,
      default: 0
    },
    estimatedWaitMinutes: {
      type: Number,
      default: 20
    },
    status: {
      type: String,
      enum: ['Normal', 'Moderate', 'Busy', 'High Surge'],
      default: 'Normal'
    },
    operatingHours: {
      type: String,
      default: '08:00 AM - 08:00 PM'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Department', departmentSchema);
