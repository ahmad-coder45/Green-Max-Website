const Investment = require('../models/Investment');
const User = require('../models/User');

// Distribute daily profits to all active investments
exports.distributeDailyProfits = async () => {
  try {
    const now = new Date();
    
    // Find all active investments where next profit date has passed
    const investments = await Investment.find({
      status: 'active',
      nextProfitDate: { $lte: now }
    });

    console.log(`Processing ${investments.length} investments for daily profit...`);

    for (const investment of investments) {
      try {
        // Add daily profit to user balance
        const user = await User.findById(investment.userId);
        if (!user) continue;

        user.balance += investment.dailyProfit;
        user.totalEarnings += investment.dailyProfit;
        await user.save();

        // Update investment
        investment.earnedProfit += investment.dailyProfit;
        investment.remainingProfit -= investment.dailyProfit;
        investment.daysCompleted += 1;
        investment.daysRemaining -= 1;
        investment.lastProfitDate = now;

        // Set next profit date
        const nextProfit = new Date(now);
        nextProfit.setDate(nextProfit.getDate() + 1);
        investment.nextProfitDate = nextProfit;

        // Check if investment is completed
        if (investment.daysCompleted >= investment.duration || investment.remainingProfit <= 0) {
          investment.status = 'completed';
          investment.completedAt = now;
          
          // Return principal to user
          user.balance += investment.amount;
          user.investmentBalance -= investment.amount;
          await user.save();
        }

        await investment.save();
        
        console.log(`✅ Profit distributed: $${investment.dailyProfit} to user ${user.username}`);
      } catch (error) {
        console.error(`Error processing investment ${investment._id}:`, error);
      }
    }

    console.log('✅ Daily profit distribution completed');
  } catch (error) {
    console.error('❌ Daily profit distribution error:', error);
  }
};

// Distribute weekly salaries based on direct sales
exports.distributeWeeklySalaries = async () => {
  try {
    // Find all users with weekly salary > 0
    const users = await User.find({ weeklySalary: { $gt: 0 } });

    console.log(`Processing weekly salaries for ${users.length} users...`);

    for (const user of users) {
      try {
        // Recalculate salary based on current direct sales
        user.calculateWeeklySalary();
        
        if (user.weeklySalary > 0) {
          user.balance += user.weeklySalary;
          user.totalEarnings += user.weeklySalary;
          await user.save();
          
          console.log(`✅ Weekly salary distributed: $${user.weeklySalary} to user ${user.username}`);
        }
      } catch (error) {
        console.error(`Error processing salary for user ${user._id}:`, error);
      }
    }

    console.log('✅ Weekly salary distribution completed');
  } catch (error) {
    console.error('❌ Weekly salary distribution error:', error);
  }
};

// Manual trigger for testing
exports.manualDistributeProfits = async (req, res) => {
  try {
    await exports.distributeDailyProfits();
    res.json({
      status: 'success',
      message: 'Daily profits distributed successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to distribute profits',
      error: error.message
    });
  }
};

module.exports = exports;
