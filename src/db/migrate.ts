import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import { migrate } from 'drizzle-orm/mysql2/migrator'

config({ path: '.env.local' })

const connection = await mysql.createConnection(process.env.DB_URL!)

const db = drizzle(connection)

/// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './src/db/migrations' })

await connection.end()
