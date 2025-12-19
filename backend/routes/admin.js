const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getDashboardStats,
  getAllUsers,
  getUserDetails,
  toggleUserStatus,
  getAllDeposits,
  confirmDeposit,
  getAllWithdrawals,
  approveWithdrawal,
  rejectWithdrawal
} = require('../controllers/adminController');

// All routes require authentication and admin privileges
router.use(protect, adminOnly);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Users management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserDetails);
router.put('/users/:id/toggle-status', toggleUserStatus);

// Deposits management
router.get('/deposits', getAllDeposits);
router.put('/deposits/:id/confirm', confirmDeposit);

// Withdrawals management
router.get('/withdrawals', getAllWithdrawals);
router.put('/withdrawals/:id/approve', approveWithdrawal);
router.put('/withdrawals/:id/reject', rejectWithdrawal);

module.exports = router;
