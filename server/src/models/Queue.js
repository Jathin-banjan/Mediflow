const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema(
  {
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
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor'
    },
    name: {
      type: String,
      required: true
    },
    currentServingToken: {
      type: String,
      default: 'None'
    },
    totalPatientsToday: {
      type: Number,
      default: 0
    },
    waitingPatientsCount: {
      type: Number,
      default: 0
    },
    avgWaitPerPatient: {
      type: Number,
      default: 15
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'PAUSED', 'CLOSED'],
      default: 'ACTIVE'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Queue', queueSchema);
