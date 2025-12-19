const Investment = require('../models/Investment');
const Plan = require('../models/Plan');
const User = require('../models/User');
const Commission = require('../models/Commission');

// @desc    Get all investment plans
// @route   GET /api/investments/plans
// @access  Public
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ planNumber: 1 });

    res.json({
      status: 'success',
      count: plans.length,
      data: { plans }
    });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch plans',
      error: error.message
    });
  }
};

// @desc    Create new investment
// @route   POST /api/investments/create
// @access  Private
exports.createInvestment = async (req, res) => {
  try {
    const { planId, amount } = req.body;
    const userId = req.user.id;

    // Get plan details
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        status: 'error',
        message: 'Investment plan not found'
      });
    }

    // Verify amount matches plan
    if (amount !== plan.amount) {
      return res.status(400).json({
        status: 'error',
        message: `Investment amount must be exactly $${plan.amount} for this plan`
      });
    }

    // Check user balance
    const user = await User.findById(userId);
    if (user.balance < amount) {
      return res.status(400).json({
        status: 'error',
        message: 'Insufficient balance. Please deposit funds first.'
      });
    }

    // Calculate dates
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.duration);
    
    const nextProfitDate = new Date(startDate);
    nextProfitDate.setDate(nextProfitDate.getDate() + 1);

    // Create investment
    const investment = await Investment.create({
      userId,
      planId,
      amount: plan.amount,
      dailyProfit: plan.dailyProfit,
      totalReturn: plan.totalReturn,
      remainingProfit: plan.totalReturn,
      duration: plan.duration,
      daysRemaining: plan.duration,
      startDate,
      endDate,
      nextProfitDate,
      type: plan.type
    });

    // Deduct amount from user balance
    user.balance -= amount;
    user.investmentBalance += amount;
    user.totalDeposits += amount;
    await user.save();

    // Process referral commissions
    await processReferralCommissions(userId, investment._id, amount);

    // Populate investment details
    await investment.populate('planId');

    res.status(201).json({
      status: 'success',
      message: 'Investment created successfully',
      data: { investment }
    });
  } catch (error) {
    console.error('Create investment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create investment',
      error: error.message
    });
  }
};

// Process referral commissions (3 levels)
async function processReferralCommissions(userId, investmentId, amount) {
  try {
    const user = await User.findById(userId).populate('referredBy');
    
    if (!user.referredBy) return;

    const commissionLevels = [
      { level: 1, percentage: 0.12 }, // 12%
      { level: 2, percentage: 0.02 }, // 2%
      { level: 3, percentage: 0.01 }  // 1%
    ];

    let currentUser = user.referredBy;
    
    for (const { level, percentage } of commissionLevels) {
      if (!currentUser) break;

      const commissionAmount = amount * percentage;

      // Create commission record
      await Commission.create({
        userId: currentUser._id,
        fromUserId: userId,
        investmentId,
        level,
        percentage: percentage * 100,
        investmentAmount: amount,
        commissionAmount
      });

      // Update referrer's balance and earnings
      currentUser.balance += commissionAmount;
      currentUser.totalReferralEarnings += commissionAmount;
      currentUser.totalEarnings += commissionAmount;
      
      // Update direct sales for level 1
      if (level === 1) {
        currentUser.directSales += amount;
        currentUser.calculateWeeklySalary();
      }
      
      await currentUser.save();

      // Move to next level
      currentUser = await User.findById(currentUser.referredBy);
    }
  } catch (error) {
    console.error('Process commissions error:', error);
  }
}

// @desc    Get user investments
// @route   GET /api/investments/user
// @access  Private
exports.getUserInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user.id })
      .populate('planId')
      .sort({ createdAt: -1 });

    const stats = {
      total: investments.length,
      active: investments.filter(inv => inv.status === 'active').length,
      completed: investments.filter(inv => inv.status === 'completed').length,
      totalInvested: investments.reduce((sum, inv) => sum + inv.amount, 0),
      totalEarned: investments.reduce((sum, inv) => sum + inv.earnedProfit, 0)
    };

    res.json({
      status: 'success',
      data: { investments, stats }
    });
  } catch (error) {
    console.error('Get user investments error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch investments',
      error: error.message
    });
  }
};

// @desc    Get investment details
// @route   GET /api/investments/:id
// @access  Private
exports.getInvestmentDetails = async (req, res) => {
  try {
    const investment = await Investment.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('planId');

    if (!investment) {
      return res.status(404).json({
        status: 'error',
        message: 'Investment not found'
      });
    }

    res.json({
      status: 'success',
      data: { investment }
    });
  } catch (error) {
    console.error('Get investment details error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch investment details',
      error: error.message
    });
  }
};

// @desc    Get user earnings summary
// @route   GET /api/investments/earnings
// @access  Private
exports.getEarnings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const investments = await Investment.find({ userId: req.user.id });
    const commissions = await Commission.find({ userId: req.user.id });

    const earnings = {
      totalBalance: user.balance,
      investmentBalance: user.investmentBalance,
      totalEarnings: user.totalEarnings,
      investmentEarnings: investments.reduce((sum, inv) => sum + inv.earnedProfit, 0),
      referralEarnings: user.totalReferralEarnings,
      weeklySalary: user.weeklySalary,
      activeInvestments: investments.filter(inv => inv.status === 'active').length,
      totalInvestments: investments.length
    };

    res.json({
      status: 'success',
      data: { earnings }
    });
  } catch (error) {
    console.error('Get earnings error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch earnings',
      error: error.message
    });
  }
};

module.exports = exports;
