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
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Payment**: Integration ready for payment gateways

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
- MongoDB (v5+)
- npm or yarn

### Installation

1. Clone repository:
```bash
git clone https://github.com/ahmad-coder45/green-max-investment-platform.git
cd green-max-investment-platform
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start MongoDB:
```bash
mongod
```

5. Run backend:
```bash
npm start
```

6. Open frontend:
```bash
cd ../frontend
# Open index.html in browser or use live server
```

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/greenmax
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

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
└── README.md
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

## Deployment

### Production Setup

1. Set environment to production:
```env
NODE_ENV=production
```

2. Use production MongoDB:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/greenmax
```

3. Deploy backend (Heroku/Railway/DigitalOcean)
4. Deploy frontend (Netlify/Vercel/GitHub Pages)

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

## Support

For issues and questions:
- GitHub Issues: [Create Issue](https://github.com/ahmad-coder45/green-max-investment-platform/issues)
- Email: support@greenmax.com

## License

MIT License - See LICENSE file for details

## Disclaimer

This platform is for educational purposes. Ensure compliance with local financial regulations before deployment.
