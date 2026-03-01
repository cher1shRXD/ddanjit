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
    .catch((e: unknown) => {
      if (e && typeof e === "object" && "status" in e && "message" in e) {
        const error = e as ErrorResponse;
        return reply.status(error.status).send(error);
      }
      return reply.status(500).send({
        success: false,
        status: 500,
        message:
          e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.",
      });
    });
};
