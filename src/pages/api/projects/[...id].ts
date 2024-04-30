import type { APIRoute } from 'astro'

import { getProject, updateProject, deleteProject } from '@/db/client/projects'
import type { Project } from '@/db/schema'
import { isUUID } from '@/lib/validators'

/**
 * [GET] Read project
 */
export const GET: APIRoute = async ({ locals, params }) => {
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
  const { user } = locals
  const project = await getProject(id, user!.id)

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
export const PUT: APIRoute = async ({ locals, params, request }) => {
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
  const { user } = locals
  const project = await updateProject(id, data, user!.id)

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
export const DELETE: APIRoute = async ({ locals, params }) => {
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
  const { user } = locals
  await deleteProject(id, user!.id)

  return new Response(null, { status: 204 })
}
