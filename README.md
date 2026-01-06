# GREEN MAX Investment Platform

Advanced 3D investment platform with multi-level referral system, automated profit distribution, and comprehensive admin controls.

## Features

- 🎨 **3D Interactive Frontend** - Engaging animations and modern design
- 🔐 **Secure Authentication** - JWT-based user authentication
- 💰 **7 Investment Plans** - Regular and Lock plans with daily returns
- 🎁 **$1 Registration Bonus** - Automatic non-withdrawable bonus
- 👥 **3-Level Referral System** - 12%, 2%, 1% commissions
- 💼 **Salary Plans** - Weekly earnings based on direct sales
- 📊 **Real-time Dashboard** - Track investments, earnings, referrals
- 🧾 **Receipt Generation** - Automated transaction receipts
- ⚙️ **Admin Panel** - Complete platform management

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript, Three.js (3D), GSAP (animations)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (or any free alternative - see below)
- **Authentication**: JWT, bcrypt
- **Payment**: Integration ready for payment gateways

## Database Options

### 🎯 Recommended: MongoDB Atlas (Free - No Code Changes)

**Why MongoDB Atlas?**
- ✅ **Zero code changes** - Just update connection string
- ✅ **512MB free forever**
- ✅ **5 minutes setup**
- ✅ **Automatic backups**

**Quick Setup:**
1. Sign up: https://www.mongodb.com/cloud/atlas/register
2. Create M0 (Free) cluster
3. Get connection string
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/greenmax
```

### 🔄 Other Free Alternatives

| Database | Free Storage | Setup Time | Code Changes |
|----------|-------------|------------|--------------|
| **MongoDB Atlas** | 512MB | 5 min | ❌ None |
| **Supabase** (PostgreSQL) | 500MB | 2-3 hours | ✅ Medium |
| **PlanetScale** (MySQL) | 5GB | 1-2 hours | ✅ Medium |
| **CockroachDB** | 5GB | 1-2 hours | ✅ Medium |
| **Neon** (PostgreSQL) | 3GB | 1-2 hours | ✅ Medium |

📚 **See [DATABASE_ALTERNATIVES.md](DATABASE_ALTERNATIVES.md) for complete guide**

## Investment Plans

### Regular Plans
- Plan 01: $5 → $0.30/day → $9 total (30 days)
- Plan 02: $12 → $0.72/day → $21.60 total (30 days)
- Plan 03: $30 → $1.80/day → $54 total (30 days)
- Plan 04: $50 → $3.00/day → $90 total (30 days)

### Lock Plans
- Plan 05: $120 → $7.20/day → $216 total (30 days)
- Plan 06: $250 → $15/day → $450 total (30 days)
- Plan 07: $550 → $33/day → $990 total (30 days)

## Financial Rules

- Minimum Deposit: $5
- Minimum Withdrawal: $5
- Withdrawal Tax: 5%
- First Withdrawal: After 10 days
- Second Withdrawal: Requires 1 new referral with active plan

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (free) OR local MongoDB
- npm or yarn

### Installation

1. **Clone repository:**
```bash
git clone https://github.com/ahmad-coder45/green-max-investment-platform.git
cd green-max-investment-platform
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

**For MongoDB Atlas (Recommended):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/greenmax
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**For Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/greenmax
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. **Start backend:**
```bash
npm start
# or for development with auto-reload
npm run dev
```

5. **Open frontend:**
```bash
cd ../frontend
# Open index.html in browser or use live server
# Or use: python -m http.server 3000
```

6. **Access application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Project Structure

```
green-max-investment-platform/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── assets/
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── index.html
├── README.md
├── DEPLOYMENT.md
├── API_DOCUMENTATION.md
├── DATABASE_ALTERNATIVES.md
└── SUPABASE_INTEGRATION.md
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/profile` - Get user profile

### Investments
- POST `/api/investments/create` - Create investment
- GET `/api/investments/user` - Get user investments
- GET `/api/investments/earnings` - Get daily earnings

### Withdrawals
- POST `/api/withdrawals/request` - Request withdrawal
- GET `/api/withdrawals/user` - Get user withdrawals
- GET `/api/withdrawals/check-eligibility` - Check withdrawal eligibility

### Referrals
- GET `/api/referrals/tree` - Get referral tree
- GET `/api/referrals/commissions` - Get commission history

### Admin
- GET `/api/admin/users` - Get all users
- GET `/api/admin/deposits` - Get all deposits
- PUT `/api/admin/withdrawal/:id/approve` - Approve withdrawal

📚 **See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference**

## Deployment

### Quick Deploy Options

**Backend:**
- Heroku (Free tier)
- Railway (Free tier)
- Render (Free tier)
- DigitalOcean ($5/month)

**Frontend:**
- Netlify (Free)
- Vercel (Free)
- GitHub Pages (Free)
- Cloudflare Pages (Free)

**Database:**
- MongoDB Atlas (Free 512MB)
- Supabase (Free 500MB)
- PlanetScale (Free 5GB)

📚 **See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide**

## Documentation

- 📖 [README.md](README.md) - Main documentation (this file)
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- 📡 [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Full API reference
- 🗄️ [DATABASE_ALTERNATIVES.md](DATABASE_ALTERNATIVES.md) - Free database options
- 🐘 [SUPABASE_INTEGRATION.md](SUPABASE_INTEGRATION.md) - PostgreSQL integration
- ✨ [FEATURES.md](FEATURES.md) - Detailed features list
- 📋 [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Project overview

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- SQL injection prevention
- XSS protection

## Automated Tasks

- Daily profit distribution (runs at midnight)
- Weekly salary calculation
- Withdrawal eligibility checks
- Referral commission processing

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (Choose one)
# MongoDB Atlas (Recommended)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/greenmax

# OR Local MongoDB
MONGODB_URI=mongodb://localhost:27017/greenmax

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

## Support

For issues and questions:
- GitHub Issues: [Create Issue](https://github.com/ahmad-coder45/green-max-investment-platform/issues)
- Email: support@greenmax.com

## License

MIT License - See LICENSE file for details

## Disclaimer

This platform is for educational purposes. Ensure compliance with local financial regulations before deployment.

---

## 🎉 Quick Links

- 🌐 **Live Demo:** Coming soon
- 📚 **Documentation:** [Full Docs](https://github.com/ahmad-coder45/green-max-investment-platform)
- 🐛 **Report Bug:** [GitHub Issues](https://github.com/ahmad-coder45/green-max-investment-platform/issues)
- 💡 **Request Feature:** [GitHub Issues](https://github.com/ahmad-coder45/green-max-investment-platform/issues)

---

**Built with ❤️ by Ahmad Ameen**

**⭐ Star this repo if you find it helpful!**
