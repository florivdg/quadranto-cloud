import type { Config } from 'drizzle-kit'
import { config } from 'dotenv'

/// Load environment variables
config({ path: './.env.local' })

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DB_URL!,
  },
} satisfies Config
