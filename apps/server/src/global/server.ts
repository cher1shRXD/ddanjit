import fastifyRedis from "@fastify/redis";
import Fastify from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { redisConfig } from "./db/redis";
import { userController } from "../domain/user/controller";
import { activityController } from "../domain/activity/controller";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { authController } from "../domain/auth/controller";
import fastifyCors from "@fastify/cors";
import "dotenv/config";
import "./jwt/types";
import fs from "fs";

export const fastify = Fastify({
  logger: true,
  // https: {
  //   key: fs.readFileSync("/Users/cher1shRXD/cher1shrxds-macbookpro.tail1ddfe6.ts.net.key"),
  //   cert: fs.readFileSync("/Users/cher1shRXD/cher1shrxds-macbookpro.tail1ddfe6.ts.net.crt"),
  // }
});

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(fastifyCors, {
  origin: ["https://cher1shrxds-macbookpro.tail1ddfe6.ts.net:5173", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  credentials: true,
});

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
fastify.register(activityController, { prefix: "/activities" });
