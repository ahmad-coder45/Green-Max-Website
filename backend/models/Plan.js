const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  planNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 7
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 5
  },
  dailyProfit: {
    type: Number,
    required: true
  },
  totalReturn: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    default: 30
  },
  type: {
    type: String,
    enum: ['regular', 'lock'],
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  features: [{
    type: String
  }],
  imageUrl: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate ROI percentage
planSchema.virtual('roiPercentage').get(function() {
  return ((this.totalReturn - this.amount) / this.amount * 100).toFixed(2);
});

// Calculate daily ROI percentage
planSchema.virtual('dailyRoiPercentage').get(function() {
  return (this.dailyProfit / this.amount * 100).toFixed(2);
});

planSchema.set('toJSON', { virtuals: true });
planSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Plan', planSchema);
