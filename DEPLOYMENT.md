# BD65 Deployment Guide

This guide explains how to deploy your BD65 travel application to Vercel with the new, clean setup.

## Architecture Overview

- **Frontend**: React + Vite (builds to `dist/public`)
- **Backend**: Express.js API (runs as Vercel serverless function)  
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Files Structure

```
BD65/
├── api/
│   └── index.ts          # Vercel API entry point
├── client/               # React frontend source
├── server/               # Express backend source  
├── shared/               # Shared types and schemas
├── dist/public/          # Built frontend (generated)
├── vercel.json           # Vercel configuration
├── .vercelignore         # Files to ignore during deployment
└── .env                  # Environment variables (local only)
```

## Environment Variables

### Required for Deployment

Add these to your Vercel project dashboard:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here  
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
SESSION_SECRET=your-random-session-secret
NODE_ENV=production
```

### Local Development

Your local `.env` file should contain:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres  
SESSION_SECRET=bd65-travel-app-secret-key-2024
NODE_ENV=development
PORT=5000
```

## Deployment Steps

### 1. Connect to Vercel

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Connect your project
vercel login
vercel link
```

### 2. Set Environment Variables

Either through Vercel dashboard or CLI:

```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY  
vercel env add DATABASE_URL
vercel env add SESSION_SECRET
```

### 3. Deploy

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 4. Automatic Deployments

- **Main branch** → Automatic production deployment
- **Other branches** → Automatic preview deployments
- **Pull requests** → Preview deployments with unique URLs

## Build Process

1. **Frontend Build**: `npm run build` → Creates `dist/public/`
2. **API Functions**: Vercel automatically handles `api/index.ts`
3. **Static Assets**: Served from `dist/public/`
4. **API Routes**: All `/api/*` requests go to `api/index.ts`

## Local Development

```bash
# Start development server
npm run dev

# Access your app
open http://localhost:5000
```

## API Routes

All API endpoints are available at:
- Local: `http://localhost:5000/api/*`  
- Production: `https://your-app.vercel.app/api/*`

### Available Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login  
- `POST /api/auth/signout` - User logout
- `GET /api/auth/me` - Get current user
- `GET /api/destinations` - Get all destinations
- `GET /api/hotels` - Get all hotels
- `GET /api/buses` - Get all buses
- And many more...

## Troubleshooting

### Build Failures

1. Check environment variables are set correctly
2. Ensure all dependencies are in `package.json`
3. Verify build command works locally: `npm run build`

### Runtime Errors  

1. Check Vercel function logs in dashboard
2. Verify Supabase connection and credentials
3. Ensure database tables exist

### Database Issues

1. Check `DATABASE_URL` format and credentials
2. Verify Supabase project is accessible
3. Ensure IP is whitelisted (Supabase allows all by default)

## Features

✅ **Serverless API**: Automatic scaling  
✅ **Static Frontend**: Fast CDN delivery
✅ **Environment Management**: Separate dev/prod configs  
✅ **Database Integration**: Supabase PostgreSQL
✅ **Session Management**: Express sessions with MemoryStore
✅ **Error Handling**: Comprehensive error responses
✅ **TypeScript**: Full type safety

## Performance

- **Cold Start**: ~1-2 seconds (first request after idle)
- **Warm Requests**: ~100-300ms
- **Static Assets**: Served via Vercel's global CDN
- **Database**: Direct connection to Supabase

Your BD65 travel application is now ready for production! 🚀
