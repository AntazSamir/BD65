import { defineConfig } from "drizzle-kit";
import 'dotenv/config';

// Check for Supabase connection string first, then fallback to DATABASE_URL
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL or SUPABASE_DATABASE_URL must be set. Please configure your Supabase connection string.");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
  // Supabase specific settings
  verbose: true,
  strict: true,
});
