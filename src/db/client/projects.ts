import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { type Project, projects } from '@/db/schema'

/**
 * Retrieves a list of projects from the database.
 * @returns A promise that resolves to an array of projects.
 */
export async function listProjects(): Promise<Project[]> {
  return await db.select().from(projects)
}

/**
 * Retrieves a project by its ID.
 * @param id - The ID of the project to retrieve.
 * @returns A Promise that resolves to the project if found, or null if not found.
 */
export async function getProject(id: string): Promise<Project | null> {
  const project = await db.select().from(projects).where(eq(projects.id, id))
  return project[0] ?? null
}
