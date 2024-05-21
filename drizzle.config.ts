import { config } from 'dotenv'
import type { Config } from 'drizzle-kit'

/// Load environment variables
config({ path: './.env' })

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
    host: process.env.POSTGRES_HOST!,
    port: parseInt(process.env.POSTGRES_PORT!),
  },
  verbose: true,
  strict: true,
} satisfies Config
