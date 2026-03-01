import { FastifyInstance } from "fastify";
import pkg from "jsonwebtoken";
import { TokenPayload } from "./types";
const { sign, verify } = pkg;

export const JwtProvider = (fastify: FastifyInstance) => (  {
  async saveTokens(email: string) {
    const accessToken = sign({ email }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "2h",
    });
    const refreshToken = sign({ email }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "30d",
    });

    await fastify.redis.setex(
      `refreshToken:${email}`,
      30 * 24 * 60 * 60,
      refreshToken,
    );

    return { accessToken, refreshToken };
  },

  async deleteTokens(email: string) {
    await fastify.redis.del(`refreshToken:${email}`);
  },

  verifyAccessToken(token: string) {
    return verify(token, process.env.ACCESS_TOKEN_SECRET!) as TokenPayload;
  },

  verifyRefreshToken(token: string) {
    return verify(token, process.env.REFRESH_TOKEN_SECRET!) as TokenPayload;
  },
});
