import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

if (!Bun.env.DB_URL) {
  throw new Error('DB_URL environment variable is not set')
}

const connection = await mysql.createConnection(Bun.env.DB_URL)

const db = drizzle(connection)
export { db }
