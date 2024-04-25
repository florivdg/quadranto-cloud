import { getTask, updateTask, deleteTask } from '@/db/client/tasks'
import type { Task } from '@/db/schema'
import { isUUID } from '@/lib/validators'
import type { APIRoute } from 'astro'

/**
 * [GET] Read task
 */
export const GET: APIRoute = async ({ locals, params }) => {
  const { id } = params

  if (!id || !isUUID(id)) {
    const status = 400
    return new Response(
      JSON.stringify({
        message: 'Missing or malformed task ID. Must be UUIDv4.',
        code: status,
      }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  /// Retrieve the task from the database.
  const { user } = locals
  const task = await getTask(id, user!.id)

  if (!task) {
    const status = 404
    return new Response(
      JSON.stringify({ message: 'Task not found', code: status }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  return new Response(JSON.stringify(task), {
    headers: { 'Content-Type': 'application/json' },
  })
}

/**
 * [PUT] Update task
 */
export const PUT: APIRoute = async ({ locals, params, request }) => {
  const { id } = params
  const data: Partial<Task> = await request.json()

  if (!id || !isUUID(id)) {
    const status = 400
    return new Response(
      JSON.stringify({
        message: 'Missing or malformed task ID. Must be UUIDv4.',
        code: status,
      }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

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

  /// Update the task in the database.
  const { user } = locals
  const updatedTask = await updateTask(id, data, user!.id)

  return new Response(JSON.stringify(updatedTask), {
    headers: { 'Content-Type': 'application/json' },
  })
}

/**
 * [DELETE] Delete task
 */
export const DELETE: APIRoute = async ({ locals, params }) => {
  const { id } = params

  if (!id || !isUUID(id)) {
    const status = 400
    return new Response(
      JSON.stringify({
        message: 'Missing or malformed task ID. Must be UUIDv4.',
        code: status,
      }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  /// Delete the task from the database.
  const { user } = locals
  await deleteTask(id, user!.id)

  return new Response(null, { status: 204 })
}
