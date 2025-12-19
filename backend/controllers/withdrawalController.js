const Withdrawal = require('../models/Withdrawal');
const User = require('../models/User');
const Investment = require('../models/Investment');

// @desc    Request withdrawal
// @route   POST /api/withdrawals/request
// @access  Private
exports.requestWithdrawal = async (req, res) => {
  try {
    const { amount, walletAddress } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    // Check minimum withdrawal amount
    if (amount < 5) {
      return res.status(400).json({
        status: 'error',
        message: 'Minimum withdrawal amount is $5'
      });
    }

    // Check if user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({
        status: 'error',
        message: 'Insufficient balance'
      });
    }

    // Check withdrawal eligibility
    const isEligible = await user.checkWithdrawalEligibility();
    
    if (!isEligible) {
      const now = new Date();
      
      if (user.withdrawalCount === 0) {
        const daysRemaining = Math.ceil((user.firstWithdrawalEligibleDate - now) / (1000 * 60 * 60 * 24));
        return res.status(400).json({
          status: 'error',
          message: `First withdrawal available in ${daysRemaining} days (after 10 days from registration)`
        });
      }
      
      return res.status(400).json({
        status: 'error',
        message: 'Second monthly withdrawal requires referring a new member with an active investment plan'
      });
    }

    // Calculate tax and net amount
    const tax = amount * 0.05; // 5% tax
    const netAmount = amount - tax;

    // Create withdrawal request
    const withdrawal = await Withdrawal.create({
      userId,
      amount,
      tax,
      netAmount,
      walletAddress,
      status: 'pending'
    });

    // Deduct amount from user balance (held until approved)
    user.balance -= amount;
    await user.save();

    res.status(201).json({
      status: 'success',
      message: 'Withdrawal request submitted successfully. Pending admin approval.',
      data: { withdrawal }
    });
  } catch (error) {
    console.error('Request withdrawal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to request withdrawal',
      error: error.message
    });
  }
};

// @desc    Get user withdrawals
// @route   GET /api/withdrawals/user
// @access  Private
exports.getUserWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    const stats = {
      total: withdrawals.length,
      pending: withdrawals.filter(w => w.status === 'pending').length,
      approved: withdrawals.filter(w => w.status === 'approved').length,
      completed: withdrawals.filter(w => w.status === 'completed').length,
      rejected: withdrawals.filter(w => w.status === 'rejected').length,
      totalAmount: withdrawals
        .filter(w => w.status === 'completed')
        .reduce((sum, w) => sum + w.netAmount, 0)
    };

    res.json({
      status: 'success',
      data: { withdrawals, stats }
    });
  } catch (error) {
    console.error('Get user withdrawals error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch withdrawals',
      error: error.message
    });
  }
};

// @desc    Check withdrawal eligibility
// @route   GET /api/withdrawals/check-eligibility
// @access  Private
exports.checkEligibility = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const isEligible = await user.checkWithdrawalEligibility();
    
    const now = new Date();
    let message = '';
    let daysUntilEligible = 0;

    if (!isEligible) {
      if (user.withdrawalCount === 0) {
        daysUntilEligible = Math.ceil((user.firstWithdrawalEligibleDate - now) / (1000 * 60 * 60 * 24));
        message = `First withdrawal available in ${daysUntilEligible} days`;
      } else {
        message = 'Refer a new member with active investment to unlock second monthly withdrawal';
      }
    } else {
      message = 'You are eligible to withdraw';
    }

    res.json({
      status: 'success',
      data: {
        isEligible,
        message,
        daysUntilEligible,
        withdrawalCount: user.withdrawalCount,
        balance: user.balance,
        minimumWithdrawal: 5,
        withdrawalTax: 5
      }
    });
  } catch (error) {
    console.error('Check eligibility error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to check eligibility',
      error: error.message
    });
  }
};

// @desc    Cancel withdrawal request
// @route   DELETE /api/withdrawals/:id
// @access  Private
exports.cancelWithdrawal = async (req, res) => {
  try {
    const withdrawal = await Withdrawal.findOne({
      _id: req.params.id,
      userId: req.user.id,
      status: 'pending'
    });

    if (!withdrawal) {
      return res.status(404).json({
        status: 'error',
        message: 'Withdrawal request not found or cannot be cancelled'
      });
    }

    // Refund amount to user
    const user = await User.findById(req.user.id);
    user.balance += withdrawal.amount;
    await user.save();

    // Delete withdrawal request
    await withdrawal.deleteOne();

    res.json({
      status: 'success',
      message: 'Withdrawal request cancelled and amount refunded'
    });
  } catch (error) {
    console.error('Cancel withdrawal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to cancel withdrawal',
      error: error.message
    });
  }
};

module.exports = exports;
