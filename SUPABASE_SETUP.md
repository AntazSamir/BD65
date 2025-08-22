# Supabase Setup Guide

This guide will help you integrate Supabase with your BD65 travel application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js installed on your system

## Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Fill in your project details:
   - Name: `BD65` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose closest to your users

## Step 2: Get Your Supabase Credentials

After your project is created:

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **URL**: Your project URL (e.g., `https://your-project.supabase.co`)
   - **anon public**: Anonymous key for client-side usage
   - **service_role**: Service role key (for server-side operations)

## Step 3: Get Database Connection String

1. Go to **Settings** → **Database** in your Supabase dashboard
2. Scroll down to **Connection string** section
3. Copy the **URI** format connection string
4. Replace `[YOUR-PASSWORD]` with your actual database password

Example:
```
postgresql://postgres:your_password@db.your-project.supabase.co:5432/postgres
```

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```env
   # Supabase Configuration
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key_here
   DATABASE_URL=postgresql://postgres:your_password@db.your-project.supabase.co:5432/postgres
   
   # Optional
   SUPABASE_DB_PASSWORD=your_database_password
   SESSION_SECRET=your_session_secret_here
   ```

## Step 5: Install Dependencies

Run the following command to install Supabase dependencies:

```bash
npm install
```

## Step 6: Initialize Database Schema

1. Push your database schema to Supabase:
   ```bash
   npm run db:push
   ```

2. This will create all the necessary tables in your Supabase database based on your Drizzle schema.

## Step 7: Test the Connection

Start your development server:

```bash
npm run dev
```

You should see:
```
Supabase database connected successfully
serving on port 5000
```

## Step 8: Verify Database Tables

1. Go to your Supabase dashboard
2. Click on **Table Editor**
3. You should see all your tables created:
   - users
   - destinations
   - hotels
   - trip_planners
   - buses
   - private_cars
   - travel_packages
   - restaurants
   - bookings

## Features Available with Supabase

✅ **PostgreSQL Database**: Full-featured SQL database
✅ **Real-time subscriptions**: Live data updates
✅ **Built-in Authentication**: User management system
✅ **Row Level Security**: Fine-grained access control
✅ **Auto-generated API**: RESTful and GraphQL APIs
✅ **Dashboard**: Visual database management
✅ **Edge Functions**: Serverless functions
✅ **Storage**: File uploads and management

## Troubleshooting

### Connection Issues

1. **Database connection error**: 
   - Verify your DATABASE_URL is correct
   - Ensure your database password doesn't contain special characters that need URL encoding
   - Check if your IP is whitelisted (Supabase allows all IPs by default)

2. **Authentication errors**:
   - Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct
   - Make sure there are no extra spaces in your environment variables

3. **Schema push fails**:
   - Ensure your Drizzle schema is valid
   - Check database permissions
   - Verify the connection string format

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Drizzle with Supabase Guide](https://orm.drizzle.team/docs/get-started-postgresql#supabase)
- [Supabase Community](https://github.com/supabase/supabase/discussions)

## Next Steps

Once your Supabase setup is complete, you can:

1. **Enable Authentication**: Set up user registration and login
2. **Configure RLS**: Add row-level security policies
3. **Add Real-time Features**: Subscribe to database changes
4. **File Storage**: Add image and file upload capabilities
5. **Edge Functions**: Add server-side logic

Your BD65 application is now powered by Supabase! 🚀
