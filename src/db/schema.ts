import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
export const todosTable = sqliteTable('todos', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  isDone: integer('isDone').notNull()
});
export type InsertTodo= typeof todosTable.$inferInsert;
export type SelectTodo= typeof todosTable.$inferSelect;