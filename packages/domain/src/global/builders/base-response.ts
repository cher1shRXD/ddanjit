import { BaseResponse as Return } from "../types/base-response";

export const BaseResponseBuilder = <T>(status: number, message?: string, data?: T) => ({
  status,
  message,
  data,
}) as Return<T>;