import { BaseResponse as Return } from "../types/base-response";

export const BaseResponse = <T>(message: string, data?: T) => ({
  message,
  data,
}) as Return<T>;