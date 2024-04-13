import { sql } from 'drizzle-orm'
import {
  text,
  mysqlTable,
  varchar,
  date,
  timestamp,
} from 'drizzle-orm/mysql-core'

export const projects = mysqlTable('projects', {
  id: varchar('id', { length: 48 })
    .default(sql`UUID()`)
    .primaryKey(),
  title: varchar('title', { length: 1024 }).notNull(),
  description: text('description'),
  dueDate: date('due_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
})

export type Project = typeof projects.$inferSelect /// return type when queried
export type NewProject = typeof projects.$inferInsert /// insert type
