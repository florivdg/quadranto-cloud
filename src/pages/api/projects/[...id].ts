import { getProject } from '@/db/client/projects'
import { isUUID } from '@/lib/validators'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, request }) => {
  const { id } = params

  if (!id || !isUUID(id)) {
    const status = 400
    return new Response(
      JSON.stringify({
        message: 'Missing or malformed project ID. Must be UUIDv4.',
        code: status,
      }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const project = await getProject(id)

  if (!project) {
    const status = 404
    return new Response(
      JSON.stringify({ message: 'Project not found', code: status }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  return new Response(JSON.stringify(project), {
    headers: { 'Content-Type': 'application/json' },
  })
}
