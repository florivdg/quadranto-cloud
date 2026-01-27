import { relations } from 'drizzle-orm'
import {
  pgTable,
  uuid,
  text,
  varchar,
  date,
  timestamp,
  pgEnum,
  boolean,
  primaryKey,
  jsonb,
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

import { user } from './auth'

export { user, session, account, verification } from './auth'

/**
 * Custom labels for the Eisenhower Matrix quadrants.
 */
export interface QuadrantLabels {
  urgent?: string
  high?: string
  medium?: string
  low?: string
}

/**
 * Define the relations for the `user` schema.
 */
export const userRelations = relations(user, ({ many }) => ({
  projects: many(usersToProjects),
  tasks: many(tasks),
}))

/**
 * Define the `projects` schema for the database.
 */
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 1024 }).notNull(),
  description: text('description'),
  dueDate: date('due_date'),
  quadrantLabels: jsonb('quadrant_labels').$type<QuadrantLabels>(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
})

/**
 * Zod schema for inserting a project - used for validation.
 */
export const insertProjectSchema = createInsertSchema(projects)

/**
 * Define the relations for the `projects` schema.
 */
export const projectRelations = relations(projects, ({ many }) => ({
  owners: many(usersToProjects),
}))

/**
 * Define the `project_users` join table schema for the database.
 */
export const usersToProjects = pgTable(
  'projects_users',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.projectId] })],
)

/**
 * Define the relations for the `project_users` join table schema.
 */
export const usersToProjectsRelations = relations(
  usersToProjects,
  ({ one }) => ({
    project: one(projects, {
      fields: [usersToProjects.projectId],
      references: [projects.id],
    }),
    user: one(user, {
      fields: [usersToProjects.userId],
      references: [user.id],
    }),
  }),
)

/**
 * Define the `priority` enum for the `tasks` schema.
 */
export const taskPriorityEnum = pgEnum('priority', [
  'low',
  'medium',
  'high',
  'urgent',
])

/**
 * Define the `tasks` schema for the database.
 */
export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 1024 }).notNull(),
  notes: text('description'),
  priority: taskPriorityEnum('priority').default('low').notNull(),
  dueDate: timestamp('due_date'),
  done: boolean('done').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  ownerId: text('owner_id').references(() => user.id),
})

/**
 * Define the relations for the `tasks` schema.
 */
export const tasksRelations = relations(tasks, ({ one }) => ({
  owner: one(user, {
    fields: [tasks.ownerId],
    references: [user.id],
  }),
}))

/**
 * Infer types.
 */
export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert
export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert
export type Priority = Task['priority']
export type UserToProject = typeof usersToProjects.$inferSelect
export type NewUserToProject = typeof usersToProjects.$inferInsert
