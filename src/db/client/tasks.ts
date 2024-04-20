import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { type Task, type NewTask, tasks, profiles } from '@/db/schema'

/**
 * Retrieves a list of tasks for a given project ID.
 * @param forProjectId - The ID of the project to retrieve tasks for.
 * @returns A promise that resolves to an array of tasks.
 */
export async function listTasksForProject(projectId: string): Promise<Task[]> {
  return await db.select().from(tasks).where(eq(tasks.projectId, projectId))
}

/**
 * Retrieves a list of tasks for the current owner.
 * @returns A promise that resolves to an array of tasks.
 */
export async function listMyTasks(): Promise<Task[]> {
  const profileId = 'e444519a-d019-4ca4-bc57-a3263c978d96' /// TODO: Get the current user's profile ID.
  return await db.select().from(tasks).where(eq(tasks.ownerId, profileId))
}

/**
 * Retrieves a task by its ID.
 * @param id - The ID of the task to retrieve.
 * @returns A promise that resolves to the task with the specified ID, or null if no task is found.
 */
export async function getTask(id: string): Promise<Task | null> {
  const task = await db.select().from(tasks).where(eq(tasks.id, id))
  return task[0] ?? null
}

/**
 * Creates a new task.
 * @param data - The data for the new task.
 * @returns A promise that resolves to the created task.
 */
export async function createTask(data: NewTask): Promise<Task> {
  const task = await db.insert(tasks).values(data).returning()
  return task[0]
}

/**
 * Updates a task with the specified ID.
 * @param id - The ID of the task to update.
 * @param data - The new task data.
 * @returns A promise that resolves to the updated task.
 */
export async function updateTask(
  id: string,
  data: Partial<Task>,
): Promise<Task> {
  const task = await db
    .update(tasks)
    .set(data)
    .where(eq(tasks.id, id))
    .returning()
  return task[0]
}

/**
 * Deletes a task from the database.
 * @param id - The ID of the task to delete.
 * @returns A promise that resolves when the task is successfully deleted.
 */
export async function deleteTask(id: string): Promise<void> {
  await db.delete(tasks).where(eq(tasks.id, id))
}
