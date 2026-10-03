const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    appointmentNumber: {
      type: String,
      required: true,
      unique: true
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
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
    date: {
      type: String, // YYYY-MM-DD
      required: true
    },
    timeSlot: {
      type: String,
      required: true
    },
    consultationType: {
      type: String,
      enum: ['In-person', 'Video'],
      default: 'In-person'
    },
    reason: {
      type: String,
      default: 'General Consultation'
    },
    status: {
      type: String,
      enum: ['BOOKED', 'CHECKED-IN', 'WAITING', 'IN-CONSULTATION', 'COMPLETED', 'CANCELLED', 'NO-SHOW'],
      default: 'BOOKED'
    },
    tokenNumber: {
      type: String,
      default: ''
    },
    queuePosition: {
      type: Number,
      default: 0
    },
    estimatedWaitMinutes: {
      type: Number,
      default: 0
    },
    vitals: {
      bp: { type: String, default: '120/80 mmHg' },
      pulse: { type: String, default: '72 bpm' },
      temp: { type: String, default: '98.6 °F' },
      weight: { type: String, default: '70 kg' }
    },
    doctorNotes: {
      type: String,
      default: ''
    },
    prescription: [{
      type: String
    }]
  },
  { timestamps: true }
);

appointmentSchema.index({ doctor: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
