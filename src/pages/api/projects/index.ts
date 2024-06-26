import type { APIRoute } from 'astro'

import { listProjects, createProject } from '@/db/client/projects'
import type { NewProject } from '@/db/schema'

/**
 * Handler function for the GET request to retrieve projects.
 * @returns - The response object containing the list of projects.
 */
export const GET: APIRoute = async ({ locals }) => {
  const { user } = locals
  const projects = await listProjects(user!.id)

  return new Response(JSON.stringify(projects), {
    headers: { 'Content-Type': 'application/json' },
  })
}

/**
 * Handler function for the POST request to create a new project.
 * @returns - The response object containing the newly created project.
 */
export const POST: APIRoute = async ({ locals, request }) => {
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
  const { user } = locals
  const project = await createProject(data, user!.id)

  return new Response(JSON.stringify(project), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  })
}
