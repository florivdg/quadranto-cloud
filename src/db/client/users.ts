import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { type User, type NewUser, users } from '@/db/schema'

export async function getUserByUsername(
  username: string,
): Promise<User | null> {
  const user = await db.select().from(users).where(eq(users.username, username))
  return user[0] ?? null
}

export async function createUser(data: NewUser): Promise<User> {
  const user = await db.insert(users).values(data).returning()
  return user[0]
}
