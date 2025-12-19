const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  walletAddress: {
    type: String,
    default: ''
  },
  balance: {
    type: Number,
    default: 1.0 // $1 registration bonus
  },
  investmentBalance: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  totalDeposits: {
    type: Number,
    default: 0
  },
  totalWithdrawals: {
    type: Number,
    default: 0
  },
  referralCode: {
    type: String,
    unique: true,
    required: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  referralLevel: {
    type: Number,
    default: 0
  },
  directReferrals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  totalReferralEarnings: {
    type: Number,
    default: 0
  },
  directSales: {
    type: Number,
    default: 0
  },
  weeklySalary: {
    type: Number,
    default: 0
  },
  withdrawalCount: {
    type: Number,
    default: 0
  },
  lastWithdrawalDate: {
    type: Date,
    default: null
  },
  canWithdraw: {
    type: Boolean,
    default: false
  },
  firstWithdrawalEligibleDate: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 days from registration
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  kycVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate referral code
userSchema.methods.generateReferralCode = function() {
  return this.username.toUpperCase() + Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Calculate weekly salary based on direct sales
userSchema.methods.calculateWeeklySalary = function() {
  if (this.directSales >= 6000) {
    this.weeklySalary = 50;
  } else if (this.directSales >= 2500) {
    this.weeklySalary = 15;
  } else if (this.directSales >= 1000) {
    this.weeklySalary = 5;
  } else {
    this.weeklySalary = 0;
  }
  return this.weeklySalary;
};

// Check withdrawal eligibility
userSchema.methods.checkWithdrawalEligibility = async function() {
  const now = new Date();
  
  // Check if 10 days have passed since registration for first withdrawal
  if (this.withdrawalCount === 0) {
    return now >= this.firstWithdrawalEligibleDate;
  }
  
  // For second withdrawal in the same month, check if user has referred someone
  const currentMonth = now.getMonth();
  const lastWithdrawalMonth = this.lastWithdrawalDate ? this.lastWithdrawalDate.getMonth() : -1;
  
  if (currentMonth === lastWithdrawalMonth && this.withdrawalCount === 1) {
    // Check if user has at least one referral with active investment
    const Investment = mongoose.model('Investment');
    const activeReferralInvestment = await Investment.findOne({
      userId: { $in: this.directReferrals },
      status: 'active'
    });
    
    return !!activeReferralInvestment;
  }
  
  return true;
};

module.exports = mongoose.model('User', userSchema);
