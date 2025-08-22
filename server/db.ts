import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

let supabase: any = null;
let db: any = null;
let client: any = null;

// Temporarily disable database to use sample data in memory storage
console.log("🔄 Using in-memory storage with sample data for demo purposes");
if (false) {
  // Database code disabled
} else if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.warn("Supabase credentials not set - database operations will be disabled");
  console.warn("Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables");
} else {
  try {
    // Create Supabase client for auth and realtime features
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    // For Drizzle, we need to use the database connection string
    // Supabase connection string format: postgresql://postgres:[password]@[host]:5432/postgres
    const databaseUrl = process.env.DATABASE_URL;
    if (databaseUrl) {
      client = postgres(databaseUrl, { prepare: false });
      db = drizzle(client, { schema });
      console.log("Supabase database connected successfully");
    } else {
      console.warn("DATABASE_URL not set - using fallback connection");
      // Fallback: construct connection string from Supabase URL
      const supabaseUrl = new URL(process.env.SUPABASE_URL);
      const fallbackUrl = `postgresql://postgres:${process.env.SUPABASE_DB_PASSWORD}@${supabaseUrl.hostname}:5432/postgres`;
      if (process.env.SUPABASE_DB_PASSWORD) {
        client = postgres(fallbackUrl, { prepare: false });
        db = drizzle(client, { schema });
        console.log("Supabase database connected with fallback URL");
      }
    }
  } catch (error) {
    console.error("Failed to connect to Supabase:", error);
    supabase = null;
    db = null;
    client = null;
  }
}

export { supabase, db, client };
