import { getOwners, removeOwner } from '@/db/client/projects'
import { isUUID } from '@/lib/validators'
import { type APIRoute } from 'astro'

export const GET: APIRoute = async ({ params }) => {
  const { projectId } = params

  if (!projectId || !isUUID(projectId)) {
    const status = 400
    return new Response(
      JSON.stringify({
        message: 'Missing project ID or malformed UUID.',
        code: status,
      }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const owners = await getOwners(projectId)

  return new Response(JSON.stringify(owners), {
    headers: { 'Content-Type': 'application/json' },
  })
}
