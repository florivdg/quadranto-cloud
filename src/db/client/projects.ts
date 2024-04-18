import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { type Project, type NewProject, projects } from '@/db/schema'

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

/**
 * Creates a new project.
 * @param data - The data for the new project.
 * @returns A promise that resolves to the created project.
 */
export async function createProject(data: NewProject): Promise<Project> {
  const project = await db.insert(projects).values(data).returning()
  return project[0]
}

/**
 * Updates a project with the specified ID.
 * @param id - The ID of the project to update.
 * @param data - The new project data.
 * @returns A Promise that resolves to the updated project.
 */
export async function updateProject(
  id: string,
  data: Partial<Project>,
): Promise<Project> {
  const project = await db
    .update(projects)
    .set(data)
    .where(eq(projects.id, id))
    .returning()
  return project[0]
}

/**
 * Deletes a project from the database.
 * @param id - The ID of the project to delete.
 * @returns A Promise that resolves when the project is successfully deleted.
 */
export async function deleteProject(id: string): Promise<void> {
  await db.delete(projects).where(eq(projects.id, id))
}
