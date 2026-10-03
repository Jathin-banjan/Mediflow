const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hospital name is required'],
      trim: true
    },
    tagline: {
      type: String,
      default: 'Premier Healthcare & Specialised Care'
    },
    description: {
      type: String,
      default: ''
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, default: '' },
      coordinates: {
        lat: { type: Number, default: 28.6139 },
        lng: { type: Number, default: 77.2090 }
      }
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 4.8
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    images: [{
      type: String
    }],
    currentCrowdLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium'
    },
    estimatedWaitMinutes: {
      type: Number,
      default: 25
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    emergencyAvailable: {
      type: Boolean,
      default: true
    },
    operatingHours: {
      type: String,
      default: '24/7 Open'
    },
    emergencyPhone: {
      type: String,
      default: '+1-800-555-EMERGENCY'
    },
    isVerified: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

hospitalSchema.index({ name: 'text', 'address.city': 'text', 'address.state': 'text' });

module.exports = mongoose.model('Hospital', hospitalSchema);
