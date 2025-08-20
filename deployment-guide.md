# Vercel Deployment Guide for BD Explorer

## 🚀 Quick Deployment Steps

### 1. Prerequisites
- Vercel account at [vercel.com](https://vercel.com)
- GitHub repository with your code
- Supabase database URL

### 2. Deploy to Vercel

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New..." → "Project"
   - Import your GitHub repository

2. **Configure Environment Variables:**
   - In your Vercel project dashboard, go to "Settings" → "Environment Variables"
   - Add the following variable:
     - `DATABASE_URL`: Your Supabase connection string
       ```
       postgresql://postgres.payttjyyvhhhvowxxbhi:%40b4CJq5iZy%235fin@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
       ```

3. **Deploy:**
   - Click "Deploy" 
   - Vercel will automatically detect the configuration from `vercel.json`
   - Your site will be live in a few minutes!

## 📁 Project Structure for Vercel

```
├── api/                    # Serverless API functions
│   ├── auth/
│   │   ├── signin.ts      # POST /api/auth/signin
│   │   ├── signup.ts      # POST /api/auth/signup
│   │   ├── signout.ts     # POST /api/auth/signout
│   │   └── me.ts          # GET /api/auth/me
│   ├── destinations.ts     # GET /api/destinations
│   ├── hotels.ts          # GET /api/hotels
│   ├── buses.ts           # GET /api/buses
│   ├── restaurants.ts     # GET /api/restaurants
│   └── bookings.ts        # GET/POST /api/bookings
├── client/                # React frontend
├── shared/                # Shared types/schemas
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies
```

## ⚠️ Important Notes

1. **Session Management**: The current implementation doesn't include session management for serverless functions. For production, consider implementing JWT tokens or using Vercel's edge config.

2. **Database Migrations**: Run `npm run db:push` locally before deploying to ensure your Supabase database has the correct schema.

3. **Static Assets**: Images in `/attached_assets/` won't be served in Vercel deployment. Consider moving them to `/client/public/` or using a CDN.

4. **Environment Variables**: Make sure all required environment variables are set in Vercel dashboard.

## 🔧 Local Development vs Production

- **Local**: Uses Express server with session management
- **Production**: Uses Vercel serverless functions (stateless)

The API functions are designed to work with your Supabase database in both environments.