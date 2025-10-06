const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  logo: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  logoSize: {
    type: String,
    default: 'max-h-16'
  },
  logoFilter: {
    type: String
  },
  darkBackground: {
    type: Boolean,
    default: true
  },
  useTextLogo: {
    type: Boolean,
    default: false
  },
  useBlackBackground: {
    type: Boolean,
    default: false
  },
  images: [{
    filename: String,
    originalName: String,
    path: String,
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Brand', brandSchema);
