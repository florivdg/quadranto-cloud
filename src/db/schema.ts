import { text, mysqlTable, int, varchar, date } from 'drizzle-orm/mysql-core'

export const projects = mysqlTable('projects', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 1024 }).notNull(),
  description: text('description'),
  dueDate: date('due_date'),
})

export type Project = typeof projects.$inferSelect /// return type when queried
export type NewProject = typeof projects.$inferInsert /// insert type
