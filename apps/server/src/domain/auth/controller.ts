import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { authService } from "./service";
import { send } from "../../global/utils/send";

export const authController = async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.post("/google", async (req, reply) => {
    const { idToken } = req.body as { idToken: string };
    return send(() => authService.loginWithGoogle(idToken), reply);
  });

  app.post("/apple", async (req, reply) => {
    const { idToken } = req.body as { idToken: string };
    return send(() => authService.loginWithApple(idToken), reply);
  });

  app.post("/logout", async (req, reply) => {
    const { email } = req.body as { email: string };
    return send(() => authService.logout(email), reply);
  });
};
