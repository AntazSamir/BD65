import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

let supabase: any = null;
let db: any = null;
let client: any = null;

// Force disable database - use only in-memory storage for demo
console.log("🎭 Database disabled - using in-memory storage with sample data");

// All database connections are disabled for this demo version
// This ensures Vercel deployment works without database setup
supabase = null;
db = null;
client = null;

export { supabase, db, client };
