import { relations } from 'drizzle-orm'
import {
  pgTable,
  uuid,
  text,
  varchar,
  date,
  timestamp,
  pgEnum,
  uniqueIndex,
  primaryKey,
} from 'drizzle-orm/pg-core'

/**
 * Define the `user profiles` schema for the database.
 */
export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 1024 }).notNull(),
    email: varchar('email', { length: 1024 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex('email_idx').on(table.email),
    }
  },
)

/**
 * Define the relations for the `profiles` schema.
 */
export const profilesRelations = relations(profiles, ({ many }) => ({
  usersToProjects: many(profilesToProjects),
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
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
})

/**
 * Define the relations for the `projects` schema.
 */
export const projectRelations = relations(projects, ({ many }) => ({
  usersToProfiles: many(profilesToProjects),
}))

/**
 * Define the `project_profiles` join table schema for the database.
 */
export const profilesToProjects = pgTable(
  'project_profiles',
  {
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profiles.id),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.profileId, t.projectId] }),
  }),
)

/**
 * Define the relations for the `project_profiles` join table schema.
 */
export const profilesToProjectsRelations = relations(
  profilesToProjects,
  ({ one }) => ({
    project: one(projects, {
      fields: [profilesToProjects.projectId],
      references: [projects.id],
    }),
    profile: one(profiles, {
      fields: [profilesToProjects.profileId],
      references: [profiles.id],
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
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id),
  ownerId: uuid('owner_id').references(() => profiles.id),
})

/**
 * Define the relations for the `tasks` schema.
 */
export const tasksRelations = relations(tasks, ({ one }) => ({
  owner: one(profiles, {
    fields: [tasks.ownerId],
    references: [profiles.id],
  }),
}))

/**
 * Infer types.
 */
export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert
export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert
export type ProfileToProject = typeof profilesToProjects.$inferSelect
export type NewProfileToProject = typeof profilesToProjects.$inferInsert
