const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
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
  earnedProfit: {
    type: Number,
    default: 0
  },
  remainingProfit: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    default: 30
  },
  daysCompleted: {
    type: Number,
    default: 0
  },
  daysRemaining: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  lastProfitDate: {
    type: Date,
    default: null
  },
  nextProfitDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  type: {
    type: String,
    enum: ['regular', 'lock'],
    required: true
  },
  transactionId: {
    type: String,
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Generate transaction ID
investmentSchema.pre('save', function(next) {
  if (!this.transactionId) {
    this.transactionId = 'INV' + Date.now() + Math.random().toString(36).substring(2, 9).toUpperCase();
  }
  next();
});

// Calculate progress percentage
investmentSchema.virtual('progressPercentage').get(function() {
  return ((this.daysCompleted / this.duration) * 100).toFixed(2);
});

// Calculate profit percentage earned
investmentSchema.virtual('profitPercentage').get(function() {
  return ((this.earnedProfit / this.totalReturn) * 100).toFixed(2);
});

investmentSchema.set('toJSON', { virtuals: true });
investmentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Investment', investmentSchema);
