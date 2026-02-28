import { BaseResponse, ErrorResponse } from "@ddanjit/domain";
import { FastifyReply } from "fastify";

export const send = async (
  action: () => Promise<BaseResponse<unknown>>,
  reply: FastifyReply,
) => {
  return action()
    .then((response) => {
      return reply.status(response.status).send(response);
    })
    .catch((e: ErrorResponse) => {
      return reply.status(e.status).send(e);
    });
};
