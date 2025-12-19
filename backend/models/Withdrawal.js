const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
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
  tax: {
    type: Number,
    required: true,
    default: function() {
      return this.amount * 0.05; // 5% tax
    }
  },
  netAmount: {
    type: Number,
    required: true
  },
  walletAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true
  },
  transactionHash: {
    type: String,
    default: ''
  },
  receiptUrl: {
    type: String,
    default: ''
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  processedDate: {
    type: Date,
    default: null
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  rejectionReason: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Generate transaction ID
withdrawalSchema.pre('save', function(next) {
  if (!this.transactionId) {
    this.transactionId = 'WD' + Date.now() + Math.random().toString(36).substring(2, 9).toUpperCase();
  }
  
  // Calculate net amount after tax
  if (!this.netAmount) {
    this.tax = this.amount * 0.05;
    this.netAmount = this.amount - this.tax;
  }
  
  next();
});

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
