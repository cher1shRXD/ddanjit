import { FastifyInstance } from "fastify";
import { activityService } from "./service";
import { RecommendActivityReqSchema } from "@ddanjit/domain";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { requireAuth } from "../../global/jwt/hook";
import { send } from "../../global/utils/send";

export const activityController = async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get(
    "/recommend",
    {
      onRequest: [requireAuth],
      schema: {
        querystring: RecommendActivityReqSchema,
      },
    },
    async (request, reply) => {
      const { duration, time, bundleId } = request.query;
      const { email } = request.user;

      return send(
        () =>
          activityService.findRandomActivity(
            email,
            duration,
            time,
            bundleId,
          ),
        reply,
      );
    },
  );
};
