import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

if (!Bun.env.POSTGRES_PASSWORD && !Bun.env.POSTGRES_PASSWORD_FILE) {
  throw new Error(
    'Neither `POSTGRES_PASSWORD` nor `POSTGRES_PASSWORD_FILE` environment variables are set',
  )
}

let DB_PASSWORD = Bun.env.POSTGRES_PASSWORD
if (Bun.env.POSTGRES_PASSWORD_FILE) {
  /// When set via Docker secrets, read the password from a file
  const pw = await Bun.file(Bun.env.POSTGRES_PASSWORD_FILE).text()
  DB_PASSWORD = pw.trim()
}

const client = postgres({
  user: Bun.env.POSTGRES_USER,
  password: DB_PASSWORD,
  database: Bun.env.POSTGRES_DB,
  host: Bun.env.POSTGRES_HOST,
  port: parseInt(Bun.env.POSTGRES_PORT ?? '5432'),
})

const db = drizzle(client, { schema })
export { db }
