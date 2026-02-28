import { FastifyInstance } from "fastify";
import { TokenPayload } from "./types";

export const JwtProvider = {
  instance: null as FastifyInstance | null,

  JwtProvider(fastify: FastifyInstance) {
    this.instance = fastify;
  },

  async saveTokens(email: string) {
    if (!this.instance) throw new Error("JWT Provider is not initialized");

    const accessToken = this.instance.signAccessToken(
      { email } satisfies TokenPayload,
      { expiresIn: "2h" },
    );
    const refreshToken = this.instance.signRefreshToken(
      { email } satisfies TokenPayload,
      { expiresIn: "30d" },
    );

    const { redis } = this.instance;

    await redis.setex(`refreshToken:${email}`, 30 * 24 * 60 * 60, refreshToken);

    return { accessToken, refreshToken };
  },
};
