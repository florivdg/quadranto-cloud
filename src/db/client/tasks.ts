import { eq, desc } from 'drizzle-orm'

import { db } from '@/db'
import { isOwner } from '@/db/client/projects'
import { type Task, type NewTask, tasks } from '@/db/schema'

/**
 * Retrieves a list of tasks for a given project ID.
 * @param projectId - The ID of the project to retrieve tasks for.
 * @param userId - The ID of the user making the request.
 * @returns A promise that resolves to an array of tasks.
 */
export async function listTasksForProject(
  projectId: string,
  userId: string,
): Promise<Task[]> {
  // * Check if the user is an owner of the project
  if (!(await isOwner(projectId, userId))) return []

  return await db
    .select()
    .from(tasks)
    .where(eq(tasks.projectId, projectId))
    .orderBy(desc(tasks.createdAt))
}

/**
 * Retrieves a list of tasks for the current owner.
 * @returns A promise that resolves to an array of tasks.
 */
export async function listMyTasks(userId: string): Promise<Task[]> {
  return await db.select().from(tasks).where(eq(tasks.ownerId, userId))
}

/**
 * Retrieves a task by its ID.
 * @param id - The ID of the task to retrieve.
 * @param userId - The ID of the user making the request.
 * @returns A promise that resolves to the task with the specified ID, or null if no task is found.
 */
export async function getTask(
  id: string,
  userId: string,
): Promise<Task | null> {
  const task = (await db.select().from(tasks).where(eq(tasks.id, id)))[0]

  // * Check if the user is an owner of the project
  if (!(await isOwner(task.projectId, userId))) return null

  return task ?? null
}

/**
 * Creates a new task.
 * @param data - The data for the new task.
 * @param userId - The ID of the user creating the task.
 * @returns A promise that resolves to the created task.
 */
export async function createTask(
  data: NewTask,
  userId: string,
): Promise<Task | null> {
  // * Check if the user is an owner of the project
  if (!(await isOwner(data.projectId, userId))) return null

  // * Check if the owner of the task is an owner of the project
  if (data.ownerId && !(await isOwner(data.projectId, data.ownerId))) {
    // * If the owner is not an owner of the project, remove the ownerId from the data
    delete data.ownerId
  }

  const task = await db.insert(tasks).values(data).returning()
  return task[0]
}

/**
 * Updates a task with the specified ID.
 * @param id - The ID of the task to update.
 * @param data - The new task data.
 * @param userId - The ID of the user making the request.
 * @returns A promise that resolves to the updated task.
 */
export async function updateTask(
  id: string,
  data: Partial<Task>,
  userId: string,
): Promise<Task | null> {
  /// Get task to check if the user is an owner of the project
  const originalTask = await getTask(id, userId)

  // * Check if the user is an owner of the project
  if (!originalTask) return null

  /// Also make sure that a new owner of the task is an owner of the project
  if (data.ownerId && data.ownerId !== originalTask.ownerId) {
    if (!(await isOwner(originalTask.projectId, data.ownerId))) {
      // * If the new owner is not an owner of the project, remove the ownerId from the data
      delete data.ownerId
    }
  }

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
 * @param userId - The ID of the user making the request.
 * @returns A promise that resolves when the task is successfully deleted.
 */
export async function deleteTask(id: string, userId: string): Promise<void> {
  /// Get task to check if the user is an owner of the project
  const originalTask = await getTask(id, userId)

  // * Check if the user is an owner of the project
  if (!originalTask) return

  await db.delete(tasks).where(eq(tasks.id, id))
}
