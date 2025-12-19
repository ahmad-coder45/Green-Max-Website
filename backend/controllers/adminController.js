const User = require('../models/User');
const Investment = require('../models/Investment');
const Withdrawal = require('../models/Withdrawal');
const Deposit = require('../models/Deposit');
const Commission = require('../models/Commission');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalInvestments = await Investment.countDocuments();
    const activeInvestments = await Investment.countDocuments({ status: 'active' });
    
    const investmentStats = await Investment.aggregate([
      {
        $group: {
          _id: null,
          totalInvested: { $sum: '$amount' },
          totalEarned: { $sum: '$earnedProfit' }
        }
      }
    ]);

    const withdrawalStats = await Withdrawal.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          total: { $sum: '$amount' }
        }
      }
    ]);

    const depositStats = await Deposit.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          total: { $sum: '$amount' }
        }
      }
    ]);

    res.json({
      status: 'success',
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
          inactive: totalUsers - activeUsers
        },
        investments: {
          total: totalInvestments,
          active: activeInvestments,
          completed: totalInvestments - activeInvestments,
          totalInvested: investmentStats[0]?.totalInvested || 0,
          totalEarned: investmentStats[0]?.totalEarned || 0
        },
        withdrawals: withdrawalStats,
        deposits: depositStats
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch dashboard stats',
      error: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      status: 'success',
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// @desc    Get user details
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('directReferrals', 'username email fullName');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    const investments = await Investment.find({ userId: user._id }).populate('planId');
    const withdrawals = await Withdrawal.find({ userId: user._id });
    const commissions = await Commission.find({ userId: user._id });

    res.json({
      status: 'success',
      data: {
        user,
        investments,
        withdrawals,
        commissions
      }
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user details',
      error: error.message
    });
  }
};

// @desc    Toggle user status
// @route   PUT /api/admin/users/:id/toggle-status
// @access  Private/Admin
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      status: 'success',
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { user }
    });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to toggle user status',
      error: error.message
    });
  }
};

// @desc    Get all deposits
// @route   GET /api/admin/deposits
// @access  Private/Admin
exports.getAllDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.find()
      .populate('userId', 'username email fullName')
      .sort({ createdAt: -1 });

    res.json({
      status: 'success',
      count: deposits.length,
      data: { deposits }
    });
  } catch (error) {
    console.error('Get all deposits error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch deposits',
      error: error.message
    });
  }
};

// @desc    Confirm deposit
// @route   PUT /api/admin/deposits/:id/confirm
// @access  Private/Admin
exports.confirmDeposit = async (req, res) => {
  try {
    const deposit = await Deposit.findById(req.params.id);

    if (!deposit) {
      return res.status(404).json({
        status: 'error',
        message: 'Deposit not found'
      });
    }

    if (deposit.status !== 'pending') {
      return res.status(400).json({
        status: 'error',
        message: 'Deposit already processed'
      });
    }

    // Update deposit status
    deposit.status = 'confirmed';
    deposit.confirmedDate = new Date();
    deposit.confirmedBy = req.user.id;
    await deposit.save();

    // Add amount to user balance
    const user = await User.findById(deposit.userId);
    user.balance += deposit.amount;
    user.totalDeposits += deposit.amount;
    await user.save();

    res.json({
      status: 'success',
      message: 'Deposit confirmed successfully',
      data: { deposit }
    });
  } catch (error) {
    console.error('Confirm deposit error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to confirm deposit',
      error: error.message
    });
  }
};

// @desc    Get all withdrawals
// @route   GET /api/admin/withdrawals
// @access  Private/Admin
exports.getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find()
      .populate('userId', 'username email fullName walletAddress')
      .sort({ createdAt: -1 });

    res.json({
      status: 'success',
      count: withdrawals.length,
      data: { withdrawals }
    });
  } catch (error) {
    console.error('Get all withdrawals error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch withdrawals',
      error: error.message
    });
  }
};

// @desc    Approve withdrawal
// @route   PUT /api/admin/withdrawals/:id/approve
// @access  Private/Admin
exports.approveWithdrawal = async (req, res) => {
  try {
    const { transactionHash } = req.body;
    const withdrawal = await Withdrawal.findById(req.params.id);

    if (!withdrawal) {
      return res.status(404).json({
        status: 'error',
        message: 'Withdrawal not found'
      });
    }

    if (withdrawal.status !== 'pending') {
      return res.status(400).json({
        status: 'error',
        message: 'Withdrawal already processed'
      });
    }

    // Update withdrawal status
    withdrawal.status = 'completed';
    withdrawal.transactionHash = transactionHash || '';
    withdrawal.processedDate = new Date();
    withdrawal.processedBy = req.user.id;
    await withdrawal.save();

    // Update user withdrawal count
    const user = await User.findById(withdrawal.userId);
    user.withdrawalCount += 1;
    user.lastWithdrawalDate = new Date();
    user.totalWithdrawals += withdrawal.netAmount;
    await user.save();

    res.json({
      status: 'success',
      message: 'Withdrawal approved successfully',
      data: { withdrawal }
    });
  } catch (error) {
    console.error('Approve withdrawal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to approve withdrawal',
      error: error.message
    });
  }
};

// @desc    Reject withdrawal
// @route   PUT /api/admin/withdrawals/:id/reject
// @access  Private/Admin
exports.rejectWithdrawal = async (req, res) => {
  try {
    const { reason } = req.body;
    const withdrawal = await Withdrawal.findById(req.params.id);

    if (!withdrawal) {
      return res.status(404).json({
        status: 'error',
        message: 'Withdrawal not found'
      });
    }

    if (withdrawal.status !== 'pending') {
      return res.status(400).json({
        status: 'error',
        message: 'Withdrawal already processed'
      });
    }

    // Update withdrawal status
    withdrawal.status = 'rejected';
    withdrawal.rejectionReason = reason || 'No reason provided';
    withdrawal.processedDate = new Date();
    withdrawal.processedBy = req.user.id;
    await withdrawal.save();

    // Refund amount to user
    const user = await User.findById(withdrawal.userId);
    user.balance += withdrawal.amount;
    await user.save();

    res.json({
      status: 'success',
      message: 'Withdrawal rejected and amount refunded',
      data: { withdrawal }
    });
  } catch (error) {
    console.error('Reject withdrawal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to reject withdrawal',
      error: error.message
    });
  }
};

module.exports = exports;
