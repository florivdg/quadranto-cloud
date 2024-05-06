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
  index,
} from 'drizzle-orm/pg-core'

/**
 * Define the `users` schema for the database.
 */
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar('username', { length: 128 }).notNull().unique(),
  password: varchar('password', { length: 128 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

/**
 * Define the relations for the `users` schema.
 */
export const usersRelations = relations(users, ({ many, one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.id],
  }),
  projects: many(usersToProjects),
  tasks: many(tasks),
}))

/**
 * Define the `sessions` schema for the database.
 */
export const sessions = pgTable(
  'sessions',
  {
    id: text('id').primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      sessionUserIdIdx: index('session_user_id_idx').on(table.userId),
    }
  },
)

/**
 * Define the `user profiles` schema for the database.
 */
export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 1024 }).notNull(),
    email: varchar('email', { length: 1024 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
  },
  (table) => {
    return {
      userIdIdx: uniqueIndex('id_idx').on(table.id),
      emailIdx: uniqueIndex('email_idx').on(table.email),
    }
  },
)

/**
 * Define the relations for the `profiles` schema.
 */
export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.id],
    references: [users.id],
  }),
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
  owners: many(usersToProjects),
}))

/**
 * Define the `project_users` join table schema for the database.
 */
export const usersToProjects = pgTable(
  'projects_users',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.projectId] }),
  }),
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
    user: one(users, {
      fields: [usersToProjects.userId],
      references: [users.id],
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
  ownerId: uuid('owner_id').references(() => users.id),
})

/**
 * Define the relations for the `tasks` schema.
 */
export const tasksRelations = relations(tasks, ({ one }) => ({
  owner: one(users, {
    fields: [tasks.ownerId],
    references: [users.id],
  }),
}))

/**
 * Infer types.
 */
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert
export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert
export type Priority = Task['priority']
export type UserToProject = typeof usersToProjects.$inferSelect
export type NewUserToProject = typeof usersToProjects.$inferInsert
