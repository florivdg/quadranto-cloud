import { and, count, eq } from 'drizzle-orm'
import { type PostgresError } from 'postgres'
import { db } from '@/db'
import {
  type Project,
  type NewProject,
  projects,
  usersToProjects,
  tasks,
  type User,
} from '@/db/schema'

/**
 * A project with the count of tasks associated with it.
 */
type ProjectWithTaskCount = Project & {
  taskCount: number
}

/**
 * Retrieves a list of projects from the database.
 * @returns A promise that resolves to an array of projects.
 */
export async function listProjects(): Promise<Project[]> {
  return await db.select().from(projects)
}

/**
 * Retrieves a project by its ID.
 * @param id - The ID of the project to retrieve.
 * @returns A Promise that resolves to the project if found, or undefined if not found.
 */
export async function getProject(
  id: string,
  withOwners = true,
): Promise<ProjectWithTaskCount | undefined> {
  const project = await db.query.projects.findFirst({
    with: {
      owners: withOwners
        ? {
            columns: {},
            with: {
              user: {
                with: {
                  profile: true,
                },
              },
            },
          }
        : undefined,
    },
    where: eq(projects.id, id),
  })

  /// Get task count
  const taskCount = await db
    .select({ count: count(projects.id) })
    .from(tasks)
    .where(eq(tasks.projectId, id))

  /// Set the task count on the project
  const projectWithTaskCount = {
    ...project,
    taskCount: taskCount[0].count,
  } as ProjectWithTaskCount

  return projectWithTaskCount
}

/**
 * Creates a new project.
 * @param data - The data for the new project.
 * @returns A promise that resolves to the created project.
 */
export async function createProject(data: NewProject): Promise<Project> {
  const project = await db.insert(projects).values(data).returning()
  return project[0]
}

/**
 * Updates a project with the specified ID.
 * @param id - The ID of the project to update.
 * @param data - The new project data.
 * @returns A Promise that resolves to the updated project.
 */
export async function updateProject(
  id: string,
  data: Partial<Project>,
): Promise<Project> {
  const project = await db
    .update(projects)
    .set(data)
    .where(eq(projects.id, id))
    .returning()
  return project[0]
}

/**
 * Deletes a project from the database.
 * @param id - The ID of the project to delete.
 * @returns A Promise that resolves when the project is successfully deleted.
 */
export async function deleteProject(id: string): Promise<void> {
  await db.delete(projects).where(eq(projects.id, id))
}

/**
 * Adds an owner to a project.
 * @param projectId - The ID of the project.
 * @param userId - The ID of the profile to add as an owner.
 * @returns A Promise that resolves to an object indicating the success of the operation.
 */
export async function addOwner(
  projectId: string,
  userId: string,
): Promise<{
  success: boolean
  inserted: boolean
  error?: any
}> {
  try {
    const relationship = await db
      .insert(usersToProjects)
      .values({
        projectId,
        userId,
      })
      .returning()

    const success = relationship.at(0)?.userId === userId
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
 * @param userId - The ID of the user to remove as an owner.
 * @returns A Promise that resolves when the profile-to-project relation is successfully deleted.
 */
export async function removeOwner(
  projectId: string,
  userId: string,
): Promise<void> {
  await db
    .delete(usersToProjects)
    .where(
      and(
        eq(usersToProjects.projectId, projectId),
        eq(usersToProjects.userId, userId),
      ),
    )
}

/**
 * Retriev the owners of a project.
 * @param projectId - The ID of the project.
 * @returns A Promise that resolves to an array of users.
 */
export async function getOwners(projectId: string): Promise<User[]> {
  const owners = await db.query.usersToProjects.findMany({
    where: eq(usersToProjects.projectId, projectId),
    with: {
      user: {
        with: {
          profile: true,
        },
      },
    },
  })
  return owners.map((owner) => owner.user)
}
