import { SQL } from 'bun'
import { drizzle } from 'drizzle-orm/bun-sql'
import { migrate } from 'drizzle-orm/bun-sql/migrator'

// Read password from file if using Docker secrets
let DB_PASSWORD = Bun.env.POSTGRES_PASSWORD
if (Bun.env.POSTGRES_PASSWORD_FILE) {
  const pw = await Bun.file(Bun.env.POSTGRES_PASSWORD_FILE).text()
  DB_PASSWORD = pw.trim()
}

const DB_URL = `postgres://${Bun.env.POSTGRES_USER}:${DB_PASSWORD}@${Bun.env.POSTGRES_HOST}:${Bun.env.POSTGRES_PORT ?? '5432'}/${Bun.env.POSTGRES_DB}`

const client = new SQL(DB_URL)
const db = drizzle({ client })

console.log('Running database migrations...')
await migrate(db, { migrationsFolder: './drizzle' })
console.log('Migrations complete.')

// Close connection
client.close()
