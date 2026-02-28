import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { userService } from "./service";
import { requireAuth } from "../../global/jwt/hook";
import { SaveUserInfoReqSchema } from "@ddanjit/domain";
import { send } from "../../global/utils/send";

export const userController = async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get("/me", { onRequest: [requireAuth] }, async (req, reply) => {
    const { email } = req.user;
    return send(() => userService.getMe(email), reply);
  });

  app.get("/info/check", { onRequest: [requireAuth] }, async (req, reply) => {
    const { email } = req.user;
    return send(() => userService.checkUserInfo(email), reply);
  });

  app.patch(
    "/info",
    { onRequest: [requireAuth], schema: { body: SaveUserInfoReqSchema } },
    async (req, reply) => {
      const { email } = req.user;
      const userInfo = req.body;
      return send(() => userService.saveUserInfo(email, userInfo), reply);
    },
  );

  app.delete("", { onRequest: [requireAuth] }, async (req, reply) => {
    const { email } = req.user;
    return send(() => userService.deleteUser(email), reply);
  });
}
