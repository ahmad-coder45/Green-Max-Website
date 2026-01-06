# Supabase Integration Guide

## Setup Supabase (PostgreSQL Alternative)

### 1. Create Supabase Account
- Go to https://supabase.com
- Sign up for free account
- Create new project

### 2. Install Dependencies

```bash
cd backend
npm install @supabase/supabase-js pg
npm uninstall mongoose
```

### 3. Update Environment Variables

```env
# Replace MongoDB URI with Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
```

### 4. Create Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    wallet_address VARCHAR(255),
    balance DECIMAL(10, 2) DEFAULT 1.00,
    investment_balance DECIMAL(10, 2) DEFAULT 0,
    total_earnings DECIMAL(10, 2) DEFAULT 0,
    total_deposits DECIMAL(10, 2) DEFAULT 0,
    total_withdrawals DECIMAL(10, 2) DEFAULT 0,
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    referred_by UUID REFERENCES users(id),
    total_referral_earnings DECIMAL(10, 2) DEFAULT 0,
    direct_sales DECIMAL(10, 2) DEFAULT 0,
    weekly_salary DECIMAL(10, 2) DEFAULT 0,
    withdrawal_count INTEGER DEFAULT 0,
    last_withdrawal_date TIMESTAMP,
    first_withdrawal_eligible_date TIMESTAMP DEFAULT NOW() + INTERVAL '10 days',
    is_active BOOLEAN DEFAULT true,
    is_admin BOOLEAN DEFAULT false,
    kyc_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Plans Table
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_number INTEGER UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    daily_profit DECIMAL(10, 2) NOT NULL,
    total_return DECIMAL(10, 2) NOT NULL,
    duration INTEGER DEFAULT 30,
    type VARCHAR(20) NOT NULL CHECK (type IN ('regular', 'lock')),
    description TEXT,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Investments Table
CREATE TABLE investments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) NOT NULL,
    plan_id UUID REFERENCES plans(id) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    daily_profit DECIMAL(10, 2) NOT NULL,
    total_return DECIMAL(10, 2) NOT NULL,
    earned_profit DECIMAL(10, 2) DEFAULT 0,
    remaining_profit DECIMAL(10, 2) NOT NULL,
    duration INTEGER DEFAULT 30,
    days_completed INTEGER DEFAULT 0,
    days_remaining INTEGER NOT NULL,
    start_date TIMESTAMP DEFAULT NOW(),
    end_date TIMESTAMP NOT NULL,
    last_profit_date TIMESTAMP,
    next_profit_date TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    type VARCHAR(20) NOT NULL CHECK (type IN ('regular', 'lock')),
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- Withdrawals Table
CREATE TABLE withdrawals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    net_amount DECIMAL(10, 2) NOT NULL,
    wallet_address VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    transaction_id VARCHAR(100) UNIQUE,
    transaction_hash VARCHAR(255),
    receipt_url VARCHAR(255),
    request_date TIMESTAMP DEFAULT NOW(),
    processed_date TIMESTAMP,
    processed_by UUID REFERENCES users(id),
    rejection_reason TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Deposits Table
CREATE TABLE deposits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'crypto',
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    transaction_hash VARCHAR(255),
    wallet_address VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
    receipt_url VARCHAR(255),
    proof_url VARCHAR(255),
    deposit_date TIMESTAMP DEFAULT NOW(),
    confirmed_date TIMESTAMP,
    confirmed_by UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Commissions Table
CREATE TABLE commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) NOT NULL,
    from_user_id UUID REFERENCES users(id) NOT NULL,
    investment_id UUID REFERENCES investments(id) NOT NULL,
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 3),
    percentage DECIMAL(5, 2) NOT NULL,
    investment_amount DECIMAL(10, 2) NOT NULL,
    commission_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'paid' CHECK (status IN ('pending', 'paid')),
    transaction_id VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert Default Plans
INSERT INTO plans (plan_number, name, amount, daily_profit, total_return, duration, type) VALUES
(1, 'Starter', 5, 0.30, 9, 30, 'regular'),
(2, 'Basic', 12, 0.72, 21.60, 30, 'regular'),
(3, 'Standard', 30, 1.80, 54, 30, 'regular'),
(4, 'Premium', 50, 3.00, 90, 30, 'regular'),
(5, 'Gold Lock', 120, 7.20, 216, 30, 'lock'),
(6, 'Platinum Lock', 250, 15, 450, 30, 'lock'),
(7, 'Diamond Lock', 550, 33, 990, 30, 'lock');

-- Create Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_referral_code ON users(referral_code);
CREATE INDEX idx_investments_user_id ON investments(user_id);
CREATE INDEX idx_investments_status ON investments(status);
CREATE INDEX idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);
CREATE INDEX idx_commissions_user_id ON commissions(user_id);
```

### 5. Update Database Connection

Create `backend/config/supabase.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
```

### 6. Update Models (Example - User Model)

Create `backend/models/UserSupabase.js`:

```javascript
const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');

class User {
    static async create(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const { data, error } = await supabase
            .from('users')
            .insert([{
                username: userData.username,
                email: userData.email,
                password: hashedPassword,
                full_name: userData.fullName,
                phone: userData.phone,
                referral_code: userData.referralCode,
                referred_by: userData.referredBy
            }])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    }
    
    static async findByEmail(email) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
        
        if (error && error.code !== 'PGRST116') throw error;
        return data;
    }
    
    static async findById(id) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data;
    }
    
    static async update(id, updates) {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    }
    
    static async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = User;
```

### 7. Benefits of Supabase

✅ **PostgreSQL** - More powerful than MongoDB
✅ **Real-time subscriptions** - Live updates
✅ **Built-in authentication** - Optional to use
✅ **Row Level Security** - Better security
✅ **Auto-generated APIs** - REST & GraphQL
✅ **Free tier** - 500MB database
✅ **Dashboard** - Easy data management

### 8. Migration Steps

1. Export data from MongoDB (if any)
2. Run SQL schema in Supabase
3. Update all models to use Supabase client
4. Update controllers to use new models
5. Test all endpoints
6. Deploy

### Need Help?

I can create complete Supabase integration files if you want to switch!
