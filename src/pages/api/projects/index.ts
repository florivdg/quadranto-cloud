import { listProjects, createProject } from '@/db/client/projects'
import type { NewProject } from '@/db/schema'
import type { APIRoute } from 'astro'

/**
 * Handler function for the GET request to retrieve projects.
 * @returns - The response object containing the list of projects.
 */
export const GET: APIRoute = async ({ params, request }) => {
  const projects = await listProjects()

  return new Response(JSON.stringify(projects), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const POST: APIRoute = async ({ request }) => {
  const data: NewProject = await request.json()

  if (!data) {
    const status = 400
    return new Response(
      JSON.stringify({
        message: 'Missing project data',
        code: status,
      }),
      { status, headers: { 'Content-Type': 'application/json' } },
    )
  }

  /// Run the actual insert operation.
  const project = await createProject(data)

  /// TODO: Set current user as project owner.

  return new Response(JSON.stringify(project), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  })
}
