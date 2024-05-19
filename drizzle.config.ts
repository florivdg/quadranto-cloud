import { config } from 'dotenv'
import type { Config } from 'drizzle-kit'

/// Load environment variables
config({ path: './.env' })

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config
