import { and, count, eq } from 'drizzle-orm'
import { type PostgresError } from 'postgres'

import { db } from '@/db'
import {
  type Project,
  type NewProject,
  projects,
  usersToProjects,
  tasks,
  users,
  type User,
} from '@/db/schema'

/**
 * A project with the count of tasks associated with it.
 */
type ProjectWithTaskCountAndOwners = Project & {
  taskCount: number
  owners: { user: User }[]
}

/**
 * Retrieves a list of projects from the database.
 * @param userId - The ID of the user to retrieve projects for.
 * @returns A promise that resolves to an array of projects.
 */
export async function listProjects(userId: string): Promise<Project[]> {
  const rows = await db
    .select()
    .from(usersToProjects)
    .leftJoin(users, eq(usersToProjects.userId, users.id))
    .leftJoin(projects, eq(usersToProjects.projectId, projects.id))
    .where(eq(users.id, userId))
    .orderBy(projects.title)

  const results = rows.map((row) => row.projects).filter(Boolean) as Project[]
  return results
}

/**
 * Retrieves a project by its ID.
 * @param projectId - The ID of the project to retrieve.
 * @param userId - The ID of the user making the request.
 * @returns A Promise that resolves to the project if found, or undefined if not found.
 */
export async function getProject(
  projectId: string,
  userId: string,
  withOwners = true,
): Promise<ProjectWithTaskCountAndOwners | undefined> {
  // * Check if the user is an owner of the project
  if (!(await isOwner(projectId, userId))) {
    return undefined
  }

  /// Query the database for the project
  const project = (await db.query.projects.findFirst({
    with: {
      owners: withOwners
        ? {
            columns: {},
            with: {
              user: {
                columns: { password: false },
                with: {
                  profile: true,
                },
              },
            },
          }
        : undefined,
    },
    where: eq(projects.id, projectId),
  })) as ProjectWithTaskCountAndOwners | undefined

  /// Get task count
  const taskCount = await db
    .select({ count: count(projects.id) })
    .from(tasks)
    .where(eq(tasks.projectId, projectId))

  /// Set the task count on the project
  const projectWithTaskCount = {
    ...project,
    taskCount: taskCount[0].count,
  } as ProjectWithTaskCountAndOwners

  return projectWithTaskCount
}

/**
 * Creates a new project.
 * @param data - The data for the new project.
 * @returns A promise that resolves to the created project.
 */
export async function createProject(
  data: NewProject,
  userId: string,
): Promise<Project> {
  /// Insert the project into the database.
  const project = (await db.insert(projects).values(data).returning())[0]

  /// Set current user as first project owner.
  await addOwner(project.id, userId, userId, true)

  return project
}

/**
 * Updates a project with the specified ID.
 * @param projectId - The ID of the project to update.
 * @param data - The new project data.
 * @param userId - The ID of the user making the request.
 * @returns A Promise that resolves to the updated project.
 */
export async function updateProject(
  projectId: string,
  data: Partial<Project>,
  userId: string,
): Promise<Project | undefined> {
  // * Check if the user is an owner of the project
  if (!(await isOwner(projectId, userId))) return undefined

  const project = await db
    .update(projects)
    .set(data)
    .where(eq(projects.id, projectId))
    .returning()
  return project[0]
}

/**
 * Deletes a project from the database.
 * @param projectId - The ID of the project to delete.
 * @param userId - The ID of the user making the request.
 * @returns A Promise that resolves when the project is successfully deleted.
 */
export async function deleteProject(
  projectId: string,
  userId: string,
): Promise<void> {
  // * Check if the user is an owner of the project
  if (!(await isOwner(projectId, userId))) return

  await db.delete(projects).where(eq(projects.id, projectId))
}

/**
 * Adds an owner to a project.
 * @param projectId - The ID of the project.
 * @param addUserId - The ID of the profile to add as an owner.
 * @param requestingUserId - The ID of the user making the request.
 * @param force - A boolean indicating if the operation should be forced.
 * @returns A Promise that resolves to an object indicating the success of the operation.
 */
export async function addOwner(
  projectId: string,
  addUserId: string,
  requestingUserId: string,
  force: boolean = false,
): Promise<{
  success: boolean
  inserted: boolean
  error?: any
}> {
  // * Check if the user is an owner of the project
  if (!force && !(await isOwner(projectId, requestingUserId))) {
    return {
      success: false,
      inserted: false,
      error: new Error('User is not an owner of the project.'),
    }
  }

  try {
    const relationship = await db
      .insert(usersToProjects)
      .values({
        projectId,
        userId: addUserId,
      })
      .returning()

    const success = relationship.at(0)?.userId === addUserId
    return {
      success,
      inserted: true,
    }
  } catch (error) {
    console.error(error)

    /// Check if the error is due to a duplicate key violation.
    if ((error as PostgresError)?.code === '23505') {
      return {
        success: true,
        inserted: false,
        error,
      }
    }
  }

  return {
    success: false,
    inserted: false,
  }
}

/**
 * Removes an owner from a project.
 * @param projectId - The ID of the project.
 * @param addUserId - The ID of the user to remove as an owner.
 * @param requestingUserId - The ID of the user making the request.
 * @returns A Promise that resolves when the profile-to-project relation is successfully deleted.
 */
export async function removeOwner(
  projectId: string,
  addUserId: string,
  requestingUserId: string,
): Promise<boolean> {
  // * Check if the user is an owner of the project
  if (!(await isOwner(projectId, requestingUserId))) return false

  /// Cannot remove the last owner from a project.
  const owners = await getOwners(projectId, requestingUserId)
  if (owners.length === 1) return false

  await db
    .delete(usersToProjects)
    .where(
      and(
        eq(usersToProjects.projectId, projectId),
        eq(usersToProjects.userId, addUserId),
      ),
    )

  return true
}

/**
 * Retriev the owners of a project.
 * @param projectId - The ID of the project.
 * @param requestingUserId - The ID of the user making the request.
 * @returns A Promise that resolves to an array of users.
 */
export async function getOwners(
  projectId: string,
  requestingUserId: string,
): Promise<Omit<User, 'password'>[]> {
  // * Check if the user is an owner of the project
  if (!(await isOwner(projectId, requestingUserId))) return []

  const owners = await db.query.usersToProjects.findMany({
    where: eq(usersToProjects.projectId, projectId),
    with: {
      user: {
        columns: { password: false },
        with: {
          profile: true,
        },
      },
    },
  })

  return owners.map((owner) => owner.user)
}

/**
 * Checks if a user is an owner of a project.
 * @param projectId - The ID of the project.
 * @param userId - The ID of the user to check.
 * @returns A Promise that resolves to a boolean indicating if the user is an owner of the project.
 */
export async function isOwner(
  projectId: string,
  userId: string,
): Promise<boolean> {
  if (!projectId || !userId) return false

  const owner = await db.query.usersToProjects.findFirst({
    where: and(
      eq(usersToProjects.projectId, projectId),
      eq(usersToProjects.userId, userId),
    ),
  })

  return !!owner
}
