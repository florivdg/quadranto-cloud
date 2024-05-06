import type { FetchError } from 'ofetch'

import { backendClient, type ApiResponse } from '@/api'
import { ApiError } from '@/api/ApiError'
import type { NewTask, Task } from '@/db/schema'

/**
 * Adds a new task.
 * @param body - The data for the new task.
 * @returns A promise that resolves to an array containing the added task and any error that occurred during the operation.
 */
export async function addTask(body: NewTask): Promise<ApiResponse<Task>> {
  try {
    const task = await backendClient<Task>('tasks', { method: 'POST', body })
    return [task, null]
  } catch (error) {
    const apiError = ApiError.fromFetchError(error as FetchError)
    return [null, apiError]
  }
}

/**
 * Updates an existing task.
 * @param id - The ID of the task to update.
 * @param body - The data to update the task with.
 * @returns A promise that resolves to an array containing the updated task and any error that occurred during the operation.
 */
export async function updateTask(
  id: string,
  body: Partial<Task>,
): Promise<ApiResponse<Task>> {
  try {
    const task = await backendClient<Task>(`tasks/${id}`, {
      method: 'PUT',
      body,
    })
    return [task, null]
  } catch (error) {
    const apiError = ApiError.fromFetchError(error as FetchError)
    return [null, apiError]
  }
}
