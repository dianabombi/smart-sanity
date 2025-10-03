const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  pageId: {
    type: String,
    required: true,
    unique: true,
    enum: ['who-we-are', 'what-we-offer', 'home', 'contact', 'inspirations', 'references']
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sections: [{
    sectionId: String,
    title: String,
    content: String,
    order: {
      type: Number,
      default: 0
    }
  }],
  metaData: {
    description: String,
    keywords: [String],
    lastModified: {
      type: Date,
      default: Date.now
    },
    modifiedBy: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Update lastModified on save
contentSchema.pre('save', function(next) {
  this.metaData.lastModified = new Date();
  next();
});

module.exports = mongoose.model('Content', contentSchema);
