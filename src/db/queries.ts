import { eq } from 'drizzle-orm';
import { db } from './db';
import { InsertTodo, SelectTodo, todosTable } from './schema';


export async function createTodo(data: InsertTodo) {
  return await db.insert(todosTable).values(data);
}

export async function getTodos() {
  return await db.select().from(todosTable)
}

export async function deleteTodo(id : SelectTodo["id"]) {
  return await db.delete(todosTable).where(eq(todosTable.id, id))
}

export async function updateTodo(id : SelectTodo["id"], data: Partial<Omit<SelectTodo, 'id'>>) {
  return await db.update(todosTable).set(data).where(eq(todosTable.id, id))
}