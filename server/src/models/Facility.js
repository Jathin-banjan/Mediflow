const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: 'Emergency & Care'
    },
    status: {
      type: String,
      enum: ['Available', 'Busy', 'Closed', 'Maintenance'],
      default: 'Available'
    },
    description: {
      type: String,
      default: ''
    },
    contactExtension: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Facility', facilitySchema);
