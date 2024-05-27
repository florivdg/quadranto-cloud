import type { FetchError } from 'ofetch'

import { backendClient, type ApiResponse } from '@/api'
import { ApiError } from '@/api/ApiError'
import type { NewProject, Project } from '@/db/schema'

/**
 * Adds a new project.
 * @param body - The data for the new project.
 * @returns A promise that resolves to an array containing the added project and any error that occurred during the operation.
 */
export async function addProject(
  body: NewProject,
): Promise<ApiResponse<Project>> {
  try {
    const project = await backendClient<Project>('projects', {
      method: 'POST',
      body,
    })
    return [project, null]
  } catch (error) {
    const apiError = ApiError.fromFetchError(error as FetchError)
    return [null, apiError]
  }
}

/**
 * Updates an existing project.
 * @param id - The ID of the project to update.
 * @param body - The data to update the project with.
 * @returns A promise that resolves to an array containing the updated project and any error that occurred during the operation.
 */
export async function updateProject(
  id: string,
  body: Partial<Project>,
): Promise<ApiResponse<Project>> {
  try {
    const project = await backendClient<Project>(`projects/${id}`, {
      method: 'PUT',
      body,
    })
    return [project, null]
  } catch (error) {
    const apiError = ApiError.fromFetchError(error as FetchError)
    return [null, apiError]
  }
}
