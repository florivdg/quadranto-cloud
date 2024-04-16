import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

config({ path: '.env' })

const client = postgres(process.env.DB_URL!, { max: 1 })

const db = drizzle(client)

/// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './src/db/migrations' })
