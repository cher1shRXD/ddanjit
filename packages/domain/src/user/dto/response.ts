import { BaseResponse } from "../../global/types/base-response";
import { User } from "../types";

export type SaveUserInfoRes = BaseResponse<User>;

export type CheckUserInfoRes = BaseResponse<{
  exists: boolean;
}>;
