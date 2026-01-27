import type { Config } from 'drizzle-kit'
import { readFileSync } from 'node:fs'

let DB_PASSWORD = process.env.POSTGRES_PASSWORD

if (process.env.POSTGRES_PASSWORD_FILE) {
  /// Set DB_PASSWORD
  DB_PASSWORD = readFileSync(process.env.POSTGRES_PASSWORD_FILE, 'utf8').trim()
}

const DB_URL = `postgres://${process.env.POSTGRES_USER}:${DB_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT ?? '5432'}/${process.env.POSTGRES_DB}`

export default {
  schema: './src/db/schema',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_URL,
  },
} satisfies Config
