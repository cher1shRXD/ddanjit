import type { SaveUserInfoReq, UserRes } from "@ddanjit/domain";
import apiClient from "../../../shared/libs/axios/api-client";

export const RegisterInfoApi = {
  async registerInfo(data: SaveUserInfoReq) {
    return await apiClient.patch<UserRes>("/users/info", data);
  },
};
