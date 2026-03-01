import { ErrorResponseBuilder, GlobalError } from "@ddanjit/domain";
import { FastifyReply, FastifyRequest } from "fastify";
import pkg from "jsonwebtoken";
const { verify, JsonWebTokenError, TokenExpiredError } = pkg;

export const requireAuth = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
      return reply
        .status(401)
        .send(ErrorResponseBuilder(new Error(GlobalError.UNAUTHORIZED)));
    }

    const token = authorization.slice(7);
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as { email: string };
    req.user = payload;
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