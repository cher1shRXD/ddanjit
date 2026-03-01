import '@fastify/jwt'

export interface TokenPayload {
  email: string
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: TokenPayload
  }
}