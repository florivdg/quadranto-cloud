import type { Config } from 'drizzle-kit'

export default {
  schema: './db/schema/',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    host: Bun.env.DB_HOST!,
    user: Bun.env.DB_USER!,
    password: Bun.env.DB_PASS!,
    database: Bun.env.DB_NAME!,
    port: parseInt(Bun.env.DB_PORT!),
  },
} satisfies Config
