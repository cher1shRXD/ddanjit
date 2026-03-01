import type { SaveUserInfoReq, SaveUserInfoRes } from "@ddanjit/domain";
import apiClient from "../../../shared/libs/axios/api-client";

export const RegisterInfoApi = {
  async registerInfo(data: SaveUserInfoReq) {
    return await apiClient.patch<SaveUserInfoRes>("/users/info", data);
  },
};
