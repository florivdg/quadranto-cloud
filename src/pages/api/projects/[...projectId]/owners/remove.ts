import { getOwners, removeOwner } from '@/db/client/projects'
import { isUUID } from '@/lib/validators'
import { type APIRoute } from 'astro'

/**
 * Handler function for the DELETE request to remove an owner from a project.
 * @returns - The response object.
 */
export const DELETE: APIRoute = async ({ params, request }) => {
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

  /// Cannot remove the last owner from a project.
  const owners = await getOwners(projectId)
  if (owners.length === 1 && owners[0].id === userId) {
    const status = 400
    return new Response(
      JSON.stringify({
        message: 'Cannot remove the last owner from a project.',
        code: status,
      }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  /// Remove the owner from the project in the database.
  await removeOwner(projectId, userId)

  return new Response(null, { status: 204 })
}
