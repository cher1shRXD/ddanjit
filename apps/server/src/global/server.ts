import fastifyRedis from "@fastify/redis";
import Fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { redisConfig } from "./db/redis";
import { userController } from "../domain/user/controller";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { authController } from "../domain/auth/controller";

export const fastify = Fastify({ logger: true });

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(fastifyRedis, redisConfig);

fastify.register(fastifySwagger, {
  openapi: {
    info: { title: "딴짓 API", version: "1.0.0" },
  },
  transform: jsonSchemaTransform,
});
fastify.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

fastify.register(userController, { prefix: "/users" });
fastify.register(authController, { prefix: "/auth" });
