import type { Config } from 'drizzle-kit'
import { readFileSync } from 'node:fs'

let DB_PASSWORD = process.env.POSTGRES_PASSWORD

if (process.env.POSTGRES_PASSWORD_FILE) {
  /// Set DB_PASSWORD
  DB_PASSWORD = readFileSync(process.env.POSTGRES_PASSWORD_FILE, 'utf8').trim()
}

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    user: process.env.POSTGRES_USER!,
    password: DB_PASSWORD,
    database: process.env.POSTGRES_DB!,
    host: process.env.POSTGRES_HOST!,
    port: parseInt(process.env.POSTGRES_PORT!),
  },
  verbose: true,
  strict: true,
} satisfies Config
