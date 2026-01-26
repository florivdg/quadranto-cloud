import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { user, type User } from '@/db/schema'

/**
 * Retrieves a user from the database by their username.
 * @param username - The username of the user to retrieve.
 * @returns A Promise that resolves to the user object if found, or null if not found.
 */
export async function getUserByUsername(
  username: string,
): Promise<User | null> {
  const result = await db.select().from(user).where(eq(user.username, username))
  return result[0] ?? null
}
