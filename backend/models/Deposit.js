const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 5
  },
  paymentMethod: {
    type: String,
    enum: ['crypto', 'bank', 'card', 'other'],
    default: 'crypto'
  },
  transactionId: {
    type: String,
    unique: true,
    required: true
  },
  transactionHash: {
    type: String,
    default: ''
  },
  walletAddress: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending'
  },
  receiptUrl: {
    type: String,
    default: ''
  },
  proofUrl: {
    type: String,
    default: ''
  },
  depositDate: {
    type: Date,
    default: Date.now
  },
  confirmedDate: {
    type: Date,
    default: null
  },
  confirmedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Generate transaction ID
depositSchema.pre('save', function(next) {
  if (!this.transactionId) {
    this.transactionId = 'DEP' + Date.now() + Math.random().toString(36).substring(2, 9).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Deposit', depositSchema);
