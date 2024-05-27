import type { Config } from 'drizzle-kit'
import { readFileSync } from 'node:fs'

let DB_PASSWORD = Bun.env.POSTGRES_PASSWORD

if (Bun.env.POSTGRES_PASSWORD_FILE) {
  /// Set DB_PASSWORD
  DB_PASSWORD = readFileSync(Bun.env.POSTGRES_PASSWORD_FILE, 'utf8').trim()
}

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    user: Bun.env.POSTGRES_USER!,
    password: DB_PASSWORD,
    database: Bun.env.POSTGRES_DB!,
    host: Bun.env.POSTGRES_HOST!,
    port: parseInt(Bun.env.POSTGRES_PORT!),
  },
  verbose: true,
  strict: true,
} satisfies Config
