import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { type User, type NewUser, users } from '@/db/schema'

/**
 * Retrieves a user from the database by their username.
 * @param username - The username of the user to retrieve.
 * @returns A Promise that resolves to the user object if found, or null if not found.
 */
export async function getUserByUsername(
  username: string,
): Promise<User | null> {
  const user = await db.select().from(users).where(eq(users.username, username))
  return user[0] ?? null
}

/**
 * Creates a new user in the database.
 * @param data - The data for the new user.
 * @returns A promise that resolves to the created user.
 */
export async function createUser(data: NewUser): Promise<User> {
  const user = await db.insert(users).values(data).returning()
  return user[0]
}
