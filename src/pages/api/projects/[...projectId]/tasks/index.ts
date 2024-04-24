import { listTasksForProject } from '@/db/client/tasks'
import { isUUID } from '@/lib/validators'
import type { APIRoute } from 'astro'

/**
 * Handler function for the GET request to retrieve tasks for a project.
 * @returns - The response object containing the list of tasks.
 */
export const GET: APIRoute = async ({ locals, params }) => {
  const { projectId } = params

  if (!projectId || !isUUID(projectId)) {
    const status = 400
    return new Response(
      JSON.stringify({
        message: 'Missing or malformed project ID. Must be UUIDv4.',
        code: status,
      }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  /// Retrieve the tasks from the database.
  const { user } = locals
  const tasks = await listTasksForProject(projectId, user!.id)

  return new Response(JSON.stringify(tasks), {
    headers: { 'Content-Type': 'application/json' },
  })
}
