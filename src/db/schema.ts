import {
  pgTable,
  uuid,
  text,
  varchar,
  date,
  timestamp,
} from 'drizzle-orm/pg-core'

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 1024 }).notNull(),
  description: text('description'),
  dueDate: date('due_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
})

export type Project = typeof projects.$inferSelect /// return type when queried
export type NewProject = typeof projects.$inferInsert /// insert type
