import { type APIRoute } from 'astro'

import { addOwner } from '@/db/client/projects'
import { isUUID } from '@/lib/validators'

/**
 * Handler function for the POST request to add an owner to a project.
 * @returns - The response object containing the new owner.
 */
export const POST: APIRoute = async ({ locals, params, request }) => {
  const { projectId } = params
  const { userId } = await request.json()

  if (!projectId || !userId || !isUUID(projectId) || !isUUID(userId)) {
    const status = 400
    return new Response(
      JSON.stringify({
        message: 'Missing project or user ID or malformed UUID(s).',
        code: status,
      }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  /// Add the owner to the project in the database.
  const { user } = locals
  const insert = await addOwner(projectId, userId, user!.id)

  return new Response(JSON.stringify(insert), {
    headers: { 'Content-Type': 'application/json' },
    status: insert.success ? (insert.inserted ? 201 : 200) : 403,
  })
}
