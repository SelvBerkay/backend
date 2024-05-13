import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createTodo, deleteTodo, getTodos, updateTodo } from './db/queries'
import { InsertTodo } from './db/schema'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/*', cors())

app.post('/todos', async (c) => {
  const todo = await c.req.json<InsertTodo>()
  const ok = await createTodo(todo)
  console.log(ok)
  return c.json({ok})
})

app.get('/todos', async (c) => {
  const todos = await getTodos()
  return c.json({todos})
})

app.delete('/todos/:id', async (c) => {
  const ok = await deleteTodo(+c.req.param("id")) 
  return c.json({ok})
})

app.put('/todos/:id', async (c) => {
  const todo = await c.req.json<InsertTodo>()
  const id = +c.req.param("id")
  const ok = await updateTodo(id, todo)
  console.log(ok)
  return c.json({ok})
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
