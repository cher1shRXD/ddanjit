import 'dotenv/config'
import { fastify } from './global/server'

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
  if (err) process.exit(1)
})