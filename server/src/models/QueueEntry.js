const mongoose = require('mongoose');

const queueEntrySchema = new mongoose.Schema(
  {
    queue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Queue',
      required: true
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tokenNumber: {
      type: String,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['WAITING', 'CALLED', 'IN-CONSULTATION', 'COMPLETED', 'SKIPPED', 'NO-SHOW'],
      default: 'WAITING'
    },
    checkInTime: {
      type: Date,
      default: Date.now
    },
    startTime: {
      type: Date
    },
    endTime: {
      type: Date
    },
    estimatedWaitMinutes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('QueueEntry', queueEntrySchema);
