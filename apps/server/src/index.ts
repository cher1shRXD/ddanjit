import 'dotenv/config'
import { fastify } from './global/server'

fastify.listen({ port: 3000 }, (err) => {
  if (err) process.exit(1)
})