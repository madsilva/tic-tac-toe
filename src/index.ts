
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { usersTable } from './db/schema'
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })
const db = drizzle(client);

try {
  // lightweight connectivity check
  const result = await client`SELECT 1`;
  console.log("Database connected! Result:", result);
} catch (err) {
  console.error("Database connection failed:", err);
}