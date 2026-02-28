import '@fastify/jwt'

export interface TokenPayload {
  email: string
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: TokenPayload
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    signAccessToken: (payload: TokenPayload, options?: object) => string
    signRefreshToken: (payload: TokenPayload, options?: object) => string
  }

  interface FastifyRequest {
    verifyAccessToken: () => Promise<void>
    verifyRefreshToken: () => Promise<void>
  }
}