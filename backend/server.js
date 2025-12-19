const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const investmentRoutes = require('./routes/investments');
const withdrawalRoutes = require('./routes/withdrawals');
const referralRoutes = require('./routes/referrals');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');

// Import automated tasks
const { distributeDailyProfits } = require('./utils/cronJobs');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  initializePlans();
})
.catch(err => console.error('❌ MongoDB connection error:', err));

// Initialize investment plans
async function initializePlans() {
  const Plan = require('./models/Plan');
  const count = await Plan.countDocuments();
  
  if (count === 0) {
    const plans = [
      { planNumber: 1, name: 'Starter', amount: 5, dailyProfit: 0.30, totalReturn: 9, duration: 30, type: 'regular', isActive: true },
      { planNumber: 2, name: 'Basic', amount: 12, dailyProfit: 0.72, totalReturn: 21.60, duration: 30, type: 'regular', isActive: true },
      { planNumber: 3, name: 'Standard', amount: 30, dailyProfit: 1.80, totalReturn: 54, duration: 30, type: 'regular', isActive: true },
      { planNumber: 4, name: 'Premium', amount: 50, dailyProfit: 3.00, totalReturn: 90, duration: 30, type: 'regular', isActive: true },
      { planNumber: 5, name: 'Gold Lock', amount: 120, dailyProfit: 7.20, totalReturn: 216, duration: 30, type: 'lock', isActive: true },
      { planNumber: 6, name: 'Platinum Lock', amount: 250, dailyProfit: 15, totalReturn: 450, duration: 30, type: 'lock', isActive: true },
      { planNumber: 7, name: 'Diamond Lock', amount: 550, dailyProfit: 33, totalReturn: 990, duration: 30, type: 'lock', isActive: true }
    ];
    
    await Plan.insertMany(plans);
    console.log('✅ Investment plans initialized');
  }
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'success', 
    message: 'GREEN MAX API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error', 
    message: 'Route not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

// Cron jobs - Daily profit distribution at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('🔄 Running daily profit distribution...');
  await distributeDailyProfits();
});

// Weekly salary distribution - Every Monday at 00:00
cron.schedule('0 0 * * 1', async () => {
  console.log('💰 Running weekly salary distribution...');
  const { distributeWeeklySalaries } = require('./utils/cronJobs');
  await distributeWeeklySalaries();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;
