import { getProject, updateProject, deleteProject } from '@/db/client/projects'
import type { Project } from '@/db/schema'
import { isUUID } from '@/lib/validators'
import type { APIRoute } from 'astro'

/**
 * [GET] Read project
 */
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

  /// Retrieve the project from the database.
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

/**
 * [PUT] Update project
 */
export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params
  const data: Partial<Project> = await request.json()

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

  /// Set the `updatedAt` field to the current date.
  data.updatedAt = new Date()

  /// Run the actual update operation.
  const project = await updateProject(id, data)

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

/**
 * [DELETE] Delete project
 */
export const DELETE: APIRoute = async ({ params }) => {
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

  /// Run the actual delete operation.
  await deleteProject(id)

  return new Response(null, { status: 204 })
}
