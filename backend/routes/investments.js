const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { investmentValidation, validate } = require('../middleware/validator');
const {
  getPlans,
  createInvestment,
  getUserInvestments,
  getInvestmentDetails,
  getEarnings
} = require('../controllers/investmentController');

// Public routes
router.get('/plans', getPlans);

// Protected routes
router.post('/create', protect, investmentValidation, validate, createInvestment);
router.get('/user', protect, getUserInvestments);
router.get('/earnings', protect, getEarnings);
router.get('/:id', protect, getInvestmentDetails);

module.exports = router;
