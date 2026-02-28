import { BaseResponse } from "../../global/types/base-response";
import { User } from "../types";

export type CreateUserInfoRes = BaseResponse<User>;

export type CheckUserInfoRes = BaseResponse<{
  exists: boolean;
}>;
