import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

if (!Bun.env.DB_URL) {
  throw new Error('DB_URL environment variable is not set')
}

const client = postgres(Bun.env.DB_URL)

const db = drizzle(client)
export { db }
