import { type APIRoute } from 'astro'

import { removeOwner } from '@/db/client/projects'
import { isUUID } from '@/lib/validators'

/**
 * Handler function for the DELETE request to remove an owner from a project.
 * @returns - The response object.
 */
export const DELETE: APIRoute = async ({ locals, params, request }) => {
  const { projectId } = params
  const { userId } = await request.json()

  if (!projectId || !userId || !isUUID(projectId) || !isUUID(userId)) {
    const status = 400
    return new Response(
      JSON.stringify({
        message: 'Missing project or profile ID or malformed UUID(s).',
        code: status,
      }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  /// Remove the owner from the project in the database.
  const { user } = locals
  const removed = await removeOwner(projectId, userId, user!.id)

  if (!removed) {
    const status = 400
    return new Response(
      JSON.stringify({
        message: 'Removing the user from the project failed.',
        code: status,
      }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  return new Response(null, { status: 204 })
}
