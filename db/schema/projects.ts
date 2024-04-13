import { text, mysqlTable, serial, varchar, date } from 'drizzle-orm/mysql-core'

export const projects = mysqlTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 1024 }).notNull(),
  description: text('description'),
  due_date: date('due_date'),
})

export type Project = typeof projects.$inferSelect /// return type when queried
export type NewProject = typeof projects.$inferInsert /// insert type
