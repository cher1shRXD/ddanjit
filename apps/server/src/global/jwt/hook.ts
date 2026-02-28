import { ErrorResponseBuilder, GlobalError } from "@ddanjit/domain";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;

export const requireAuth = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    await req.verifyAccessToken();
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return reply
        .status(401)
        .send(ErrorResponseBuilder(new Error(GlobalError.EXPIRED_TOKEN)));
    }
    if (e instanceof JsonWebTokenError) {
      return reply
        .status(401)
        .send(ErrorResponseBuilder(new Error(GlobalError.INVALID_TOKEN)));
    }
    return reply
      .status(401)
      .send(ErrorResponseBuilder(new Error(GlobalError.UNAUTHORIZED)));
  }
};
