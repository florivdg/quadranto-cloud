import { listProjects } from '@/db/client/projects'
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
