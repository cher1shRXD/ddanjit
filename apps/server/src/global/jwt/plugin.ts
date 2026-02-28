import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(jwt, {
    secret: process.env.ACCESS_TOKEN_SECRET!,
    namespace: "access",
    jwtVerify: "verifyAccessToken",
    jwtSign: "signAccessToken",
  });

  fastify.register(jwt, {
    secret: process.env.REFRESH_TOKEN_SECRET!,
    namespace: "refresh",
    jwtVerify: "verifyRefreshToken",
    jwtSign: "signRefreshToken",
  });
});
