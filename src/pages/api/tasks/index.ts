import type { APIRoute } from 'astro'

import { listMyTasks, createTask } from '@/db/client/tasks'
import type { NewTask } from '@/db/schema'

/**
 * Handler function for the GET request to retrieve tasks.
 * @returns - The response object containing the list of tasks.
 */
export const GET: APIRoute = async ({ locals }) => {
  const { user } = locals
  const tasks = await listMyTasks(user!.id)

  return new Response(JSON.stringify(tasks), {
    headers: { 'Content-Type': 'application/json' },
  })
}

/**
 * Handler function for the POST request to create a new task.
 * @returns - The response object containing the newly created task.
 */
export const POST: APIRoute = async ({ locals, request }) => {
  const data: NewTask = await request.json()

  if (!data) {
    const status = 400
    return new Response(
      JSON.stringify({
        message: 'Missing task data',
        code: status,
      }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  /// Run the actual insert operation.
  const { user } = locals
  const task = await createTask(data, user!.id)

  return new Response(JSON.stringify(task), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  })
}
