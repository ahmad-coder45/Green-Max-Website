# Free Database Alternatives Guide

Complete guide for switching to any free database platform.

## 🎯 Best Free Database Options

### 1. MongoDB Atlas (Easiest - No Code Changes)
**Free Tier:** 512MB, Shared Cluster  
**Best For:** Current setup (MongoDB)

#### Setup Steps:
1. **Sign Up:** https://www.mongodb.com/cloud/atlas/register
2. **Create Cluster:** Choose M0 (Free tier)
3. **Get Connection String**
4. **Update .env:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/greenmax?retryWrites=true&w=majority
```
✅ **No code changes needed!**

---

### 2. Supabase (PostgreSQL)
**Free Tier:** 500MB database, 2GB bandwidth  
**Best For:** Advanced features, real-time updates

See `SUPABASE_INTEGRATION.md` for complete guide.

---

### 3. PlanetScale (MySQL)
**Free Tier:** 5GB storage, 1 billion row reads/month  
**Best For:** Scalability, branching

#### Setup Steps:

1. **Sign Up:** https://planetscale.com
2. **Create Database**
3. **Install Dependencies:**
```bash
npm install mysql2 sequelize
npm uninstall mongoose
```

4. **Update .env:**
```env
DATABASE_URL=mysql://user:pass@host.connect.psdb.cloud/greenmax?ssl={"rejectUnauthorized":true}
```

5. **Create Schema:**
```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 1.00,
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Add other tables...
```

---

### 4. CockroachDB (PostgreSQL Compatible)
**Free Tier:** 5GB storage, 250M RUs/month  
**Best For:** Global distribution, high availability

#### Setup:
1. **Sign Up:** https://cockroachlabs.cloud
2. **Create Cluster**
3. **Use PostgreSQL connection string**
4. **Same as Supabase integration**

---

### 5. Neon (Serverless PostgreSQL)
**Free Tier:** 3GB storage, 100 hours compute  
**Best For:** Serverless, auto-scaling

#### Setup:
1. **Sign Up:** https://neon.tech
2. **Create Project**
3. **Get connection string**
4. **Use Supabase integration guide**

---

### 6. Railway (PostgreSQL/MySQL/MongoDB)
**Free Tier:** $5 credit/month  
**Best For:** All-in-one platform

#### Setup:
1. **Sign Up:** https://railway.app
2. **Add PostgreSQL/MySQL/MongoDB plugin**
3. **Get connection string from dashboard**
4. **Update .env**

---

### 7. ElephantSQL (PostgreSQL)
**Free Tier:** 20MB storage  
**Best For:** Small projects, testing

#### Setup:
1. **Sign Up:** https://elephantsql.com
2. **Create instance (Tiny Turtle - Free)**
3. **Get connection URL**
4. **Use PostgreSQL integration**

---

### 8. Aiven (Multiple Databases)
**Free Tier:** 30-day trial  
**Best For:** Testing multiple databases

---

## 🔄 Quick Comparison

| Database | Free Storage | Type | Code Changes | Best For |
|----------|-------------|------|--------------|----------|
| **MongoDB Atlas** | 512MB | MongoDB | ❌ None | Current setup |
| **Supabase** | 500MB | PostgreSQL | ✅ Medium | Advanced features |
| **PlanetScale** | 5GB | MySQL | ✅ Medium | Scalability |
| **CockroachDB** | 5GB | PostgreSQL | ✅ Medium | Global apps |
| **Neon** | 3GB | PostgreSQL | ✅ Medium | Serverless |
| **Railway** | $5/month | Any | ✅ Varies | All-in-one |
| **ElephantSQL** | 20MB | PostgreSQL | ✅ Medium | Testing |

---

## 🚀 Recommended Choice

### For Your Project: **MongoDB Atlas**

**Why?**
- ✅ **Zero code changes** - Just update connection string
- ✅ **Same MongoDB** you're already using
- ✅ **512MB free forever**
- ✅ **Automatic backups**
- ✅ **Easy to scale later**
- ✅ **5 minutes setup**

### Setup MongoDB Atlas (Recommended):

```bash
# 1. Go to https://www.mongodb.com/cloud/atlas/register
# 2. Create free account
# 3. Create M0 cluster (Free)
# 4. Create database user
# 5. Whitelist IP (0.0.0.0/0 for all IPs)
# 6. Get connection string
# 7. Update .env:

MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/greenmax?retryWrites=true&w=majority
```

**That's it!** Your app will work immediately. 🎉

---

## 🔧 If You Want PostgreSQL (Supabase)

### Why Choose Supabase?
- ✅ More powerful than MongoDB
- ✅ Real-time subscriptions
- ✅ Built-in authentication
- ✅ Auto-generated APIs
- ✅ Better for complex queries
- ✅ Row-level security

### Migration Effort:
- **Time:** 2-3 hours
- **Difficulty:** Medium
- **Files to Update:** ~15 files
- **Benefits:** More features, better performance

See `SUPABASE_INTEGRATION.md` for complete guide.

---

## 💡 My Recommendation

### Start with MongoDB Atlas
1. **Immediate:** Use MongoDB Atlas (5 min setup)
2. **Later:** Migrate to Supabase if you need advanced features

### Why This Approach?
- ✅ Get your app running NOW
- ✅ No code changes needed
- ✅ Can migrate later if needed
- ✅ Free forever

---

## 🆘 Need Help?

### I can help you:
1. ✅ Set up MongoDB Atlas (instant)
2. ✅ Migrate to Supabase (complete integration)
3. ✅ Switch to any other database
4. ✅ Create migration scripts

Just let me know which database you want to use!

---

## 📊 Database Feature Comparison

### MongoDB Atlas
- ✅ Document database
- ✅ Flexible schema
- ✅ Easy to learn
- ✅ Great for rapid development
- ❌ Complex queries can be slow

### PostgreSQL (Supabase/Neon/etc)
- ✅ Relational database
- ✅ ACID compliant
- ✅ Complex queries
- ✅ Better for analytics
- ❌ Requires schema planning

### MySQL (PlanetScale)
- ✅ Relational database
- ✅ Wide adoption
- ✅ Great performance
- ✅ Easy to scale
- ❌ Less features than PostgreSQL

---

## 🎯 Quick Decision Guide

**Choose MongoDB Atlas if:**
- You want to launch ASAP
- You're comfortable with current code
- You want zero code changes

**Choose Supabase if:**
- You want advanced features
- You need real-time updates
- You want better security
- You're okay with 2-3 hours migration

**Choose PlanetScale if:**
- You need massive scale
- You want database branching
- You prefer MySQL

---

## 📞 Support

Need help choosing or migrating? I'm here to help! 🚀
