import { BaseResponse } from "../../global/types/base-response";
import { User } from "../types";

export type UserRes = BaseResponse<User>;

export type CheckUserInfoRes = BaseResponse<{
  exists: boolean;
}>;
